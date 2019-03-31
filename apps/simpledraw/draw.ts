// This is main DrawManager function,

import { CONSTANT } from "./constant";
import { CommonUtils } from "./utils";
import { UnitDraw } from "./unitdraw";
import { MyCanvus } from "./canvus";
import { DrawElementMouseEventHandler, Point, Points, DrawOption } from "./interface";
import { TestPoint, ComponentManager } from "./component";

export class DrawManager {
  private mCanvusBack: MyCanvus;
  private mCanvusFront: MyCanvus;
  private mPointMap:Object = {}; // list of point to index of statck
  private mStack: Array<Points> = new Array();
  private mRedo: Array<Points> = new Array();
  private mDrawElementMouseEventHandler: Array<DrawElementMouseEventHandler> = new Array();
  private mComponentManager:ComponentManager;

  constructor(canvus_id1, canvus_id2) {
    // intilizate the elemnets
    this.mCanvusBack = new MyCanvus(canvus_id1, true);
    this.mCanvusFront = new MyCanvus(canvus_id2);
    this.mCanvusFront.setStyle('#111',"#d0e4b3", "#111")
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
      }
    }
  }

  private repaintBack(): void {
    let points = new Array();
    for (let p of this.mStack.reverse()) {
      points = points.concat(p);
    }
    this.mCanvusBack.draw(points);
    this.mCanvusFront.clearAll();
  }

  private repaintBackWithoutSpacific(index:number): void {
    let points = new Array();
    for(let i =0;i<this.mStack.length;i++){
      if(i != index){
        points = points.concat(this.mStack[i]);
      }
    }
    this.mCanvusBack.draw(points.reverse());
  }


  private insertToStack(points:Points){
    this.mStack.push(points);
    for(let p of points){
      this.mPointMap[p.x+"#"+p.y]=this.mStack.length -1;
    }
  }

  // this is expensive.
  private recomputeMap(){
    this.mPointMap = new Object();
    for( let s = 0; s<this.mStack.length; s++){
      for(let p of this.mStack[s]){
        this.mPointMap[p.x+"#"+p.y]=s;
      }
    }
  }



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

  public clearAll(){
    this.mCanvusBack.clearAll();
    this.mStack = new Array()
    this.mRedo = new Array()
    this.repaintBack();
  }
  public attach(cb:DrawElementMouseEventHandler){
    this.mDrawElementMouseEventHandler.push(cb);
  }

  // look ups.
  public getStackIndexForPoint(point):number{
    if(this.mPointMap[point.x+"#"+point.y] != undefined){
      return this.mPointMap[point.x+"#"+point.y]
    } else{
      return -1;
    }
  }

  public getStackPoints(index:number):Points{
    return this.mStack[index];
  }

  // draw functions.
  public drawFront(points){
    this.mCanvusFront.draw(points);
  }
  public drawBack(points){
    this.insertToStack(points);
    this.mCanvusFront.clearAll();
    this.repaintBack();
  }
  public drawBackWithReplace(points, index:number){
    this.mStack[index] = points ;
    this.repaintBack();
    this.recomputeMap();
  }
  public drawBackWithoutSpacific(index:number){
    this.repaintBackWithoutSpacific(index)
  }
}

let mDrawManager = new DrawManager('canvas', 'canvas1')
mDrawManager.attach(new TestPoint());

// TODO.
// fix resize issue - to draw the grid at the begibing.
// fix point coordinate issye.
// defign move functinality.
// design select funtinality.