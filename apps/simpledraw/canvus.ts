// This is a wraper on top of HTML 5 CANVUS.
import { UnitDraw } from "./unitdraw";
import { CONSTANT, THEME } from "./constant";
import { Points, TouchCallback, Style, DrawPackage } from "./interface";
  
export class MyCanvus{
    public readonly canvas: any;
    private dpi;
    private drawing: boolean = false;
    public readonly context;
    mCallback: TouchCallback;
    private mousePos: any;
    private lastPos: any;
    private isGrid: boolean = false;
    private mstyle:Style = THEME['DEFAULT'];
    private mCachePoint: DrawPackage;
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
        _this.setSize(window.innerWidth, window.innerHeight);
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
      this.reDraw();
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
  
    public setStyle(style:Style ){
      this.context.fillColor = style.fillColor;
      this.context.strokeStyle = style.drawColor;
    }
  
    // draw the grid.
    public drawGrid() {
      this.setStyle(THEME.get('GRID'))
      this.context.beginPath();
      for (var x = 0; x <= this.canvas.width; x += CONSTANT.GAP_X) {
        this.context.moveTo(0.5 + x, 0);
        this.context.lineTo(0.5 + x, this.canvas.height);
      }
      for (var x = 0; x <= this.canvas.height; x += CONSTANT.GAP_Y) {
        this.context.moveTo(0, 0.5 + x);
        this.context.lineTo(this.canvas.width, 0.5 + x);
      }
      this.context.stroke();
    }
  
    public draw(pack: DrawPackage) {
      // apply style  here.
      this.setStyle(pack.style);
      this.context.beginPath();
      this.mUniDraw.draw(pack.points);
      this.context.stroke();
      this.mCachePoint = pack;
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
      return point;
    }
  
    // get topleft coorinate for <x,y>
    private getCoordinate(x, y) {
      return {x: x * CONSTANT.GAP_X, y: x * CONSTANT.GAP_Y};
    }
  
    private setSize(width: number, height: number) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.reDraw();
    }
    public reDraw(): void {
      this.clearAll();
      if (this.isGrid) {
        this.drawGrid();
      }
      if(this.mCachePoint){
        this.draw(this.mCachePoint);
      }
    }
  }