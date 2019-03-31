"use strict";
// This is main DrawManager function,
exports.__esModule = true;
var canvus_1 = require("./canvus");
var component_1 = require("./component");
var DrawManager = /** @class */ (function () {
    function DrawManager(canvus_id1, canvus_id2) {
        this.mPointMap = {}; // list of point to index of statck
        this.mStack = new Array();
        this.mRedo = new Array();
        this.mDrawElementMouseEventHandler = new Array();
        // intilizate the elemnets
        this.mCanvusBack = new canvus_1.MyCanvus(canvus_id1, true);
        this.mCanvusFront = new canvus_1.MyCanvus(canvus_id2);
        this.mCanvusFront.setStyle('#111', "#d0e4b3", "#111");
        this.mComponentManager = new component_1.ComponentManager(this);
        var _this = this;
        this.mCanvusFront.mCallback = {
            onStart: function (a) {
                _this.mComponentManager.onStart(a);
            },
            onEnd: function (a) {
                _this.mComponentManager.onEnd(a);
            },
            onMove: function (a) {
                _this.mComponentManager.onMove(a);
            }
        };
    }
    DrawManager.prototype.repaintBack = function () {
        var points = new Array();
        for (var _i = 0, _a = this.mStack.reverse(); _i < _a.length; _i++) {
            var p = _a[_i];
            points = points.concat(p);
        }
        this.mCanvusBack.draw(points);
        this.mCanvusFront.clearAll();
    };
    DrawManager.prototype.repaintBackWithoutSpacific = function (index) {
        var points = new Array();
        for (var i = 0; i < this.mStack.length; i++) {
            if (i != index) {
                points = points.concat(this.mStack[i]);
            }
        }
        this.mCanvusBack.draw(points.reverse());
    };
    DrawManager.prototype.insertToStack = function (points) {
        this.mStack.push(points);
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var p = points_1[_i];
            this.mPointMap[p.x + "#" + p.y] = this.mStack.length - 1;
        }
    };
    // this is expensive.
    DrawManager.prototype.recomputeMap = function () {
        this.mPointMap = new Object();
        for (var s = 0; s < this.mStack.length; s++) {
            for (var _i = 0, _a = this.mStack[s]; _i < _a.length; _i++) {
                var p = _a[_i];
                this.mPointMap[p.x + "#" + p.y] = s;
            }
        }
    };
    DrawManager.prototype.undo = function () {
        if (this.mStack.length > 0) {
            this.mRedo.push(this.mStack.pop());
        }
        this.repaintBack();
    };
    DrawManager.prototype.redo = function () {
        if (this.mRedo.length > 0) {
            this.mStack.push(this.mRedo.pop());
        }
        this.repaintBack();
    };
    DrawManager.prototype.clearAll = function () {
        this.mCanvusBack.clearAll();
        this.mStack = new Array();
        this.mRedo = new Array();
        this.repaintBack();
    };
    DrawManager.prototype.attach = function (cb) {
        this.mDrawElementMouseEventHandler.push(cb);
    };
    // look ups.
    DrawManager.prototype.getStackIndexForPoint = function (point) {
        if (this.mPointMap[point.x + "#" + point.y] != undefined) {
            return this.mPointMap[point.x + "#" + point.y];
        }
        else {
            return -1;
        }
    };
    DrawManager.prototype.getStackPoints = function (index) {
        return this.mStack[index];
    };
    // draw functions.
    DrawManager.prototype.drawFront = function (points) {
        this.mCanvusFront.draw(points);
    };
    DrawManager.prototype.drawBack = function (points) {
        this.insertToStack(points);
        this.mCanvusFront.clearAll();
        this.repaintBack();
    };
    DrawManager.prototype.drawBackWithReplace = function (points, index) {
        this.mStack[index] = points;
        this.repaintBack();
        this.recomputeMap();
    };
    DrawManager.prototype.drawBackWithoutSpacific = function (index) {
        this.repaintBackWithoutSpacific(index);
    };
    return DrawManager;
}());
exports.DrawManager = DrawManager;
var mDrawManager = new DrawManager('canvas', 'canvas1');
mDrawManager.attach(new component_1.TestPoint());
// TODO.
// fix resize issue - to draw the grid at the begibing.
// fix point coordinate issye.
// defign move functinality.
// design select funtinality.
