"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = require("./utils");
var interface_1 = require("./interface");
var LineX = /** @class */ (function () {
    function LineX(x1, y1, count) {
        this.points = new Array();
        this.x1 = x1;
        this.y1 = y1;
        this.count = count;
        for (var i = 0; i <= this.count; i++) {
            this.points.push({ x: this.x1 + i, y: this.y1, type: interface_1.DrawType.MINUS });
        }
    }
    LineX.prototype.getDrawOption = function () {
        return interface_1.DrawOption.NONE;
    };
    LineX.prototype.onStart = function (a) {
        //throw new Error("Method not implemented.");
    };
    LineX.prototype.onEnd = function (a) {
        //throw new Error("Method not implemented.");
    };
    LineX.prototype.onMove = function (a) {
        // throw new Error("Method not implemented.");
    };
    LineX.prototype.getPoints = function () {
        return this.points;
    };
    return LineX;
}());
exports.LineX = LineX;
var TestPoint = /** @class */ (function () {
    function TestPoint() {
        this.points = new Array();
    }
    TestPoint.prototype.getDrawOption = function () {
        return interface_1.DrawOption.TEST_POINT;
    };
    TestPoint.prototype.onStart = function (a) {
        //throw new Error("Method not implemented.");
    };
    TestPoint.prototype.onEnd = function (a) {
        //throw new Error("Method not implemented.");
    };
    TestPoint.prototype.onMove = function (a) {
        //throw new Error("Method not implemented.");
    };
    TestPoint.prototype.getPoints = function () {
        return this.points;
    };
    return TestPoint;
}());
exports.TestPoint = TestPoint;
var LineY = /** @class */ (function () {
    function LineY(x1, y1, count) {
        this.points = new Array();
        this.x1 = x1;
        this.y1 = y1;
        this.count = count;
        for (var i = 0; i <= this.count; i++) {
            this.points.push({ x: this.x1, y: this.y1 + i, type: interface_1.DrawType.MINUS_V });
        }
    }
    LineY.prototype.getDrawOption = function () {
        return interface_1.DrawOption.TEST_POINT;
        //throw new Error("Method not implemented.");
    };
    LineY.prototype.onStart = function (a) {
        // throw new Error("Method not implemented.");
    };
    LineY.prototype.onEnd = function (a) {
        //throw new Error("Method not implemented.");
    };
    LineY.prototype.onMove = function (a) {
        // throw new Error("Method not implemented.");
    };
    LineY.prototype.getPoints = function () {
        return this.points;
    };
    return LineY;
}());
exports.LineY = LineY;
var Rect = /** @class */ (function () {
    function Rect(x11, y11, x22, y22) {
        this.points = new Array();
        var cor = utils_1.CommonUtils.getFixedCorner(x11, y11, x22, y22);
        var x1 = cor[0];
        var y1 = cor[1];
        var x2 = cor[2];
        var y2 = cor[3];
        this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y1, x2 - x1));
        this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y2, x2 - x1));
        this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y1, y2 - y1));
        this.points = this.points.concat(utils_1.CommonUtils.line_y(x2, y1, y2 - y1));
        this.points.push({ x: x1, y: y1, type: interface_1.DrawType.PLUS });
        this.points.push({ x: x1, y: y2, type: interface_1.DrawType.PLUS });
        this.points.push({ x: x2, y: y1, type: interface_1.DrawType.PLUS });
        this.points.push({ x: x2, y: y2, type: interface_1.DrawType.PLUS });
    }
    Rect.prototype.getDrawOption = function () {
        return interface_1.DrawOption.RECT;
    };
    Rect.prototype.onStart = function (a) {
        // throw new Error("Method not implemented.");
    };
    Rect.prototype.onEnd = function (a) {
        //throw new Error("Method not implemented.");
    };
    Rect.prototype.onMove = function (a) {
        // throw new Error("Method not implemented.");
    };
    Rect.prototype.getPoints = function () {
        return this.points;
    };
    return Rect;
}());
exports.Rect = Rect;
var ALine = /** @class */ (function () {
    function ALine(x1, y1, x2, y2) {
        this.points = new Array();
        switch (utils_1.CommonUtils.getDirection(x1, y1, x2, y2)) {
            case 1:
                this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y1, y2 - y1));
                this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y2, x2 - x1));
                break;
            case 2:
                this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y2, y1 - y2));
                this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y2, x2 - x1));
                break;
            case 3:
                this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y1, y2 - y1));
                this.points = this.points.concat(utils_1.CommonUtils.line_x(x2, y2, x1 - x2));
                break;
            case 4:
                this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y2, y1 - y2));
                this.points = this.points.concat(utils_1.CommonUtils.line_x(x2, y2, x1 - x2));
                break;
        }
        this.points.push({ x: x1, y: y2, type: interface_1.DrawType.PLUS });
    }
    ALine.prototype.getDrawOption = function () {
        return interface_1.DrawOption.NONE;
    };
    ALine.prototype.onStart = function (point) {
    };
    ALine.prototype.onEnd = function (a) {
    };
    ALine.prototype.onMove = function (a) {
    };
    ALine.prototype.getPoints = function () {
        //let filters = new Array();
        //  BUG : you must remove duplicates. 
        return this.points;
    };
    return ALine;
}());
exports.ALine = ALine;
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(x1, y1, x2, y2) {
        var _this = _super.call(this, x1, y1, x2, y2) || this;
        _this.points.push({ x: x1, y: y1, type: interface_1.DrawType.PLUS });
        _this.points.push({ x: x2, y: y2, type: interface_1.DrawType.PLUS });
        return _this;
    }
    Line.prototype.getDrawOption = function () {
        return interface_1.DrawOption.LINE;
    };
    return Line;
}(ALine));
exports.Line = Line;
var Line_D = /** @class */ (function (_super) {
    __extends(Line_D, _super);
    function Line_D(x1, y1, x2, y2) {
        var _this = _super.call(this, x1, y1, x2, y2) || this;
        _this.points.push({ x: x1, y: y1, type: interface_1.DrawType.PLUS });
        _this.points.push({ x: x2, y: y2, type: interface_1.DrawType.CHAR, data: ">" });
        return _this;
    }
    Line_D.prototype.getDrawOption = function () {
        return interface_1.DrawOption.LINE_D;
    };
    return Line_D;
}(ALine));
var Line_DD = /** @class */ (function (_super) {
    __extends(Line_DD, _super);
    function Line_DD(x1, y1, x2, y2) {
        var _this = _super.call(this, x1, y1, x2, y2) || this;
        _this.points.push({ x: x2, y: y2, type: interface_1.DrawType.CHAR, data: ">" });
        _this.points.push({ x: x1, y: y1, type: interface_1.DrawType.CHAR, data: "<" });
        return _this;
    }
    Line_DD.prototype.getDrawOption = function () {
        return interface_1.DrawOption.LINE_DD;
    };
    return Line_DD;
}(ALine));
var Text = /** @class */ (function () {
    function Text(x1, y, text) {
        this.points = new Array();
        for (var i = 0; i < text.length; i++) {
            this.points.push({ x: i, y: this.y1, type: interface_1.DrawType.TEXT, data: text.charAt(i) });
        }
    }
    Text.prototype.getDrawOption = function () {
        return interface_1.DrawOption.TEXT;
    };
    Text.prototype.onStart = function (a) {
        //throw new Error("Method not implemented.");
    };
    Text.prototype.onEnd = function (a) {
        // throw new Error("Method not implemented.");
    };
    Text.prototype.onMove = function (a) {
        // throw new Error("Method not implemented.");
    };
    Text.prototype.getPoints = function () {
        return this.points;
    };
    return Text;
}());
exports.Text = Text;
var ClearBox = /** @class */ (function () {
    function ClearBox(x1, y1, x2, y2) {
        this.points = new Array();
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                this.points.push({ x: i, y: j, type: interface_1.DrawType.CLEAR });
            }
        }
    }
    ClearBox.prototype.getDrawOption = function () {
        return interface_1.DrawOption.CLEAR;
    };
    ClearBox.prototype.onStart = function (a) {
        // throw new Error("Method not implemented.");
    };
    ClearBox.prototype.onEnd = function (a) {
        // throw new Error("Method not implemented.");
    };
    ClearBox.prototype.onMove = function (a) {
        // throw new Error("Method not implemented.");
    };
    ClearBox.prototype.getPoints = function () {
        return this.points;
    };
    return ClearBox;
}());
exports.ClearBox = ClearBox;
var ComponentManager = /** @class */ (function () {
    function ComponentManager(d) {
        this.mDrawOption = interface_1.DrawOption.NONE;
        this.isValidMove = false;
        this.mDrawManager = d;
    }
    ComponentManager.prototype.onStart = function (a) {
        if (this.isDrawFunction()) {
            this.handleDrawStart(a);
        }
        else if (this.isMoveFunction()) {
            this.handleMoveStart(a);
        }
    };
    ComponentManager.prototype.onEnd = function (a) {
        if (this.ele) {
            if (this.isDrawFunction()) {
                this.handleDrawEnd(this.ele.getPoints());
            }
            else if (this.isMoveFunction()) {
                this.handleMoveEnd(a);
            }
        }
    };
    ComponentManager.prototype.onMove = function (a) {
        if (this.isDrawFunction()) {
            this.handleDrawMove(a);
        }
        else if (this.isMoveFunction()) {
            this.handleMoveMove(a);
        }
    };
    ComponentManager.prototype.isDrawFunction = function () {
        return this.mDrawOption == interface_1.DrawOption.LINE ||
            this.mDrawOption == interface_1.DrawOption.LINE_D ||
            this.mDrawOption == interface_1.DrawOption.LINE_DD ||
            this.mDrawOption == interface_1.DrawOption.RECT ||
            this.mDrawOption == interface_1.DrawOption.CLEAR;
    };
    ComponentManager.prototype.isMoveFunction = function () {
        return this.mDrawOption == interface_1.DrawOption.MOVE;
    };
    ComponentManager.prototype.handleDrawStart = function (point) {
        this.mStartPoint = point;
    };
    ComponentManager.prototype.handleDrawMove = function (a) {
        switch (this.mDrawOption) {
            case interface_1.DrawOption.RECT:
                this.ele =
                    new Rect(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;
            case interface_1.DrawOption.LINE:
                this.ele =
                    new Line(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;
            case interface_1.DrawOption.LINE_D:
                this.ele =
                    new Line_D(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;
            case interface_1.DrawOption.LINE_DD:
                this.ele =
                    new Line_DD(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;
            case interface_1.DrawOption.CLEAR:
                this.ele =
                    new ClearBox(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                break;
        }
        this.mDrawManager.drawFront(this.ele.getPoints());
    };
    ComponentManager.prototype.handleDrawEnd = function (points) {
        this.mDrawManager.drawBack(points);
    };
    ComponentManager.prototype.handleMoveStart = function (point) {
        console.log(" handleMoveStart called");
        this.mMoveStart = point;
        if (this.mDrawManager.getStackIndexForPoint(point) != -1) {
            this.drawMoveTrasition(point, point);
            this.isValidMove = true;
        }
    };
    ComponentManager.prototype.handleMoveMove = function (point) {
        console.log(" handleMoveMove called");
        if (!this.isValidMove) {
            return;
        }
        this.drawMoveTrasition(this.mMoveStart, point);
    };
    ComponentManager.prototype.handleMoveEnd = function (end) {
        console.log(" handleMoveEnd called");
        if (!this.isValidMove) {
            return;
        }
        console.log(" handleMoveEnd called 1");
        console.log(end);
        console.log(this.getMoveTranfromedPoint(this.mMoveStart, end));
        var newPoints = this.getMoveTranfromedPoint(this.mMoveStart, end);
        this.mDrawManager.drawBackWithReplace(newPoints, this.mMoveSetIndex);
        this.isValidMove = false;
    };
    ComponentManager.prototype.getMoveTranfromedPoint = function (start, end) {
        var points = new Array();
        for (var _i = 0, _a = this.mDrawManager.getStackPoints(this.mMoveSetIndex); _i < _a.length; _i++) {
            var p = _a[_i];
            points.push({ x: p.x + end.x - start.x, y: p.y + end.y - start.y, type: p.type, data: p.data });
        }
        return points;
    };
    ComponentManager.prototype.drawMoveTrasition = function (start, end) {
        this.mDrawManager.drawFront(this.getMoveTranfromedPoint(start, end));
    };
    ComponentManager.prototype.select = function (mDrawOption) {
        this.mDrawOption = mDrawOption;
    };
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
