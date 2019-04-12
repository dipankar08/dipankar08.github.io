// This is main DrawManager function,

import { CONSTANT } from "./constant";
import { CommonUtils } from "./utils";
import { UnitDraw } from "./unitdraw";
import { MyCanvus } from "./canvus";
import { DrawElementMouseEventHandler, Point, Points, DrawOption, DrawPackage, Style, UiCallback } from "./interface";
import { TestPoint, ComponentManager } from "./component";

export class DrawManager {
  private mCanvusBack: MyCanvus;
  private mCanvusFront: MyCanvus;
  private mPointMap:Object = {}; // list of point to index of statck
  private mStack: Array<DrawPackage> = new Array();
  private mRedo: Array<DrawPackage> = new Array();
  private mDrawElementMouseEventHandler: Array<DrawElementMouseEventHandler> = new Array();
  private mComponentManager:ComponentManager;
  public mUiCallback:UiCallback;
  private mStyle:Style = CONSTANT.THEME.DEFAULT;

  constructor(canvus_id1, canvus_id2) {
    // intilizate the elemnets
    this.mCanvusBack = new MyCanvus(canvus_id1, true);
    this.mCanvusFront = new MyCanvus(canvus_id2);
    this.mComponentManager = new ComponentManager(this);
    var _this = this;
    this.mCanvusFront.mCallback = {
      onStart: function(a) {
        _this.mComponentManager.onStart(a);
      },
      onEnd: function(a) {
        _this.mComponentManager.onEnd(a);
      },
      onMove: function(a) {
        _this.mComponentManager.onMove(a);
      },
      onResize: function(a) {
        _this.discardChange()
      }
    }
  }

  public onTextSubmit(){
    this.mComponentManager.onTextSubmit();
    if(this.mUiCallback){
      this.mUiCallback.onTextBoxHide();
    }
  }
  public onTextCancel(){
    this.mComponentManager.onTextCancel();
    if(this.mUiCallback){
      this.mUiCallback.onTextBoxHide();
    }
  }
  public onTextChange(text:string){
    this.mComponentManager.onTextChange(text);
  }
  
  private repaintBack(): void {
    this.mCanvusFront.clearAll();
    this.mCanvusBack.clearAll();
    for (let pack of this.mStack) {
      this.mCanvusBack.draw(pack, false);
    }
  }

  private repaintBackWithoutSpacific(index:number): void {
    this.mCanvusFront.clearAll();
    this.mCanvusBack.clearAll();
    for(let i =0;i<this.mStack.length;i++){
      if(i != index){
      this.mCanvusBack.draw(this.mStack[i], false);
      }
    }
  }


  private insertToStackInternal(item:DrawPackage){
    console.log("[INFO] insertToStackInternal",item);
    this.mStack.push(item);
    for(let p of item.pack.points){
      this.mPointMap[p.x+"#"+p.y]=this.mStack.length -1;
    }
  }

  // this is expensive.
  private recomputeMap(){
    this.mPointMap = new Object();
    for( let s = 0; s<this.mStack.length; s++){
      for(let p of this.mStack[s].pack.points){
        this.mPointMap[p.x+"#"+p.y]=s;
      }
    }
  }

  // look ups.
  public getStackIndexForPoint(point):number{
    if(this.mPointMap[point.x+"#"+point.y] != undefined){
      return this.mPointMap[point.x+"#"+point.y]
    } else{
      return -1;
    }
  }

  public getStackPoints(index:number):DrawPackage{
    return this.mStack[index];
  }

  public deleteFromStack(index:number){
    this.mStack.splice(index, 1);
  }

  public insertToStack(pack:DrawPackage){
    this.insertToStackInternal(pack);
  }

  public replaceToStack(index:number,pack:DrawPackage ){
    this.mStack[index] = pack;
    this.recomputeMap();
  }


  // draw functions.
  public drawFront(pack:DrawPackage){
    this.mCanvusFront.clearAll();
    this.mCanvusFront.draw(pack, true);
  }
  public drawBack(pack:DrawPackage){
    this.insertToStackInternal(pack);
    this.mCanvusFront.clearAll();
    this.repaintBack(); 
  }
  public drawBackWithReplace(pack:DrawPackage, index:number){
    this.mStack[index] = pack ;
    this.repaintBack();
    this.recomputeMap();
  }
  public drawBackWithoutSpacific(index:number){
    this.repaintBackWithoutSpacific(index)
  }

  public attach(cb:DrawElementMouseEventHandler){
    this.mDrawElementMouseEventHandler.push(cb);
  }
  public getStyle(){
    return this.mStyle;
  }
  // Public APIs
  public undo(){
    if(this.mStack.length > 0){
      this.mRedo.push(this.mStack.pop())
    }
    this.repaintBack();
  }
  public redo(){
    if(this.mRedo.length > 0){
      this.mStack.push(this.mRedo.pop())
    }
    this.repaintBack();
  }

  public select(option:DrawOption){
    this.mComponentManager.select(option);
    if(this.mUiCallback){
      this.mUiCallback.onUpdateHint('Drawing '+option.toString()+'...');
    }
  }

  public setStyle(style:Style){
    this.mStyle = style;
  }
  
  public clearAll(){
    this.mCanvusBack.clearAll();
    this.mStack = new Array()
    this.mRedo = new Array()
    this.repaintBack();
  }
  
  public discardChange(){
    this.repaintBack();
  }
  public setUiCallback(uicallback:UiCallback){
    this.mUiCallback = uicallback;
  }








 
}


// TODO.
// fix resize issue - to draw the grid at the begibing.
// fix point coordinate issye.
// defign move functinality.
// design select funtinality.