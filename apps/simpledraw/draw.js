"use strict";
exports.__esModule = true;
var DrawType;
(function (DrawType) {
    DrawType[DrawType["PLUS"] = 0] = "PLUS";
    DrawType[DrawType["MINUS"] = 1] = "MINUS";
    DrawType[DrawType["MINUS_V"] = 2] = "MINUS_V";
    DrawType[DrawType["TEXT"] = 3] = "TEXT";
    DrawType[DrawType["CLEAR"] = 4] = "CLEAR";
    DrawType[DrawType["MARK"] = 5] = "MARK";
})(DrawType || (DrawType = {}));
var DrawOption;
(function (DrawOption) {
    DrawOption[DrawOption["LINE"] = 0] = "LINE";
    DrawOption[DrawOption["LINE_D"] = 1] = "LINE_D";
    DrawOption[DrawOption["RECT"] = 2] = "RECT";
    DrawOption[DrawOption["TEXT"] = 3] = "TEXT";
    DrawOption[DrawOption["CLEAR"] = 4] = "CLEAR";
    DrawOption[DrawOption["MARK"] = 5] = "MARK";
})(DrawOption || (DrawOption = {}));
var CommonUtils = /** @class */ (function () {
    function CommonUtils() {
    }
    CommonUtils.line_x = function (x1, y1, count) {
        var p = new Array();
        for (var i = 1; i < count; i++) {
            p.push({ x: x1 + i, y: y1, type: DrawType.MINUS });
        }
        return p;
    };
    CommonUtils.line_y = function (x1, y1, count) {
        var p = new Array();
        for (var i = 1; i < count; i++) {
            p.push({ x: x1, y: y1 + i, type: DrawType.MINUS_V });
        }
        return p;
    };
    // get direction for two touch point.
    CommonUtils.getDirection = function (x1, y1, x2, y2) {
        if (x1 <= x2) {
            if (y1 <= y2) {
                return 1; //Down Right
            }
            else {
                return 2; // UP Right.
            }
        }
        else {
            if (y1 <= y2) {
                return 3; // Down Left
            }
            else {
                return 4; // UP Left
            }
        }
    };
    // returns the topleft and botton right for any two point acts as rest
    CommonUtils.getFixedCorner = function (x1, y1, x2, y2) {
        if (x1 <= x2) {
            if (y1 <= y2) {
                return [x1, y1, x2, y2];
            }
            else {
                return [x1, y2, x2, y1];
            }
        }
        else {
            if (y1 <= y2) {
                return [x2, y1, x1, y2];
            }
            else {
                return [x2, y2, x1, y1];
            }
        }
    };
    CommonUtils.myProp = "Hello";
    return CommonUtils;
}());
exports.CommonUtils = CommonUtils;
var LineX = /** @class */ (function () {
    function LineX(x1, y1, count) {
        this.x1 = x1;
        this.y1 = y1;
        this.count = count;
        for (var i = 0; i <= this.count; i++) {
            this.points.push({ x: this.x1 + i, y: this.y1, type: DrawType.MINUS });
        }
    }
    LineX.prototype.draw = function (myCanvus) {
        myCanvus.draw(this.points);
    };
    LineX.prototype.getPoints = function () {
        return this.points;
    };
    return LineX;
}());
var LineY = /** @class */ (function () {
    function LineY(x1, y1, count) {
        this.x1 = x1;
        this.y1 = y1;
        this.count = count;
        for (var i = 0; i <= this.count; i++) {
            this.points.push({ x: this.x1, y: this.y1 + i, type: DrawType.MINUS_V });
        }
    }
    LineY.prototype.draw = function (myCanvus) {
        myCanvus.draw(this.points);
    };
    LineY.prototype.getPoints = function () {
        return this.points;
    };
    return LineY;
}());
var Rect = /** @class */ (function () {
    function Rect(x1, y1, x2, y2) {
        this.points = new Array();
        var cor = CommonUtils.getFixedCorner(x1, y1, x2, y2);
        this.x1 = cor[0];
        this.y1 = cor[1];
        this.x2 = cor[2];
        this.y2 = cor[3];
        this.points = this.points.concat(CommonUtils.line_x(x1, y1, x2 - x1));
        this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
        this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
        this.points = this.points.concat(CommonUtils.line_y(x2, y1, y2 - y1));
        this.points.push({ x: x1, y: y1, type: DrawType.PLUS });
        this.points.push({ x: x1, y: y2, type: DrawType.PLUS });
        this.points.push({ x: x2, y: y1, type: DrawType.PLUS });
        this.points.push({ x: x2, y: y2, type: DrawType.PLUS });
    }
    Rect.prototype.draw = function (myCanvus) {
        myCanvus.draw(this.points);
    };
    Rect.prototype.getPoints = function () {
        return this.points;
    };
    return Rect;
}());
var Line = /** @class */ (function () {
    function Line(x1, y1, x2, y2) {
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
        this.points.push({ x: x1, y: y1, type: DrawType.PLUS });
        this.points.push({ x: x2, y: y2, type: DrawType.PLUS });
        this.points.push({ x: x1, y: y2, type: DrawType.PLUS });
    }
    Line.prototype.draw = function (myCanvus) {
        myCanvus.draw(this.points);
    };
    Line.prototype.getPoints = function () {
        return this.points;
    };
    return Line;
}());
var Text = /** @class */ (function () {
    function Text(x1, y, text) {
        for (var i = 0; i < text.length; i++) {
            this.points.push({ x: i, y: this.y1, type: DrawType.TEXT, data: text.charAt(i) });
        }
    }
    Text.prototype.draw = function (myCanvus) {
        myCanvus.draw(this.points);
    };
    Text.prototype.getPoints = function () {
        return this.points;
    };
    return Text;
}());
var ClearBox = /** @class */ (function () {
    function ClearBox(x1, y1, x2, y2) {
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                this.points.push({ x: i, y: j, type: DrawType.CLEAR });
            }
        }
    }
    ClearBox.prototype.draw = function (myCanvus) {
        myCanvus.draw(this.points);
    };
    ClearBox.prototype.getPoints = function () {
        return this.points;
    };
    return ClearBox;
}());
// define const:
var BACKGROUND_COLOR = "#fff";
var STOKE_COLOR = "#F2EFEB"; //"#FEFAF9"//"#f5f5f5"
var TEXT_COLOR = "#000";
var MyCanvus = /** @class */ (function () {
    function MyCanvus(canvus_id, isGrid) {
        this.GAP_X = 10;
        this.GAP_Y = 16;
        this.TEXT_GAP_OFFSET = 2;
        this.drawing = false;
        this.isGrid = false;
        this.mCachePoint = new Array();
        // intilizate the elemnets
        this.canvas = document.getElementById(canvus_id);
        this.dpi = window.devicePixelRatio;
        this.context = this.canvas.getContext("2d");
        this.isGrid = isGrid;
        // touch listner.
        var _this = this;
        window.addEventListener("resize", function () {
            console.log("One One");
            _this.setSize(window.innerWidth, window.innerHeight);
            _this.reDraw();
        }, false);
        this.canvas.addEventListener("mousedown", function (e) {
            _this.drawing = true;
            _this.mousePos = _this.getMousePos(e);
            if (_this.mCallback) {
                _this.mCallback.onStart(_this.mousePos);
            }
        }, false);
        this.canvas.addEventListener("mouseup", function (e) {
            _this.drawing = false;
            _this.notify(_this.getMousePos(e));
            if (_this.mCallback) {
                _this.mCallback.onEnd();
            }
        }, false);
        this.canvas.addEventListener("mousemove", function (e) {
            _this.notify(_this.getMousePos(e));
        }, false);
        this.drawGrid();
    }
    MyCanvus.prototype.notify = function (mousePos) {
        if (!this.drawing) {
            return;
        }
        if (this.lastPos && this.lastPos[0] == mousePos[0] && this.lastPos[1] == mousePos[1]) {
            return;
        }
        this.lastPos = mousePos;
        console.log(mousePos);
        if (this.mCallback) {
            this.mCallback.onMove(mousePos);
        }
    };
    // draw the grid.
    MyCanvus.prototype.drawGrid = function () {
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
    };
    MyCanvus.prototype.draw = function (points) {
        this.context.beginPath();
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var p = points_1[_i];
            switch (p.type) {
                case DrawType.PLUS:
                    this.plus(p.x, p.y);
                    break;
                case DrawType.MINUS:
                    this.minus(p.x, p.y);
                    break;
                case DrawType.MINUS_V:
                    this.minus_v(p.x, p.y);
                    break;
                case DrawType.MARK:
                    this.mark(p.x, p.y);
                    break;
                case DrawType.CLEAR:
                    this.clear(p.x, p.y);
                    break;
                case DrawType.TEXT:
                    this.printChar(p.x, p.y, p.data);
                    break;
            }
        }
        this.context.strokeStyle = TEXT_COLOR;
        this.context.stroke();
        this.mCachePoint = points;
    };
    MyCanvus.prototype.mark = function (x, y, color) {
        if (!color) {
            color = STOKE_COLOR;
        }
        this.context.fillStyle = color;
        this.context.fillRect(x * this.GAP_X + 1, y * this.GAP_Y + 1, this.GAP_X - 1, this.GAP_Y - 1);
    };
    MyCanvus.prototype.clear = function (x, y) {
        this.context.fillStyle = BACKGROUND_COLOR;
        this.context.fillRect(x * this.GAP_X + 1, y * this.GAP_Y + 1, this.GAP_X - 1, this.GAP_Y - 1);
    };
    ;
    MyCanvus.prototype.printChar = function (x, y, c) {
        this.context.font = "14px monospace";
        this.context.fillText(c, x * this.GAP_X, y * this.GAP_Y + this.GAP_Y - this.TEXT_GAP_OFFSET);
    };
    // draw plus
    MyCanvus.prototype.plus = function (x, y) {
        var midx = x * this.GAP_X + this.GAP_X / 2;
        var midy = y * this.GAP_Y + this.GAP_Y / 2;
        this.context.moveTo(midx - 3 + 0.5, midy + 0.5);
        this.context.lineTo(midx + 3 + 0.5, midy + 0.5);
        this.context.moveTo(midx + 0.5, midy - 3);
        this.context.lineTo(midx + 0.5, midy + 3);
        this.mark(x, y);
    };
    //draw minus 
    MyCanvus.prototype.minus = function (x, y) {
        this.context.moveTo(x * this.GAP_X + 2.5, y * this.GAP_Y + this.GAP_Y / 2 + 0.5);
        this.context.lineTo((x + 1) * this.GAP_X - 1.5, y * this.GAP_Y + this.GAP_Y / 2 + 0.5);
        this.mark(x, y);
    };
    // draw minus in vertical.
    MyCanvus.prototype.minus_v = function (x, y) {
        this.context.moveTo(x * this.GAP_X + this.GAP_X / 2 + 0.5, y * this.GAP_Y + 2);
        this.context.lineTo(x * this.GAP_X + this.GAP_X / 2 + 0.5, (y + 1) * this.GAP_Y - 2);
        this.mark(x, y);
    };
    // clear canvus
    MyCanvus.prototype.clearAll = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    ;
    // find the corid for touch point.
    MyCanvus.prototype.getMousePos = function (mouseEvent) {
        var rect = this.canvas.getBoundingClientRect();
        var x = mouseEvent.clientX - rect.left;
        var y = mouseEvent.clientY - rect.top;
        return [Math.floor(x / this.GAP_X), Math.floor(y / this.GAP_Y)];
    };
    // get topleft coorinate for <x,y>
    MyCanvus.prototype.getCoordinate = function (x, y) {
        return { x: x * this.GAP_X, y: x * this.GAP_Y };
    };
    MyCanvus.prototype.setSize = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    MyCanvus.prototype.reDraw = function () {
        this.clearAll();
        if (this.isGrid) {
            this.drawGrid();
        }
        this.draw(this.mCachePoint);
    };
    return MyCanvus;
}());
var DrawManager = /** @class */ (function () {
    function DrawManager(canvus_id1, canvus_id2) {
        this.mStack = new Array();
        // intilizate the elemnets
        this.mCanvusBack = new MyCanvus(canvus_id1, true);
        this.mCanvusFront = new MyCanvus(canvus_id2);
        var _this = this;
        this.mCanvusFront.mCallback = {
            onStart: function (a) {
                _this.mStartPoint = a;
            },
            onEnd: function (a) {
                _this.mStack.push(_this.ele.getPoints());
                _this.repaintBack();
            },
            onMove: function (a) {
                _this.ele = new Rect(_this.mStartPoint[0], _this.mStartPoint[1], a[0], a[1]);
                _this.mCanvusFront.clearAll();
                _this.ele.draw(_this.mCanvusFront);
            }
        };
    }
    DrawManager.prototype.repaintBack = function () {
        for (var _i = 0, _a = this.mStack; _i < _a.length; _i++) {
            var p = _a[_i];
            this.mCanvusBack.draw(p);
        }
    };
    return DrawManager;
}());
new DrawManager('canvas', 'canvas1');
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
          return +getComputedStyle(ele).getPropertyValue("height").slice(0, -2);
        },
        width() {
          return +getComputedStyle(ele).getPropertyValue("width").slice(0, -2);
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
