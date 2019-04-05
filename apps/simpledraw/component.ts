import { CommonUtils } from "./utils";
import { MyCanvus } from "./canvus";
import { DrawOption, Point, Points, DrawType, DrawElemnet, DrawElementMouseEventHandler, Style, DrawPackage } from "./interface";
import { DrawManager } from "./draw";

export class LineX implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.NONE;
    }
    x1: number;
    y1: number;
    count: number;
    points: Points = new Array();
    constructor(x1, y1, count) {
      this.x1 = x1;
      this.y1 = y1;
      this.count = count;
      for (var i = 0; i <= this.count; i++) {
        this.points.push({x: this.x1 + i, y: this.y1, type: DrawType.MINUS});
      }
    }
    getPoints(): Points {
      return this.points;
    }
  }
  
  export class TestPoint implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.TEST_POINT;
    }
    points: Points  = new Array();
    constructor() {
    }
    getPoints(): Points {
      return this.points;
    }
  }
  
  export class LineY implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.TEST_POINT;
      //throw new Error("Method not implemented.");
    }
    x1: number;
    y1: number;
    count: number;
    points: Points  = new Array();
    constructor(x1, y1, count) {
      this.x1 = x1;
      this.y1 = y1;
      this.count = count;
      for (var i = 0; i <= this.count; i++) {
        this.points.push({x: this.x1, y: this.y1 + i, type: DrawType.MINUS_V});
      }
    }
    getPoints(): Points {
      return this.points;
    }
  }
  
  export class Rect implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.RECT;
    }
    points: Points = new Array();
    constructor(x11, y11, x22, y22) {
      let cor = CommonUtils.getFixedCorner(x11, y11, x22, y22);
      let x1 = cor[0];
      let y1 = cor[1];
      let x2 = cor[2];
      let y2 = cor[3];
      this.points = this.points.concat(CommonUtils.line_x(x1, y1, x2 - x1));
      this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
      this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
      this.points = this.points.concat(CommonUtils.line_y(x2, y1, y2 - y1));
      this.points.push({x: x1, y: y1, type: DrawType.PLUS});
      this.points.push({x: x1, y: y2, type: DrawType.PLUS});
      this.points.push({x: x2, y: y1, type: DrawType.PLUS});
      this.points.push({x: x2, y: y2, type: DrawType.PLUS});
    }
    getPoints(): Points {
      return this.points;
    }
  }
  
  export class ALine implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.NONE;
    }
    points: Points  = new Array();
    
    constructor(x1, y1, x2, y2) {
      switch (CommonUtils.getDirection(x1, y1, x2, y2)) {
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
      this.points.push({x: x1, y: y2, type: DrawType.PLUS});
    }
    getPoints(): Points {
      //let filters = new Array();
      //  BUG : you must remove duplicates. 
      return this.points;
    }
  }
  
  export class Line extends ALine {
    getDrawOption(): DrawOption {
      return DrawOption.LINE;
    }
    constructor(x1, y1, x2, y2){
      super(x1,y1,x2, y2);
      this.points.push({x: x1, y: y1, type: DrawType.PLUS});
      this.points.push({x: x2, y: y2, type: DrawType.PLUS});
    }
  }
  
  class Line_D extends ALine {
    getDrawOption(): DrawOption {
      return DrawOption.LINE_D;
    }
    constructor(x1, y1, x2, y2){
      super(x1,y1,x2, y2);
      this.points.push({x: x1, y: y1, type: DrawType.PLUS});
      //this.points.push({x:x2, y:y2, type:DrawType.ARROW, data: 2})
      this.points.push({x:x2, y:y2, type:DrawType.DOT})
    }
  }
  class Line_DD extends ALine {
    getDrawOption(): DrawOption {
      return DrawOption.LINE_DD;
    }
    constructor(x1, y1, x2, y2){
      super(x1,y1,x2, y2);
      this.points.push({x:x2, y:y2, type:DrawType.DOT, data:">"})
      this.points.push({x:x1, y:y1, type:DrawType.DOT, data:"<"})
    }
  }
  
  export class Text implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.TEXT;
    }
    x1: number;
    y1: number;
    text: string;
    points: Points  = new Array();
    constructor(x1: number, y: number, text: string) {
      for (let i = 0; i < text.length; i++) {
        this.points.push(
            {x: i, y: this.y1, type: DrawType.TEXT, data: text.charAt(i)})
      }
    }
    getPoints(): Points {
      return this.points;
    }
  }
  
  export class ClearBox implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.CLEAR;
    }
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    points: Points  = new Array();
    constructor(x1, y1, x2, y2) {
      for (var i = x1; i <= x2; i++) {
        for (var j = y1; j <= y2; j++) {
          this.points.push({x: i, y: j, type: DrawType.CLEAR})
        }
      }
    }
    getPoints(): Points {
      return this.points;
    }
  }

export class ComponentManager{
    private mDrawManager:DrawManager;
    private mStartPoint;
    private ele?: DrawElemnet;
    private mDrawOption:DrawOption = DrawOption.NONE;

    constructor(d:DrawManager){
        this.mDrawManager = d;
    }
    public onStart(a:Point){
        if(this.isDrawFunction()){
            this.handleDrawStart(a);
          }
          else if(this.isMoveFunction()){
              this.handleMoveStart(a)
          }  
    }

    public onEnd(a:Point){
        if(this.ele){
            if(this.isDrawFunction()){
                this.handleDrawEnd(this.ele.getPoints());
              }
              else if(this.isMoveFunction()){
                  this.handleMoveEnd(a);
              }
          } 
    }

    public onMove(a:Point){
        if(this.isDrawFunction()){
            this.handleDrawMove(a);
          }
          else if(this.isMoveFunction()){
              this.handleMoveMove(a)
        }
    }


  private isDrawFunction(){
    return this.mDrawOption == DrawOption.LINE ||
    this.mDrawOption == DrawOption.LINE_D ||
    this.mDrawOption == DrawOption.LINE_DD ||
    this.mDrawOption == DrawOption.RECT ||
    this.mDrawOption == DrawOption.CLEAR;
    }
    private isMoveFunction(){
      return this.mDrawOption == DrawOption.MOVE;
    }
    private handleDrawStart(point){
      this.mStartPoint = point;
    }
    private handleDrawMove(a){
      switch(this.mDrawOption){
        case DrawOption.RECT:
        this.ele =
            new Rect(this.mStartPoint.x,this.mStartPoint.y, a.x, a.y);
            break;
        case DrawOption.LINE:
            this.ele =
                new Line(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;
        case DrawOption.LINE_D:
        this.ele =
            new Line_D(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
            break;
            case DrawOption.LINE_DD:
            this.ele =
                new Line_DD(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;
        case DrawOption.CLEAR:
            this.ele =
                new ClearBox(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;    
      }
      this.mDrawManager.drawFront({'points':this.ele.getPoints(),'style':this.getStyle()});
    }
   getStyle():Style {
    return this.mDrawManager.getStyle();
  }
    private handleDrawEnd(points:Points){
      this.mDrawManager.drawBack({'points':points,'style':this.mDrawManager.getStyle()});
    }

    // Move Ops.
    private mMoveSetIndex:number;
    private mMoveStart:Point;
    private isValidMove:boolean = false;
    private handleMoveStart(point:Point){
      console.log(" handleMoveStart called");
      this.mMoveStart = point;
      if(this.mDrawManager.getStackIndexForPoint(point) != -1){
        this.drawMoveTrasition(point, point)
        this.isValidMove = true;
      }
    }
    private handleMoveMove(point:Point){
      console.log(" handleMoveMove called");
      if(!this.isValidMove){
        return;
      }
      this.drawMoveTrasition(this.mMoveStart, point)
    }
    private handleMoveEnd(end:Point){
      console.log(" handleMoveEnd called");
      if(!this.isValidMove){
        return;
      }
      console.log(" handleMoveEnd called 1");
      console.log(end);
      console.log(this.getMoveTranfromedPoint(this.mMoveStart, end));
      let newPoints =this.getMoveTranfromedPoint(this.mMoveStart, end);
      this.mDrawManager.drawBackWithReplace({points:newPoints, style:this.getStyle()}, this.mMoveSetIndex);
      this.isValidMove = false;
    }
    private getMoveTranfromedPoint(start:Point, end:Point){
      let points = new Array();
      for(let p of this.mDrawManager.getStackPoints(this.mMoveSetIndex)){
        points.push({x:p.x+end.x-start.x, y:p.y+end.y - start.y, type:p.type, data:p.data})
      }
      return points;
    }
    private drawMoveTrasition(start:Point, end:Point){
      this.mDrawManager.drawFront({points:this.getMoveTranfromedPoint(start, end), style: this.getStyle()});
    }
    public select( mDrawOption: DrawOption ){
        this.mDrawOption = mDrawOption;
    }
}
  
  