"use strict";
exports.__esModule = true;
var DrawType;
(function (DrawType) {
    DrawType[DrawType["PLUS"] = 0] = "PLUS";
    DrawType[DrawType["MINUS"] = 1] = "MINUS";
    DrawType[DrawType["MINUS_V"] = 2] = "MINUS_V";
    DrawType[DrawType["TEXT"] = 3] = "TEXT";
    DrawType[DrawType["CLEAR"] = 4] = "CLEAR";
    DrawType[DrawType["MARK"] = 5] = "MARK";
    DrawType[DrawType["CHAR"] = 6] = "CHAR";
})(DrawType = exports.DrawType || (exports.DrawType = {}));
var DrawOption;
(function (DrawOption) {
    DrawOption[DrawOption["LINE"] = 0] = "LINE";
    DrawOption[DrawOption["LINE_D"] = 1] = "LINE_D";
    DrawOption[DrawOption["LINE_DD"] = 2] = "LINE_DD";
    DrawOption[DrawOption["RECT"] = 3] = "RECT";
    DrawOption[DrawOption["TEXT"] = 4] = "TEXT";
    DrawOption[DrawOption["CLEAR"] = 5] = "CLEAR";
    DrawOption[DrawOption["MARK"] = 6] = "MARK";
    DrawOption[DrawOption["NONE"] = 7] = "NONE";
    DrawOption[DrawOption["MOVE"] = 8] = "MOVE";
    DrawOption[DrawOption["TEST_POINT"] = 9] = "TEST_POINT";
})(DrawOption = exports.DrawOption || (exports.DrawOption = {}));
