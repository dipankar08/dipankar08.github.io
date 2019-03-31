"use strict";
exports.__esModule = true;
var interface_1 = require("./interface");
var CommonUtils = /** @class */ (function () {
    function CommonUtils() {
    }
    CommonUtils.line_x = function (x1, y1, count) {
        var p = new Array();
        for (var i = 1; i < Math.abs(count); i++) {
            p.push({ x: x1 + i, y: y1, type: interface_1.DrawType.MINUS });
        }
        return p;
    };
    CommonUtils.line_y = function (x1, y1, count) {
        var p = new Array();
        for (var i = 1; i < Math.abs(count); i++) {
            p.push({ x: x1, y: y1 + i, type: interface_1.DrawType.MINUS_V });
        }
        return p;
    };
    // get direction for two touch point.
    CommonUtils.getDirection = function (x1, y1, x2, y2) {
        if (x1 <= x2) {
            if (y1 <= y2) {
                return 1; // Down Right
            }
            else {
                return 2; // UP Right.
            }
        }
        else {
            if (y1 <= y2) {
                return 3; // Down Left
            }
            else {
                return 4; // UP Left
            }
        }
    };
    // returns the topleft and botton right for any two point acts as rest
    CommonUtils.getFixedCorner = function (x1, y1, x2, y2) {
        if (x1 <= x2) {
            if (y1 <= y2) {
                return [x1, y1, x2, y2];
            }
            else {
                return [x1, y2, x2, y1];
            }
        }
        else {
            if (y1 <= y2) {
                return [x2, y1, x1, y2];
            }
            else {
                return [x2, y2, x1, y1];
            }
        }
    };
    CommonUtils.myProp = 'Hello';
    return CommonUtils;
}());
exports.CommonUtils = CommonUtils;
