enum DrawType {
  PLUS,
  MINUS,
  MINUS_V,
  TEXT,
  CLEAR,
  MARK,
}

enum DrawOption {
  LINE,
  LINE_D,
  RECT,
  TEXT,
  CLEAR,
  MARK,
}

type Points = Array<{x: number, y: number, type: DrawType, data?: string}>;
type TouchCallback = {
  'onStart': Function,
  'onMove': Function,
  'onEnd': Function
};

export abstract class CommonUtils {
  static line_x(x1: number, y1: number, count: number): Points {
    let p: Points = new Array();
    for (var i: number = 1; i < count; i++) {
      p.push({x: x1 + i, y: y1, type: DrawType.MINUS})
    }
    return p;
  }

  static line_y(x1: number, y1: number, count: number): Points {
    let p: Points = new Array();
    for (var i: number = 1; i < count; i++) {
      p.push({x: x1, y: y1 + i, type: DrawType.MINUS_V})
    }
    return p;
  }

  public static myProp = 'Hello';
  // get direction for two touch point.
  public static getDirection(x1: number, y1: number, x2: number, y2: number) {
    if (x1 <= x2) {
      if (y1 <= y2) {
        return 1;  // Down Right
      } else {
        return 2;  // UP Right.
      }
    } else {
      if (y1 <= y2) {
        return 3;  // Down Left
      } else {
        return 4;  // UP Left
      }
    }
  }
  // returns the topleft and botton right for any two point acts as rest
  public static getFixedCorner(x1: number, y1: number, x2: number, y2: number) {
    if (x1 <= x2) {
      if (y1 <= y2) {
        return [x1, y1, x2, y2];
      } else {
        return [x1, y2, x2, y1];
      }
    } else {
      if (y1 <= y2) {
        return [x2, y1, x1, y2];
      } else {
        return [x2, y2, x1, y1];
      }
    }
  }
}



interface DrawElemnet {
  draw(myCanvus: MyCanvus);
  getPoints(): Points;
}

class LineX implements DrawElemnet {
  x1: number;
  y1: number;
  count: number;
  points: Points
  constructor(x1, y1, count) {
    this.x1 = x1;
    this.y1 = y1;
    this.count = count;
    for (var i = 0; i <= this.count; i++) {
      this.points.push({x: this.x1 + i, y: this.y1, type: DrawType.MINUS});
    }
  }
  draw(myCanvus: MyCanvus) {
    myCanvus.draw(this.points);
  }
  getPoints(): Points {
    return this.points;
  }
}

class LineY implements DrawElemnet {
  x1: number;
  y1: number;
  count: number;
  points: Points
  constructor(x1, y1, count) {
    this.x1 = x1;
    this.y1 = y1;
    this.count = count;
    for (var i = 0; i <= this.count; i++) {
      this.points.push({x: this.x1, y: this.y1 + i, type: DrawType.MINUS_V});
    }
  }
  draw(myCanvus: MyCanvus) {
    myCanvus.draw(this.points);
  }
  getPoints(): Points {
    return this.points;
  }
}

class Rect implements DrawElemnet {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points: Points = new Array();
  constructor(x1, y1, x2, y2) {
    let cor = CommonUtils.getFixedCorner(x1, y1, x2, y2);
    this.x1 = cor[0];
    this.y1 = cor[1];
    this.x2 = cor[2];
    this.y2 = cor[3];
    this.points = this.points.concat(CommonUtils.line_x(x1, y1, x2 - x1));
    this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
    this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
    this.points = this.points.concat(CommonUtils.line_y(x2, y1, y2 - y1));
    this.points.push({x: x1, y: y1, type: DrawType.PLUS});
    this.points.push({x: x1, y: y2, type: DrawType.PLUS});
    this.points.push({x: x2, y: y1, type: DrawType.PLUS});
    this.points.push({x: x2, y: y2, type: DrawType.PLUS});
  }
  draw(myCanvus: MyCanvus) {
    myCanvus.draw(this.points);
  }
  getPoints(): Points {
    return this.points;
  }
}

class Line implements DrawElemnet {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points: Points
  constructor(x1, y1, x2, y2) {
    switch (CommonUtils.getDirection(this.x1, this.y1, this.x2, this.y2)) {
      case 1:
        this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
        this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
        break;
      case 2:
        this.points = this.points.concat(CommonUtils.line_y(x1, y2, y1 - y2));
        this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
        break;
      case 3:
        this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
        this.points = this.points.concat(CommonUtils.line_x(x2, y2, x1 - x2));
        break;
      case 4:
        this.points = this.points.concat(CommonUtils.line_y(x1, y2, y1 - y2));
        this.points = this.points.concat(CommonUtils.line_x(x2, y2, x1 - x2));
        break;
    }
    this.points.push({x: x1, y: y1, type: DrawType.PLUS});
    this.points.push({x: x2, y: y2, type: DrawType.PLUS});
    this.points.push({x: x1, y: y2, type: DrawType.PLUS});
  }
  draw(myCanvus: MyCanvus) {
    myCanvus.draw(this.points);
  }
  getPoints(): Points {
    return this.points;
  }
}

class Text implements DrawElemnet {
  x1: number;
  y1: number;
  text: string;
  points: Points
  constructor(x1: number, y: number, text: string) {
    for (let i = 0; i < text.length; i++) {
      this.points.push(
          {x: i, y: this.y1, type: DrawType.TEXT, data: text.charAt(i)})
    }
  }
  draw(myCanvus: MyCanvus) {
    myCanvus.draw(this.points);
  }
  getPoints(): Points {
    return this.points;
  }
}

class ClearBox implements DrawElemnet {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points: Points
  constructor(x1, y1, x2, y2) {
    for (var i = x1; i <= x2; i++) {
      for (var j = y1; j <= y2; j++) {
        this.points.push({x: i, y: j, type: DrawType.CLEAR})
      }
    }
  }
  draw(myCanvus: MyCanvus) {
    myCanvus.draw(this.points);
  }
  getPoints(): Points {
    return this.points;
  }
}

interface ICanvus {
  draw(points: Points);
}

// define const:
const BACKGROUND_COLOR = '#fff';
const STOKE_COLOR = '#F2EFEB';  //"#FEFAF9"//"#f5f5f5"
const TEXT_COLOR = '#000';

class MyCanvus implements ICanvus {
  readonly GAP_X: number = 10;
  readonly GAP_Y: number = 16;
  readonly TEXT_GAP_OFFSET: number = 2;
  public readonly canvas: any;
  private dpi;
  private drawing: boolean = false;
  public readonly context;
  mCallback: TouchCallback;
  private mousePos: any;
  private lastPos: any;
  private isGrid: boolean = false;
  private mCachePoint: Points = new Array();

  constructor(canvus_id, isGrid?: boolean) {
    // intilizate the elemnets
    this.canvas = document.getElementById(canvus_id);
    this.dpi = window.devicePixelRatio;
    this.context = this.canvas.getContext('2d');
    this.isGrid = isGrid;

    // touch listner.
    let _this = this;
    window.addEventListener('resize', function() {
      console.log('One One');
      _this.setSize(window.innerWidth, window.innerHeight);
      _this.reDraw();
    }, false);

    this.canvas.addEventListener('mousedown', function(e) {
      _this.drawing = true;
      _this.mousePos = _this.getMousePos(e);
      if (_this.mCallback) {
        _this.mCallback.onStart(_this.mousePos);
      }
    }, false);

    this.canvas.addEventListener('mouseup', function(e) {
      _this.drawing = false;
      _this.notify(_this.getMousePos(e));
      if (_this.mCallback) {
        _this.mCallback.onEnd();
      }
    }, false);

    this.canvas.addEventListener('mousemove', function(e) {
      _this.notify(_this.getMousePos(e));
    }, false);
    this.drawGrid();
  }

  private notify(mousePos) {
    if (!this.drawing) {
      return;
    }
    if (this.lastPos && this.lastPos[0] == mousePos[0] &&
        this.lastPos[1] == mousePos[1]) {
      return;
    }
    this.lastPos = mousePos;
    console.log(mousePos);
    if (this.mCallback) {
      this.mCallback.onMove(mousePos);
    }
  }

  // draw the grid.
  public drawGrid() {
    this.context.beginPath();
    for (var x = 0; x <= this.canvas.width; x += this.GAP_X) {
      this.context.moveTo(0.5 + x, 0);
      this.context.lineTo(0.5 + x, this.canvas.height);
    }
    for (var x = 0; x <= this.canvas.height; x += this.GAP_Y) {
      this.context.moveTo(0, 0.5 + x);
      this.context.lineTo(this.canvas.width, 0.5 + x);
    }
    this.context.strokeStyle = STOKE_COLOR;
    this.context.stroke();
  }

  draw(points: Points) {
    this.context.beginPath();
    for (let p of points) {
      switch (p.type) {
        case DrawType.PLUS:
          this.plus(p.x, p.y)
          break;
        case DrawType.MINUS:
          this.minus(p.x, p.y)
          break;
        case DrawType.MINUS_V:
          this.minus_v(p.x, p.y)
          break;
        case DrawType.MARK:
          this.mark(p.x, p.y)
          break;
        case DrawType.CLEAR:
          this.clear(p.x, p.y)
          break;
        case DrawType.TEXT:
          this.printChar(p.x, p.y, p.data)
          break;
      }
    }
    this.context.strokeStyle = TEXT_COLOR;
    this.context.stroke();
    this.mCachePoint = points;
  }

  public mark(x: number, y: number, color?: any) {
    if (!color) {
      color = STOKE_COLOR;
    }
    this.context.fillStyle = color;
    this.context.fillRect(
        x * this.GAP_X + 1, y * this.GAP_Y + 1, this.GAP_X - 1, this.GAP_Y - 1);
  }

  clear(x, y) {
    this.context.fillStyle = BACKGROUND_COLOR;
    this.context.fillRect(
        x * this.GAP_X + 1, y * this.GAP_Y + 1, this.GAP_X - 1, this.GAP_Y - 1);
  };

  printChar(x, y, c) {
    this.context.font = '14px monospace';
    this.context.fillText(
        c, x * this.GAP_X, y * this.GAP_Y + this.GAP_Y - this.TEXT_GAP_OFFSET);
  }

  // draw plus
  public plus(x: number, y: number) {
    let midx = x * this.GAP_X + this.GAP_X / 2;
    let midy = y * this.GAP_Y + this.GAP_Y / 2;
    this.context.moveTo(midx - 3 + 0.5, midy + 0.5);
    this.context.lineTo(midx + 3 + 0.5, midy + 0.5);
    this.context.moveTo(midx + 0.5, midy - 3);
    this.context.lineTo(midx + 0.5, midy + 3);
    this.mark(x, y);
  }

  // draw minus
  public minus(x: number, y: number) {
    this.context.moveTo(
        x * this.GAP_X + 2.5, y * this.GAP_Y + this.GAP_Y / 2 + 0.5);
    this.context.lineTo(
        (x + 1) * this.GAP_X - 1.5, y * this.GAP_Y + this.GAP_Y / 2 + 0.5);
    this.mark(x, y);
  }

  // draw minus in vertical.
  public minus_v(x: number, y: number) {
    this.context.moveTo(
        x * this.GAP_X + this.GAP_X / 2 + 0.5, y * this.GAP_Y + 2);
    this.context.lineTo(
        x * this.GAP_X + this.GAP_X / 2 + 0.5, (y + 1) * this.GAP_Y - 2);
    this.mark(x, y);
  }

  // clear canvus
  clearAll() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  // find the corid for touch point.
  private getMousePos(mouseEvent) {
    var rect = this.canvas.getBoundingClientRect();
    let x = mouseEvent.clientX - rect.left;
    let y = mouseEvent.clientY - rect.top;
    return [Math.floor(x / this.GAP_X), Math.floor(y / this.GAP_Y)];
  }

  // get topleft coorinate for <x,y>
  private getCoordinate(x, y) {
    return {x: x * this.GAP_X, y: x * this.GAP_Y};
  }

  private setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
  public reDraw(): void {
    this.clearAll();
    if (this.isGrid) {
      this.drawGrid();
    }
    this.draw(this.mCachePoint);
  }
}

class DrawManager {
  private mCanvusBack: MyCanvus;
  private mCanvusFront: MyCanvus;
  private mStartPoint;
  private ele: DrawElemnet;
  private mStack: Array<Points> = new Array();
  constructor(canvus_id1, canvus_id2) {
    // intilizate the elemnets
    this.mCanvusBack = new MyCanvus(canvus_id1, true);
    this.mCanvusFront = new MyCanvus(canvus_id2);
    var _this = this;
    this.mCanvusFront.mCallback = {
      onStart: function(a) {
        _this.mStartPoint = a;
      },
      onEnd: function(a) {
        _this.mStack.push(_this.ele.getPoints())
        _this.repaintBack();
      },
      onMove: function(a) {
        _this.ele =
            new Rect(_this.mStartPoint[0], _this.mStartPoint[1], a[0], a[1]);
        _this.mCanvusFront.clearAll();
        _this.ele.draw(_this.mCanvusFront);
      }
    }
  }
  repaintBack(): any {
    for (let p of this.mStack) {
      this.mCanvusBack.draw(p);
    }
  }
}

new DrawManager('canvas', 'canvas1')

    /*
    var drawBoard = (function() {
      // define const here


      dpi_adjust();
      //this.context = canvas.getContext("2d");
      function buildCanvus(ele) {
        let returnable = {
          canvas: ele,
          this.context: ele.getContext("2d"),
          dpi:
        };
        returnable.get = {
          style: {
            height() {
              return +getComputedStyle(ele).getPropertyValue("height").slice(0,
    -2);
            },
            width() {
              return +getComputedStyle(ele).getPropertyValue("width").slice(0,
    -2);
            }
          },
          attr: {
            height() {
              return returnable.ele.getAttribute("height");
            },
            width() {
              return returnable.ele.getAttribute("height");
            }
          }
        };
        returnable.set = {
          style: {
            height(ht) {
              ele.style.height = ht + "px";
            },
            width(wth) {
              ele.style.width = wth + "px";
            }
          },
          attr: {
            height(ht) {
              ele.setAttribute("height", ht);
            },
            width(wth) {
              ele.setAttribute("width", wth);
            }
          }
        };
        return returnable;
      }

      function dpi_adjust() {
        dpi =  window.devicePixelRatio;
      set.attr.height(get.style.height() * dpi);
      set.attr.width(get.style.width() * dpi);
    }
    */