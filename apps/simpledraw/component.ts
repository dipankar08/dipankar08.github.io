import { CommonUtils } from "./utils";
import { MyCanvus } from "./canvus";
import {
  DrawOption,
  Point,
  Points,
  DrawType,
  DrawElemnet,
  DrawElementMouseEventHandler,
  Style,
  DrawPackage,
  ElementPackage,
  Direction
} from "./interface";
import { DrawManager } from "./draw";

export class BaseDrawElemnet implements DrawElemnet{
  points: Points = new Array();
  getElementPackage(): ElementPackage {
    throw new Error("Method not implemented for BaseDrawElemnet.");
  }  
  getDrawOption(): DrawOption {
    throw new Error("Method not implemented for BaseDrawElemnet");
  }
  moveBy(offset: Point) : DrawElemnet{
    throw new Error("Method not implemented for BaseDrawElemnet");
  }

  resize(from: Point, to: Point) {
    throw new Error("Method not implemented for BaseDrawElemnet");
  }

  public clone(): any {
    return (JSON.parse(JSON.stringify(this)));
}
}

export class MarkBox extends BaseDrawElemnet {
  moveBy(offset: Point):DrawElemnet {
    return new MarkBox(this.x1+offset.x,this.y1+offset.y, this.x2+offset.x, this.y2+offset.y)
  }
  resize(from: Point, to: Point) {
    
  }
  getDrawOption(): DrawOption {
    return DrawOption.MARKBOX;
  }
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  constructor(x11, y11, x22, y22) {
    super();
    let cor = CommonUtils.getFixedCorner(x11, y11, x22, y22);
    let x1 = (this.x1 = cor[0]);
    let y1 = (this.y1 = cor[1]);
    let x2 = (this.x2 = cor[2]);
    let y2 = (this.y2 = cor[3]);
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        this.points.push({ x: x1, y: y1, type: DrawType.MARK });
      }
    }
  }
  getElementPackage(): ElementPackage {
    return {
      points: this.points,
      type: DrawOption.RECT,
      args: [this.x1, this.y1, this.x2, this.y2],
      ele: this,
    };
  }
}

export class Rect extends BaseDrawElemnet {
  moveBy(offset: Point):DrawElemnet {
    return new Rect(this.x1+offset.x,this.y1+offset.y, this.x2+offset.x, this.y2+offset.y)
  }
  resize(from: Point, to: Point) {
    throw new Error("Method not implemented.");
  }
  getDrawOption(): DrawOption {
    return DrawOption.RECT;
  }
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  points: Points = new Array();
  constructor(x11, y11, x22, y22) {
    super();
    let cor = CommonUtils.getFixedCorner(x11, y11, x22, y22);
    let x1 = (this.x1 = cor[0]);
    let y1 = (this.y1 = cor[1]);
    let x2 = (this.x2 = cor[2]);
    let y2 = (this.y2 = cor[3]);
    this.points = this.points.concat(CommonUtils.line_x(x1, y1, x2 - x1));
    this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
    this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
    this.points = this.points.concat(CommonUtils.line_y(x2, y1, y2 - y1));
    this.points.push({ x: x1, y: y1, type: DrawType.PLUS });
    this.points.push({ x: x1, y: y2, type: DrawType.PLUS });
    this.points.push({ x: x2, y: y1, type: DrawType.PLUS });
    this.points.push({ x: x2, y: y2, type: DrawType.PLUS });
  }
  getElementPackage(): ElementPackage {
    return {
      points: this.points,
      type: DrawOption.RECT,
      args: [this.x1, this.y1, this.x2, this.y2], ele: this,
    };
  }
}

export class ALine extends BaseDrawElemnet {
  protected x1: number;
  protected y1: number;
  protected x2: number;
  protected y2: number;

  moveBy(offset: Point):DrawElemnet {
    throw new Error("Method not implemented for ALine");
  }
  resize(from: Point, to: Point) {
    throw new Error("Method not implemented.");
  }
  getDrawOption(): DrawOption {
    return DrawOption.NONE;
  }
  points: Points = new Array();

  constructor(x1, y1, x2, y2) {
    super()
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    switch (CommonUtils.getDirection(x1, y1, x2, y2)) {
      case 1:
        this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
        this.points.push({ x: x1, y: y2, type: DrawType.PLUS });
        this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
        break;
      case 2:
        this.points = this.points.concat(CommonUtils.line_y(x1, y2, y1 - y2));
        this.points.push({ x: x1, y: y2, type: DrawType.PLUS });
        this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
        break;
      case 3:
        this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
        this.points.push({ x: x1, y: y2, type: DrawType.PLUS });
        this.points = this.points.concat(CommonUtils.line_x(x2, y2, x1 - x2));
        break;
      case 4:
        this.points = this.points.concat(CommonUtils.line_y(x1, y2, y1 - y2));
        this.points.push({ x: x1, y: y2, type: DrawType.PLUS });
        this.points = this.points.concat(CommonUtils.line_x(x2, y2, x1 - x2));
        break;
    }
  }
  getElementPackage(): ElementPackage {
    return {
      points: this.points,
      type: DrawOption.LINE,
      args: [] //TODO,
      , ele: this,
    };
  }
}

export class Line extends ALine {
  getDrawOption(): DrawOption {
    return DrawOption.LINE;
  }
  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
    this.points.push({ x: x1, y: y1, type: DrawType.PLUS });
    this.points.push({ x: x2, y: y2, type: DrawType.PLUS });
  }
  moveBy(offset: Point):DrawElemnet {
    return new Line(this.x1+offset.x,this.y1+offset.y, this.x2+offset.x, this.y2+offset.y)
  }
}

class Line_D extends ALine {

  getDrawOption(): DrawOption {
    return DrawOption.LINE_D;
  }
  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
    this.points.push({ x: x1, y: y1, type: DrawType.PLUS });
    let lastPt = this.points[this.points.length - 1];
    let dim = CommonUtils.getDirectionOfTwoConsicutivePoints(
      { x: lastPt.x, y: lastPt.y },
      { x: x2, y: y2 }
    );
    if (dim != Direction.NONE) {
      console.log(dim);
      CommonUtils.pushAndReplace(this.points, {
        x: x2,
        y: y2,
        type: DrawType.ARROW,
        data: dim
      });
    } else {
      console.log("Error in Line_D ");
    }
  }
  moveBy(offset: Point) :DrawElemnet{
    return new Line_D(this.x1+offset.x,this.y1+offset.y, this.x2+offset.x, this.y2+offset.y)
  }
}
class Line_DD extends ALine {
  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
    CommonUtils.pushAndReplace(this.points, {
      x: x2,
      y: y2,
      type: DrawType.DOT,
      data: ">"
    });
    CommonUtils.pushAndReplace(this.points, {
      x: x1,
      y: y1,
      type: DrawType.DOT,
      data: "<"
    });
  }
  
  getDrawOption(): DrawOption {
    return DrawOption.LINE_DD;
  }

  moveBy(offset: Point):DrawElemnet {
    return new Line_DD(this.x1+offset.x,this.y1+offset.y, this.x2+offset.x, this.y2+offset.y)
  }

}

export class Text extends BaseDrawElemnet {
  moveBy(offset: Point):DrawElemnet {
    return new Text(this.x1+offset.x,this.y1+offset.y, this.text);
  }
  resize(from: Point, to: Point) {
    throw new Error("Method not implemented.");
  }
  getDrawOption(): DrawOption {
    return DrawOption.TEXT;
  }
  x1: number;
  y1: number;
  text: string;
  points: Points = new Array();
  constructor(x: number, y: number, text: string) {
    super()
    for (let i = 0; i < text.length; i++) {
      this.points.push({
        x: x + i,
        y: y,
        type: DrawType.CHAR,
        data: text.charAt(i)
      });
    }
  }
  getElementPackage(): ElementPackage {
    return {
      points: this.points,
      type: DrawOption.TEXT,
      args: [this.x1, this.y1, this.text] , ele: this,
    };
  }
}

export class ClearBox extends BaseDrawElemnet {
  moveBy(offset: Point):DrawElemnet {
    return new ClearBox(this.x1+offset.x,this.y1+offset.y, this.x2+offset.x, this.y2+offset.y)
  }
  resize(from: Point, to: Point) {
    throw new Error("Method not implemented.");
  }
  getDrawOption(): DrawOption {
    return DrawOption.CLEAR;
  }
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points: Points = new Array();
  constructor(x1, y1, x2, y2) {
    super();
    for (var i = x1; i <= x2; i++) {
      for (var j = y1; j <= y2; j++) {
        this.points.push({ x: i, y: j, type: DrawType.CLEAR });
      }
    }
  }
  getElementPackage(): ElementPackage {
    return {
      points: this.points,
      type: DrawOption.LINE,
      args: [this.x1, this.y1, this.y1, this.y2] , ele: this,
    };
  }
}


/*****************************************************
 *  Define the manager below.
 *****************************************************/
export class ComponentManager {
  private mDrawManager: DrawManager;
  private mStartPoint;
  private ele?: DrawElemnet;
  private mDrawOption: DrawOption = DrawOption.NONE;
  private mTextEle = null;

  constructor(d: DrawManager) {
    this.mDrawManager = d;
  }
  public onStart(point: Point) {
    this.mStartPoint = point;
    if (this.isTextAction()) {
      this, this.handleTextStart(point);
    } else if (this.isSelectAction()) {
      this.handleSelectStart(point);
    } else if (this.isDrawFunction()) {
      this.handleDrawStart(point);
    } else if (this.isMoveAction()) {
      this.handleMovedStart(point);
    }
  }

  public onEnd(a: Point) {
    if (this.ele) {
      if (this.isSelectAction()) {
        this.handleSelectEnd(a);
      } else if (this.isDrawFunction()) {
        this.handleDrawEnd(this.ele.getElementPackage().points);
      } else if (this.isMoveAction()) {
        this.handleMovedEnd(a);
      }
    }
  }

  public onMove(a: Point) {
    if (this.isSelectAction()) {
      this.handleSelectMove(a);
    } else if (this.isDrawFunction()) {
      this.handleDrawMove(a);
    } else if (this.isMoveAction()) {
      this.handleMovedMove(a);
    }
  }
  public select(dpot: DrawOption) {
    this.mDrawOption = dpot;
  }

  public getStyle(): Style {
    return this.mDrawManager.getStyle();
  }

  /*************************************************************
   *  Define Text Functions
   * ************************************************************/

  private mText = null;
  public isTextAction() {
    return this.mDrawOption == DrawOption.TEXT;
  }
  public onTextSubmit() {
    if (this.mText.length > 0) {
      let ele = new Text(this.mStartPoint.x, this.mStartPoint.y, this.mText);
      this.mDrawManager.insertToStack({
        pack: ele.getElementPackage(),
        style: this.mDrawManager.getStyle()
      });
      this.mDrawManager.discardChange();
    }
    this.mText = "";
  }
  private handleTextStart(point) {
    this.mStartPoint = point;
    this.mText = "";
    this.onTextChange("");
    if (this.mDrawManager.mUiCallback) {
      this.mDrawManager.mUiCallback.onTextBoxShown();
    }
  }

  public onTextCancel() {
    this.mDrawManager.discardChange();
    this.mText = "";
  }
  public onTextChange(text: string) {
    console.log(text);
    this.mText = text;
    if (this.mText.length == 0) {
      let ele = new MarkBox(
        this.mStartPoint.x,
        this.mStartPoint.y,
        this.mStartPoint.x,
        this.mStartPoint.y
      );
      this.mDrawManager.drawFront({
        pack: ele.getElementPackage(),
        style: this.mDrawManager.getStyle()
      });
    } else {
      this.mTextEle = new Text(
        this.mStartPoint.x,
        this.mStartPoint.y,
        this.mText
      );
      this.mDrawManager.drawFront({
        pack: this.mTextEle.getElementPackage(),
        style: this.mDrawManager.getStyle()
      });
    }
  }

  /*************************************************************
   *  Define Draw Functions
   * ************************************************************/

  private isDrawFunction() {
    return (
      this.mDrawOption == DrawOption.LINE ||
      this.mDrawOption == DrawOption.LINE_D ||
      this.mDrawOption == DrawOption.LINE_DD ||
      this.mDrawOption == DrawOption.RECT ||
      this.mDrawOption == DrawOption.CLEAR
    );
  }
  private handleDrawStart(point) {
    this.mStartPoint = point;
  }
  private handleDrawMove(a) {
    switch (this.mDrawOption) {
      case DrawOption.RECT:
        this.ele = new Rect(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
        break;
      case DrawOption.LINE:
        this.ele = new Line(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
        break;
      case DrawOption.LINE_D:
        this.ele = new Line_D(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
        break;
      case DrawOption.LINE_DD:
        this.ele = new Line_DD(
          this.mStartPoint.x,
          this.mStartPoint.y,
          a.x,
          a.y
        );
        break;
      case DrawOption.CLEAR:
        this.ele = new ClearBox(
          this.mStartPoint.x,
          this.mStartPoint.y,
          a.x,
          a.y
        );
        break;
    }
    this.mDrawManager.drawFront({
      pack: this.ele.getElementPackage(),
      style: this.getStyle()
    });
  }

  private handleDrawEnd(points: Points) {
    if (this.isDrawFunction()) {
      this.mDrawManager.drawBack({
        pack: this.ele.getElementPackage(),
        style: this.mDrawManager.getStyle()
      });
    } else {
    }
  }

  /*************************************************************
   *  Define Select Functions
   * ************************************************************/

  private mSelectedPack: DrawPackage;
  private mSelectedIdx: number;
  public isSelectAction() {
    return (
      this.mDrawOption == DrawOption.SELECT ||
      this.mDrawOption == DrawOption.SELECTED_DELETE ||
      this.mDrawOption == DrawOption.SELECTED_DUPLICATE
    );
  }

  public handleSelectStart(point: Point) {
    this.mSelectedIdx = this.mDrawManager.getStackIndexForPoint(point);
    if (this.mSelectedIdx == -1) {
      //dismiss selection.
      return;
    }
    this.mSelectedPack = this.mDrawManager.getStackPoints(this.mSelectedIdx);
    this.mDrawManager.drawFront(this.mSelectedPack);
  }

  public handleSelectMove(point: Point) {}
  public handleSelectEnd(point: Point) {
    if (this.mSelectedIdx == -1) {
      return;
    }
    switch (this.mDrawOption) {
      case DrawOption.SELECTED_DELETE:
        this.mDrawManager.deleteFromStack(this.mSelectedIdx);
        break;
      case DrawOption.SELECTED_DUPLICATE:
        let ele = this.mSelectedPack.pack.ele.moveBy({x:-2, y:-2});
        this.mDrawManager.insertToStack(
          {
            style: this.mSelectedPack.style,
            pack: ele.getElementPackage()
          }
        );
        break;
    }
    this.mDrawManager.discardChange();
    this.mSelectedIdx = -1;
  }
  /*************************************************************
   *  Define Moved Functions
   * ************************************************************/

  private mMovedPack: DrawPackage;
  private mMovedStart: Point;
  private mMovedIdx: number = -1;
  private mDrawElemnet : DrawElemnet;
  public isMoveAction() {
    return (
      this.mDrawOption == DrawOption.MOVE ||
      DrawOption.COPY_AND_MOVE ||
      DrawOption.RESIZE
    );
  }

  public handleMovedStart(point: Point) {
    this.mMovedIdx = this.mDrawManager.getStackIndexForPoint(point);
    if (this.mMovedIdx == -1) {
      //dismiss selection.
      return;
    }
    this.mMovedStart = point;
    this.mMovedPack = this.mDrawManager.getStackPoints(this.mMovedIdx);
    this.mDrawElemnet = this.mMovedPack.pack.ele;
    switch (this.mDrawOption) {
      case DrawOption.MOVE:
        this.mDrawManager.drawBackWithoutSpacific(this.mMovedIdx);
        break;
      case DrawOption.COPY_AND_MOVE:
      case DrawOption.RESIZE:
    }
    this.mDrawManager.drawFront(this.mMovedPack);
  }

  public handleMovedMove(point: Point) {
    if (this.mMovedIdx == -1) {
      return;
    }
    switch (this.mDrawOption) {
      case DrawOption.MOVE:
      case DrawOption.COPY_AND_MOVE:
      let ele1 = this.mMovedPack.pack.ele.moveBy({x:point.x - this.mMovedStart.x, y:point.y - this.mMovedStart.y});
      this.mDrawManager.drawFront(
        {
          style: this.mMovedPack.style,
          pack: ele1.getElementPackage()
        });
        break;
      case DrawOption.RESIZE:
        this.mDrawManager.drawFront(
          CommonUtils.resizeTransform(this.mMovedPack, this.mMovedStart, point)
        );
    }
  }
  public handleMovedEnd(point: Point) {
    if (this.mMovedIdx == -1) {
      return;
    }
    switch (this.mDrawOption) {
      case DrawOption.COPY_AND_MOVE:
      let ele2 = this.mMovedPack.pack.ele.moveBy({x:point.x - this.mMovedStart.x, y:point.y - this.mMovedStart.y});
      this.mDrawManager.insertToStack(
        {
          style: this.mMovedPack.style,
          pack: ele2.getElementPackage()
        });
        break;
      case DrawOption.MOVE:
      let ele3 = this.mMovedPack.pack.ele.moveBy({x:point.x - this.mMovedStart.x, y:point.y - this.mMovedStart.y});
      this.mDrawManager.replaceToStack(
        this.mMovedIdx,
        {
          style: this.mMovedPack.style,
          pack: ele3.getElementPackage()
        });
        break;
      case DrawOption.RESIZE:
        this.mDrawManager.replaceToStack(
          this.mMovedIdx,
          CommonUtils.resizeTransform(this.mMovedPack, this.mMovedStart, point)
        );
    }
    this.mDrawManager.discardChange();
    this.mMovedIdx = -1;
    this.mMovedStart = null;
    this.mMovedPack = null;
  }
}