// This is a wraper on top of HTML 5 CANVUS.
import { UnitDraw } from "./unitdraw";
import { CONSTANT } from "./constant";
import { Points, TouchCallback, Style } from "./interface";

interface ICanvus {
    draw(points: Points);
}
  
export class MyCanvus implements ICanvus {
    public readonly canvas: any;
    private dpi;
    private drawing: boolean = false;
    public readonly context;
    mCallback: TouchCallback;
    private mousePos: any;
    private lastPos: any;
    private isGrid: boolean = false;
    private mstyle:Style = {'fillColor': CONSTANT.STOKE_COLOR,
    'drawColor':CONSTANT.TEXT_COLOR,
    'textColor':CONSTANT.TEXT_COLOR,
    'gridLineColor':CONSTANT.STOKE_COLOR,
  }
    private mCachePoint: Points = new Array();
    private mUniDraw: UnitDraw;
  
    constructor(canvus_id, isGrid?: boolean) {
      // intilizate the elemnets
      this.canvas = document.getElementById(canvus_id);
      this.dpi = window.devicePixelRatio;
      this.context = this.canvas.getContext('2d');
      this.isGrid = isGrid;
      this.mUniDraw = new UnitDraw(this.context);
  
      // touch listner.
      let _this = this;
      window.addEventListener('resize', function() {
        _this.reDraw();
      }, false);
  
      this.canvas.addEventListener('mousedown', function(e) {
        _this.drawing = true;
        _this.mousePos = _this.getMousePos(e);
        if (_this.mCallback) {
          _this.mCallback.onStart({x:_this.mousePos[0], y: _this.mousePos[1]});
        }
      }, false);
  
      this.canvas.addEventListener('mouseup', function(e) {
        _this.drawing = false;
        _this.notify(_this.getMousePos(e));
        if (_this.mCallback) {
          _this.mCallback.onEnd({x:_this.getMousePos(e)[0], y: _this.getMousePos(e)[1]});
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
      if (this.mCallback) {
        this.mCallback.onMove({x:mousePos[0], y:mousePos[1]});
      }
    }
  
    public setStyle(drawColor?:string, fillColor?:string, textColor?:string ){
      if(drawColor){ this.mstyle.drawColor = drawColor;}
      if(fillColor){ this.mstyle.fillColor = fillColor;}
      if(textColor){this.mstyle.textColor= textColor;}
    }
  
    // draw the grid.
    public drawGrid() {
      this.context.beginPath();
      for (var x = 0; x <= this.canvas.width; x += CONSTANT.GAP_X) {
        console.log('>>>'+x);
        this.context.moveTo(0.5 + x, 0);
        this.context.lineTo(0.5 + x, this.canvas.height);
      }
      for (var x = 0; x <= this.canvas.height; x += CONSTANT.GAP_Y) {
        this.context.moveTo(0, 0.5 + x);
        this.context.lineTo(this.canvas.width, 0.5 + x);
      }
      this.context.strokeStyle = this.mstyle.gridLineColor;
      this.context.stroke();
    }
  
    draw(points: Points) {
      this.clearAll();
      if(this.isGrid){
        this.drawGrid();
      }
      this.context.beginPath();
      this.mUniDraw.draw(points);
      this.context.strokeStyle = this.mstyle.drawColor;
      this.context.stroke();
      this.mCachePoint = points;
    }
  
    
  
    // clear canvus
    clearAll() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if(this.isGrid){
        this.drawGrid();
      }
    };
  
    // find the corid for touch point.
    private getMousePos(mouseEvent) {
      var rect = this.canvas.getBoundingClientRect();
      let x = mouseEvent.clientX - rect.left;
      let y = mouseEvent.clientY - rect.top;
      // this is just a fix
      let point = [Math.floor((x+x*.05) / CONSTANT.GAP_X), Math.floor((y+y*0.05) / CONSTANT.GAP_Y)];
      console.log(point);
      return point;
    }
  
    // get topleft coorinate for <x,y>
    private getCoordinate(x, y) {
      return {x: x * CONSTANT.GAP_X, y: x * CONSTANT.GAP_Y};
    }
  
    private setSize(width: number, height: number) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    public reDraw(): void {
      this.setSize(window.innerWidth, window.innerHeight);
      this.clearAll();
      if (this.isGrid) {
        this.drawGrid();
      }
      this.draw(this.mCachePoint);
    }
  }