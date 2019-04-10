import { CommonUtils } from "./utils";
import { MyCanvus } from "./canvus";
import { DrawOption, Point, Points, DrawType, DrawElemnet, DrawElementMouseEventHandler, Style, DrawPackage, ElementPackage } from "./interface";
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
    getElementPackage(): ElementPackage{
      return {
        points:this.points,
        type:DrawOption.LINE,
        args:[this.x1,this.y1,this.count]
    }
  }
    
  }
  
  export class TestPoint implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.TEST_POINT;
    }
    points: Points  = new Array();
    constructor() {
    }
    getElementPackage(): ElementPackage{
      return {
        points:this.points,
        type:DrawOption.LINE,
        args:[]
    }
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
    getElementPackage(): ElementPackage{
      return {
        points:this.points,
        type:DrawOption.LINE,
        args:[this.x1,this.y1,this.count]
    }
    }
  }
  
  export class Rect implements DrawElemnet {
    getDrawOption(): DrawOption {
      return DrawOption.RECT;
    }
    private x1:number; 
    private y1:number;
    private x2:number;
    private y2:number;
    points: Points = new Array();
    constructor(x11, y11, x22, y22) {
      let cor = CommonUtils.getFixedCorner(x11, y11, x22, y22);
      let x1 = this.x1= cor[0];
      let y1 = this.y1=  cor[1];
      let x2 = this.x2= cor[2];
      let y2 = this.y2 =  cor[3];
      this.points = this.points.concat(CommonUtils.line_x(x1, y1, x2 - x1));
      this.points = this.points.concat(CommonUtils.line_x(x1, y2, x2 - x1));
      this.points = this.points.concat(CommonUtils.line_y(x1, y1, y2 - y1));
      this.points = this.points.concat(CommonUtils.line_y(x2, y1, y2 - y1));
      this.points.push({x: x1, y: y1, type: DrawType.PLUS});
      this.points.push({x: x1, y: y2, type: DrawType.PLUS});
      this.points.push({x: x2, y: y1, type: DrawType.PLUS});
      this.points.push({x: x2, y: y2, type: DrawType.PLUS});
    }
    getElementPackage(): ElementPackage{
      return {
        points:this.points,
        type:DrawOption.RECT,
        args:[this.x1,this.y1,this.x2, this.y2]
      }
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
    getElementPackage(): ElementPackage{
      return {
        points:this.points,
        type:DrawOption.LINE,
        args:[]//TODO
    }
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
    constructor(x: number, y: number, text: string) {
      for (let i = 0; i < text.length; i++) {
        this.points.push(
            {x: x+i, y: y, type: DrawType.CHAR, data: text.charAt(i)})
      }
    }
    getElementPackage(): ElementPackage{
      return {
        points:this.points,
        type:DrawOption.TEXT,
        args:[this.x1,this.y1,this.text]
    }
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
    getElementPackage(): ElementPackage{
      return {
        points:this.points,
        type:DrawOption.LINE,
        args:[this.x1,this.y1,this.y1, this.y2]
    }
    }
  }

export class ComponentManager{
    private mDrawManager:DrawManager;
    private mStartPoint;
    private ele?: DrawElemnet;
    private mDrawOption:DrawOption = DrawOption.NONE;
    private mTextEle = null;

    constructor(d:DrawManager){
        this.mDrawManager = d;
    }
    public onStart(point:Point){
        this.mStartPoint = point;
        if(this.isSelectAction()){
          this.handleSelectStart(point);
        }
        else if(this.isDrawFunction()){
            this.handleDrawStart(point);
          }
          else if(this.isMoveAction()){
              this.handleMovedStart(point)
          }  
    }

    public onEnd(a:Point){
        if(this.ele){
          if(this.isSelectAction()){
            this.handleSelectEnd(a);
          }
            else if(this.isDrawFunction()){
                this.handleDrawEnd(this.ele.getElementPackage().points);
              }
              else if(this.isMoveAction()){
                  this.handleMovedEnd(a);
              }
          } 
    }

    public onMove(a:Point){
      if(this.isSelectAction()){
        this.handleSelectMove(a);
      }
        else if(this.isDrawFunction()){
            this.handleDrawMove(a);
          }
          else if(this.isMoveAction()){
              this.handleMovedMove(a)
        }
    }
    public onTextSubmit(){
      if(this.mDrawOption == DrawOption.TEXT && this.mTextEle != null){
        this.mDrawManager.drawBack({pack:this.mTextEle.getElementPackage(),'style':this.mDrawManager.getStyle()});
      }
    }
    public onTextCancel(){
      
    }
    public onTextChange(text:string){
      if(this.mDrawOption == DrawOption.TEXT){
        this.mTextEle =
        new Text(this.mStartPoint.x, this.mStartPoint.y, text);
        this.mDrawManager.drawFront({pack:this.mTextEle.getElementPackage(),'style':this.mDrawManager.getStyle()});
      }
    }

    public select( dpot: DrawOption ){
      this.mDrawOption = dpot;
      if(this.isSelectAction()){
        this.handleNewSelectEvent(dpot);
      }
  }

  public getStyle():Style {
    return this.mDrawManager.getStyle();
  }


  /*************************************************************
  *  Define Draw Functions 
  * ************************************************************/ 
  private isDrawFunction(){
    return this.mDrawOption == DrawOption.LINE ||
    this.mDrawOption == DrawOption.LINE_D ||
    this.mDrawOption == DrawOption.LINE_DD ||
    this.mDrawOption == DrawOption.RECT ||
    this.mDrawOption == DrawOption.CLEAR;
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
      this.mDrawManager.drawFront({pack:this.ele.getElementPackage(),'style':this.getStyle()});
    }

  private handleDrawEnd(points:Points){
    if(this.isDrawFunction()){
      this.mDrawManager.drawBack({pack:this.ele.getElementPackage(),'style':this.mDrawManager.getStyle()});
    } else{
    }
  }

  /*************************************************************
  *  Define Select Functions 
  * ************************************************************/ 
    private mSelectedPack:DrawPackage;
    private mSelectedIdx:number;
    public isSelectAction(){
        return this.mDrawOption == DrawOption.SELECT || this.mDrawOption == DrawOption.SELECTED_DELETE || this.mDrawOption == DrawOption.SELECTED_DUPLICATE;
    }

    public handleSelectStart(point:Point){
      this.mSelectedIdx = this.mDrawManager.getStackIndexForPoint(point);
      if(this.mSelectedIdx == -1){
        //dismiss selection. 
        this.handleNewSelectEvent(DrawOption.NONE);
        return;
      }
      this.mSelectedPack = this.mDrawManager.getStackPoints(this.mSelectedIdx);
      this.mDrawManager.drawFront(this.mSelectedPack);
    }

    public handleSelectMove(point:Point){

    }
    public handleSelectEnd(point:Point){

    }
    public handleNewSelectEvent(drawOption: DrawOption){
      if(this.mSelectedIdx == -1){
        return;
      }
      switch(drawOption){
        case DrawOption.SELECTED_DELETE:
        this.mDrawManager.deleteFromStack(this.mSelectedIdx);
        break;
        case DrawOption.SELECTED_DUPLICATE:
        this.mDrawManager.insertToStack(CommonUtils.transform(this.mSelectedPack,-2, -2));
        break;
      }
      this.mDrawManager.discardChange();
      this.mSelectedIdx = -1;
    }

  /*************************************************************
  *  Define Moved Functions 
  * ************************************************************/ 
 private mMovedPack:DrawPackage;
 private mMovedStart:Point;
 private mMovedIdx:number = -1;
 public isMoveAction(){
     return this.mDrawOption == DrawOption.MOVE || DrawOption.COPY_AND_MOVE || DrawOption.RESIZE;
 }

 public handleMovedStart(point:Point){
   this.mMovedIdx = this.mDrawManager.getStackIndexForPoint(point);
   if(this.mMovedIdx == -1){
     //dismiss selection. 
     return;
   }
   this.mMovedStart = point;
   this.mMovedPack = this.mDrawManager.getStackPoints(this.mMovedIdx);
   this.mDrawManager.drawFront(this.mMovedPack);
 }

 public handleMovedMove(point:Point){
   if(this.mMovedIdx == -1){
     return;
   }
   switch(this.mDrawOption){
     case DrawOption.MOVE:
     case DrawOption.COPY_AND_MOVE:
        this.mDrawManager.drawFront(CommonUtils.transform(this.mMovedPack,point.x - this.mMovedStart.x, point.y - this.mMovedStart.y));
        break;
     case DrawOption.RESIZE:
        this.mDrawManager.drawFront(CommonUtils.resizeTransform(this.mMovedPack,this.mMovedStart,point));
   }
   
}
 public handleMovedEnd(point:Point){
  if(this.mMovedIdx == -1){
    return;
  }
  switch(this.mDrawOption){
    case DrawOption.COPY_AND_MOVE:
      this.mDrawManager.insertToStack(CommonUtils.transform(this.mMovedPack,point.x - this.mMovedStart.x, point.y - this.mMovedStart.y));
      break;
    case DrawOption.MOVE:
      this.mDrawManager.replaceToStack(this.mMovedIdx, CommonUtils.transform(this.mMovedPack,point.x - this.mMovedStart.x, point.y - this.mMovedStart.y));
      break;
    case DrawOption.RESIZE:
    this.mDrawManager.replaceToStack(this.mMovedIdx, CommonUtils.resizeTransform(this.mMovedPack,this.mMovedStart,point));   
  }
  this.mDrawManager.discardChange();
  this.mMovedIdx = -1;
  this.mMovedStart = null;
  this.mMovedPack = null;
 }
}
  
  