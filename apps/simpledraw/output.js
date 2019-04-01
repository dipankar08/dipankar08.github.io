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
define("constant", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var CONSTANT = /** @class */ (function () {
        function CONSTANT() {
        }
        CONSTANT.GAP_X = 10;
        CONSTANT.GAP_Y = 10;
        CONSTANT.TEXT_GAP_OFFSET = 2;
        CONSTANT.BACKGROUND_COLOR = '#fff';
        CONSTANT.STOKE_COLOR = '#F2EFEB'; //"#FEFAF9"//"#f5f5f5"
        CONSTANT.TEXT_COLOR = '#000';
        return CONSTANT;
    }());
    exports.CONSTANT = CONSTANT;
});
define("unitdraw", ["require", "exports", "constant", "interface"], function (require, exports, constant_1, interface_1) {
    "use strict";
    exports.__esModule = true;
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
                    case interface_1.DrawType.SVG:
                        this.svg(p.x, p.y, p.data);
                        break;
                    case interface_1.DrawType.ARROW:
                        this.arrow(p.x, p.y, p.data);
                        break;
                    case interface_1.DrawType.DOT:
                        this.dot(p.x, p.y, p.data);
                        break;
                }
            }
        };
        UnitDraw.prototype.dot = function (x, y, data) {
            this.context.arc(this.midx(x), this.midy(y), constant_1.CONSTANT.GAP_X / 2, 0, 2 * Math.PI);
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
        UnitDraw.prototype.svg = function (x, y, src) {
            var img = new Image();
            var _context = this.context;
            img.onload = function () {
                _context.drawImage(img, 0, 0);
            };
            img.src = src;
        };
        UnitDraw.prototype.arrow = function (x, y, data) {
            switch (data) {
                case 1: // top
                    this.context.moveTo(this.ptx(x), this.midy(y));
                    this.context.lineTo(this.midx(x), this.pty(y));
                    this.context.moveTo(this.ptx(x + 1), this.midy(y));
                    this.context.lineTo(this.midx(x), this.pty(y));
                    break;
                case 2: // right
                    this.context.moveTo(this.midx(x), this.pty(y));
                    this.context.lineTo(this.ptx(x + 1), this.midy(y));
                    this.context.moveTo(this.midx(x), this.pty(y + 1));
                    this.context.lineTo(this.ptx(x + 1), this.midy(y));
                    break;
                case 3: // bottom
                    this.context.moveTo(this.ptx(x), this.midy(y));
                    this.context.lineTo(this.midx(x + 1), this.pty(y));
                    this.context.moveTo(this.ptx(x + 1), this.midy(y));
                    this.context.lineTo(this.midx(x + 1), this.pty(y));
                    break;
                case 4: //left
                    this.context.moveTo(this.midx(x), this.pty(y));
                    this.context.lineTo(this.ptx(x), this.midy(y));
                    this.context.moveTo(this.midx(x), this.pty(y + 1));
                    this.context.lineTo(this.ptx(x), this.midy(y));
                    break;
            }
            this.mark(x, y);
        };
        UnitDraw.prototype.ptx = function (x) {
            return x * constant_1.CONSTANT.GAP_X;
        };
        UnitDraw.prototype.pty = function (y) {
            return y * constant_1.CONSTANT.GAP_Y;
        };
        UnitDraw.prototype.midx = function (x) {
            return x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2;
        };
        UnitDraw.prototype.midy = function (y) {
            return y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2;
        };
        return UnitDraw;
    }());
    exports.UnitDraw = UnitDraw;
});
define("canvus", ["require", "exports", "unitdraw", "constant"], function (require, exports, unitdraw_1, constant_2) {
    "use strict";
    exports.__esModule = true;
    var MyCanvus = /** @class */ (function () {
        function MyCanvus(canvus_id, isGrid) {
            this.drawing = false;
            this.isGrid = false;
            this.mstyle = { 'fillColor': constant_2.CONSTANT.STOKE_COLOR,
                'drawColor': constant_2.CONSTANT.TEXT_COLOR,
                'textColor': constant_2.CONSTANT.TEXT_COLOR,
                'gridLineColor': constant_2.CONSTANT.STOKE_COLOR
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
            for (var x = 0; x <= this.canvas.width; x += constant_2.CONSTANT.GAP_X) {
                console.log('>>>' + x);
                this.context.moveTo(0.5 + x, 0);
                this.context.lineTo(0.5 + x, this.canvas.height);
            }
            for (var x = 0; x <= this.canvas.height; x += constant_2.CONSTANT.GAP_Y) {
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
            var point = [Math.floor((x + x * .05) / constant_2.CONSTANT.GAP_X), Math.floor((y + y * 0.05) / constant_2.CONSTANT.GAP_Y)];
            console.log(point);
            return point;
        };
        // get topleft coorinate for <x,y>
        MyCanvus.prototype.getCoordinate = function (x, y) {
            return { x: x * constant_2.CONSTANT.GAP_X, y: x * constant_2.CONSTANT.GAP_Y };
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
});
define("interface", ["require", "exports"], function (require, exports) {
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
        DrawType[DrawType["SVG"] = 7] = "SVG";
        DrawType[DrawType["ARROW"] = 8] = "ARROW";
        DrawType[DrawType["DOT"] = 9] = "DOT";
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
});
define("utils", ["require", "exports", "interface"], function (require, exports, interface_2) {
    "use strict";
    exports.__esModule = true;
    var CommonUtils = /** @class */ (function () {
        function CommonUtils() {
        }
        CommonUtils.line_x = function (x1, y1, count) {
            var p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1 + i, y: y1, type: interface_2.DrawType.MINUS });
            }
            return p;
        };
        CommonUtils.line_y = function (x1, y1, count) {
            var p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1, y: y1 + i, type: interface_2.DrawType.MINUS_V });
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
        // top, right bottom, left
        CommonUtils.getDirectionOfTwoConsicutivePoints = function (x1, y1, x2, y2) {
            if (x1 == x2) {
                if (y1 < y2) {
                    return 2; // RIGHT
                }
                else {
                    return 4; // LEFT
                }
            }
            if (y1 == y2) {
                if (x1 < x2) {
                    return 3; // BOTTOM
                }
                else {
                    return 1; // TOP
                }
            }
            return 0; // INVALID
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
});
define("component", ["require", "exports", "utils", "interface"], function (require, exports, utils_1, interface_3) {
    "use strict";
    exports.__esModule = true;
    var LineX = /** @class */ (function () {
        function LineX(x1, y1, count) {
            this.points = new Array();
            this.x1 = x1;
            this.y1 = y1;
            this.count = count;
            for (var i = 0; i <= this.count; i++) {
                this.points.push({ x: this.x1 + i, y: this.y1, type: interface_3.DrawType.MINUS });
            }
        }
        LineX.prototype.getDrawOption = function () {
            return interface_3.DrawOption.NONE;
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
            return interface_3.DrawOption.TEST_POINT;
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
                this.points.push({ x: this.x1, y: this.y1 + i, type: interface_3.DrawType.MINUS_V });
            }
        }
        LineY.prototype.getDrawOption = function () {
            return interface_3.DrawOption.TEST_POINT;
            //throw new Error("Method not implemented.");
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
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y2, type: interface_3.DrawType.PLUS });
        }
        Rect.prototype.getDrawOption = function () {
            return interface_3.DrawOption.RECT;
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
            this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
        }
        ALine.prototype.getDrawOption = function () {
            return interface_3.DrawOption.NONE;
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
            _this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            _this.points.push({ x: x2, y: y2, type: interface_3.DrawType.PLUS });
            return _this;
        }
        Line.prototype.getDrawOption = function () {
            return interface_3.DrawOption.LINE;
        };
        return Line;
    }(ALine));
    exports.Line = Line;
    var Line_D = /** @class */ (function (_super) {
        __extends(Line_D, _super);
        function Line_D(x1, y1, x2, y2) {
            var _this = _super.call(this, x1, y1, x2, y2) || this;
            _this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            //this.points.push({x:x2, y:y2, type:DrawType.ARROW, data: 2})
            _this.points.push({ x: x2, y: y2, type: interface_3.DrawType.DOT });
            return _this;
        }
        Line_D.prototype.getDrawOption = function () {
            return interface_3.DrawOption.LINE_D;
        };
        return Line_D;
    }(ALine));
    var Line_DD = /** @class */ (function (_super) {
        __extends(Line_DD, _super);
        function Line_DD(x1, y1, x2, y2) {
            var _this = _super.call(this, x1, y1, x2, y2) || this;
            _this.points.push({ x: x2, y: y2, type: interface_3.DrawType.DOT, data: ">" });
            _this.points.push({ x: x1, y: y1, type: interface_3.DrawType.DOT, data: "<" });
            return _this;
        }
        Line_DD.prototype.getDrawOption = function () {
            return interface_3.DrawOption.LINE_DD;
        };
        return Line_DD;
    }(ALine));
    var Text = /** @class */ (function () {
        function Text(x1, y, text) {
            this.points = new Array();
            for (var i = 0; i < text.length; i++) {
                this.points.push({ x: i, y: this.y1, type: interface_3.DrawType.TEXT, data: text.charAt(i) });
            }
        }
        Text.prototype.getDrawOption = function () {
            return interface_3.DrawOption.TEXT;
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
                    this.points.push({ x: i, y: j, type: interface_3.DrawType.CLEAR });
                }
            }
        }
        ClearBox.prototype.getDrawOption = function () {
            return interface_3.DrawOption.CLEAR;
        };
        ClearBox.prototype.getPoints = function () {
            return this.points;
        };
        return ClearBox;
    }());
    exports.ClearBox = ClearBox;
    var ComponentManager = /** @class */ (function () {
        function ComponentManager(d) {
            this.mDrawOption = interface_3.DrawOption.NONE;
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
            return this.mDrawOption == interface_3.DrawOption.LINE ||
                this.mDrawOption == interface_3.DrawOption.LINE_D ||
                this.mDrawOption == interface_3.DrawOption.LINE_DD ||
                this.mDrawOption == interface_3.DrawOption.RECT ||
                this.mDrawOption == interface_3.DrawOption.CLEAR;
        };
        ComponentManager.prototype.isMoveFunction = function () {
            return this.mDrawOption == interface_3.DrawOption.MOVE;
        };
        ComponentManager.prototype.handleDrawStart = function (point) {
            this.mStartPoint = point;
        };
        ComponentManager.prototype.handleDrawMove = function (a) {
            switch (this.mDrawOption) {
                case interface_3.DrawOption.RECT:
                    this.ele =
                        new Rect(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.LINE:
                    this.ele =
                        new Line(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.LINE_D:
                    this.ele =
                        new Line_D(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.LINE_DD:
                    this.ele =
                        new Line_DD(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.CLEAR:
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
});
// This is main DrawManager function,
define("draw", ["require", "exports", "canvus", "component"], function (require, exports, canvus_1, component_1) {
    "use strict";
    exports.__esModule = true;
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
            for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
                var p = points_2[_i];
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
        // Public APIs
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
        DrawManager.prototype.select = function (option) {
            this.mComponentManager.select(option);
        };
        return DrawManager;
    }());
    exports.DrawManager = DrawManager;
});
// TODO.
// fix resize issue - to draw the grid at the begibing.
// fix point coordinate issye.
// defign move functinality.
// design select funtinality.
