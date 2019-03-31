"use strict";
exports.__esModule = true;
var constant_1 = require("./constant");
var interface_1 = require("./interface");
var UnitDraw = /** @class */ (function () {
    function UnitDraw(context) {
        this.context = context;
    }
    UnitDraw.prototype.draw = function (points) {
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var p = points_1[_i];
            switch (p.type) {
                case interface_1.DrawType.PLUS:
                    this.plus(p.x, p.y);
                    break;
                case interface_1.DrawType.MINUS:
                    this.minus(p.x, p.y);
                    break;
                case interface_1.DrawType.MINUS_V:
                    this.minus_v(p.x, p.y);
                    break;
                case interface_1.DrawType.MARK:
                    this.mark(p.x, p.y);
                    break;
                case interface_1.DrawType.CLEAR:
                    this.clear(p.x, p.y);
                    break;
                case interface_1.DrawType.CHAR:
                    this.printChar(p.x, p.y, p.data);
                    break;
            }
        }
    };
    UnitDraw.prototype.mark = function (x, y) {
        this.context.fillStyle = constant_1.CONSTANT.BACKGROUND_COLOR;
        this.context.fillRect(x * constant_1.CONSTANT.GAP_X + 1, y * constant_1.CONSTANT.GAP_Y + 1, constant_1.CONSTANT.GAP_X - 1, constant_1.CONSTANT.GAP_Y - 1);
    };
    UnitDraw.prototype.clear = function (x, y) {
        this.context.fillStyle = constant_1.CONSTANT.BACKGROUND_COLOR;
        this.context.fillRect(x * constant_1.CONSTANT.GAP_X + 1, y * constant_1.CONSTANT.GAP_Y + 1, constant_1.CONSTANT.GAP_X - 1, constant_1.CONSTANT.GAP_Y - 1);
    };
    ;
    UnitDraw.prototype.printChar = function (x, y, c) {
        console.log("printChar :" + c);
        this.context.font = '14px monospace';
        this.context.fillText(c, x * constant_1.CONSTANT.GAP_X, y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y - constant_1.CONSTANT.TEXT_GAP_OFFSET);
        this.mark(x, y);
    };
    // draw plus
    UnitDraw.prototype.plus = function (x, y) {
        var midx = x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2;
        var midy = y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2;
        this.context.moveTo(midx - 3 + 0.5, midy + 0.5);
        this.context.lineTo(midx + 3 + 0.5, midy + 0.5);
        this.context.moveTo(midx + 0.5, midy - 3);
        this.context.lineTo(midx + 0.5, midy + 3);
        this.mark(x, y);
    };
    // draw minus
    UnitDraw.prototype.minus = function (x, y) {
        this.context.moveTo(x * constant_1.CONSTANT.GAP_X + 2.5, y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2 + 0.5);
        this.context.lineTo((x + 1) * constant_1.CONSTANT.GAP_X - 1.5, y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2 + 0.5);
        this.mark(x, y);
    };
    // draw minus in vertical.
    UnitDraw.prototype.minus_v = function (x, y) {
        this.context.moveTo(x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2 + 0.5, y * constant_1.CONSTANT.GAP_Y + 2);
        this.context.lineTo(x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2 + 0.5, (y + 1) * constant_1.CONSTANT.GAP_Y - 2);
        this.mark(x, y);
    };
    return UnitDraw;
}());
exports.UnitDraw = UnitDraw;
