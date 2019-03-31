"use strict";
exports.__esModule = true;
// This is a wraper on top of HTML 5 CANVUS.
var unitdraw_1 = require("./unitdraw");
var constant_1 = require("./constant");
var MyCanvus = /** @class */ (function () {
    function MyCanvus(canvus_id, isGrid) {
        this.drawing = false;
        this.isGrid = false;
        this.mstyle = { 'fillColor': constant_1.CONSTANT.STOKE_COLOR,
            'drawColor': constant_1.CONSTANT.TEXT_COLOR,
            'textColor': constant_1.CONSTANT.TEXT_COLOR,
            'gridLineColor': constant_1.CONSTANT.STOKE_COLOR
        };
        this.mCachePoint = new Array();
        // intilizate the elemnets
        this.canvas = document.getElementById(canvus_id);
        this.dpi = window.devicePixelRatio;
        this.context = this.canvas.getContext('2d');
        this.isGrid = isGrid;
        this.mUniDraw = new unitdraw_1.UnitDraw(this.context);
        // touch listner.
        var _this = this;
        window.addEventListener('resize', function () {
            _this.reDraw();
        }, false);
        this.canvas.addEventListener('mousedown', function (e) {
            _this.drawing = true;
            _this.mousePos = _this.getMousePos(e);
            if (_this.mCallback) {
                _this.mCallback.onStart({ x: _this.mousePos[0], y: _this.mousePos[1] });
            }
        }, false);
        this.canvas.addEventListener('mouseup', function (e) {
            _this.drawing = false;
            _this.notify(_this.getMousePos(e));
            if (_this.mCallback) {
                _this.mCallback.onEnd({ x: _this.getMousePos(e)[0], y: _this.getMousePos(e)[1] });
            }
        }, false);
        this.canvas.addEventListener('mousemove', function (e) {
            _this.notify(_this.getMousePos(e));
        }, false);
        this.drawGrid();
    }
    MyCanvus.prototype.notify = function (mousePos) {
        if (!this.drawing) {
            return;
        }
        if (this.lastPos && this.lastPos[0] == mousePos[0] &&
            this.lastPos[1] == mousePos[1]) {
            return;
        }
        this.lastPos = mousePos;
        if (this.mCallback) {
            this.mCallback.onMove({ x: mousePos[0], y: mousePos[1] });
        }
    };
    MyCanvus.prototype.setStyle = function (drawColor, fillColor, textColor) {
        if (drawColor) {
            this.mstyle.drawColor = drawColor;
        }
        if (fillColor) {
            this.mstyle.fillColor = fillColor;
        }
        if (textColor) {
            this.mstyle.textColor = textColor;
        }
    };
    // draw the grid.
    MyCanvus.prototype.drawGrid = function () {
        this.context.beginPath();
        for (var x = 0; x <= this.canvas.width; x += constant_1.CONSTANT.GAP_X) {
            console.log('>>>' + x);
            this.context.moveTo(0.5 + x, 0);
            this.context.lineTo(0.5 + x, this.canvas.height);
        }
        for (var x = 0; x <= this.canvas.height; x += constant_1.CONSTANT.GAP_Y) {
            this.context.moveTo(0, 0.5 + x);
            this.context.lineTo(this.canvas.width, 0.5 + x);
        }
        this.context.strokeStyle = this.mstyle.gridLineColor;
        this.context.stroke();
    };
    MyCanvus.prototype.draw = function (points) {
        this.clearAll();
        if (this.isGrid) {
            this.drawGrid();
        }
        this.context.beginPath();
        this.mUniDraw.draw(points);
        this.context.strokeStyle = this.mstyle.drawColor;
        this.context.stroke();
        this.mCachePoint = points;
    };
    // clear canvus
    MyCanvus.prototype.clearAll = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isGrid) {
            this.drawGrid();
        }
    };
    ;
    // find the corid for touch point.
    MyCanvus.prototype.getMousePos = function (mouseEvent) {
        var rect = this.canvas.getBoundingClientRect();
        var x = mouseEvent.clientX - rect.left;
        var y = mouseEvent.clientY - rect.top;
        // this is just a fix
        var point = [Math.floor((x + x * .05) / constant_1.CONSTANT.GAP_X), Math.floor((y + y * 0.05) / constant_1.CONSTANT.GAP_Y)];
        console.log(point);
        return point;
    };
    // get topleft coorinate for <x,y>
    MyCanvus.prototype.getCoordinate = function (x, y) {
        return { x: x * constant_1.CONSTANT.GAP_X, y: x * constant_1.CONSTANT.GAP_Y };
    };
    MyCanvus.prototype.setSize = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    MyCanvus.prototype.reDraw = function () {
        this.setSize(window.innerWidth, window.innerHeight);
        this.clearAll();
        if (this.isGrid) {
            this.drawGrid();
        }
        this.draw(this.mCachePoint);
    };
    return MyCanvus;
}());
exports.MyCanvus = MyCanvus;
