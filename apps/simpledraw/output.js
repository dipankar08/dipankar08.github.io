define("unitdraw", ["require", "exports", "constant", "interface"], function (require, exports, constant_1, interface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UnitDraw {
        constructor(context) {
            this.context = context;
        }
        draw(points) {
            for (let p of points) {
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
                        this.char(p.x, p.y, p.data);
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
        }
        dot(x, y, data) {
            this.context.moveTo(this.midx(x) + constant_1.CONSTANT.GAP_X / 2, this.midy(y));
            this.context.arc(this.midx(x), this.midy(y), constant_1.CONSTANT.GAP_X / 2, 0, 2 * Math.PI);
            this.mark(x, y);
        }
        mark(x, y) {
            this.context.fillRect(x * constant_1.CONSTANT.GAP_X, y * constant_1.CONSTANT.GAP_Y, constant_1.CONSTANT.GAP_X - 0, constant_1.CONSTANT.GAP_Y - 0);
        }
        clear(x, y) {
            this.context.fillRect(x * constant_1.CONSTANT.GAP_X + 1, y * constant_1.CONSTANT.GAP_Y + 1, constant_1.CONSTANT.GAP_X - 1, constant_1.CONSTANT.GAP_Y - 1);
        }
        ;
        char(x, y, c) {
            // this.mark(x, y); This is a BUG.
            this.context.fillText(c, x * constant_1.CONSTANT.GAP_X, y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y - constant_1.CONSTANT.TEXT_GAP_OFFSET);
        }
        // draw plus
        plus(x, y) {
            let midx = x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2;
            let midy = y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2;
            this.context.moveTo(midx - 3 + 0.5, midy + 0.5);
            this.context.lineTo(midx + 3 + 0.5, midy + 0.5);
            this.context.moveTo(midx + 0.5, midy - 3);
            this.context.lineTo(midx + 0.5, midy + 3);
            this.mark(x, y);
        }
        // draw minus
        minus(x, y) {
            this.context.moveTo(x * constant_1.CONSTANT.GAP_X + 2.5, y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2 + 0.5);
            this.context.lineTo((x + 1) * constant_1.CONSTANT.GAP_X - 1.5, y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2 + 0.5);
            this.mark(x, y);
        }
        // draw minus in vertical.
        minus_v(x, y) {
            this.context.moveTo(x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2 + 0.5, y * constant_1.CONSTANT.GAP_Y + 2);
            this.context.lineTo(x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2 + 0.5, (y + 1) * constant_1.CONSTANT.GAP_Y - 2);
            this.mark(x, y);
        }
        svg(x, y, src) {
            var img = new Image();
            let _context = this.context;
            img.onload = function () {
                _context.drawImage(img, 0, 0);
            };
            img.src = src;
        }
        arrow(x, y, data) {
            switch (data) {
                case interface_1.Direction.TOP:
                    this.context.moveTo(this.midx(x) - 4, this.pty(y + 1));
                    this.context.lineTo(this.midx(x), this.midy(y) - 2);
                    this.context.moveTo(this.midx(x) + 4, this.pty(y + 1));
                    this.context.lineTo(this.midx(x), this.midy(y) - 2);
                    break;
                case interface_1.Direction.RIGHT:
                    this.context.moveTo(this.ptx(x), this.midy(y) - 3);
                    this.context.lineTo(this.midx(x) + 2, this.midy(y));
                    this.context.moveTo(this.ptx(x), this.midy(y) + 3);
                    this.context.lineTo(this.midx(x) + 2, this.midy(y));
                    break;
                case interface_1.Direction.BOTTOM:
                    this.context.moveTo(this.midx(x) - 4, this.pty(y));
                    this.context.lineTo(this.midx(x), this.midy(y));
                    this.context.moveTo(this.midx(x) + 4, this.pty(y));
                    this.context.lineTo(this.midx(x), this.midy(y));
                    break;
                case interface_1.Direction.LEFT:
                    this.context.moveTo(this.ptx(x + 1), this.midy(y) - 3);
                    this.context.lineTo(this.midx(x) - 2, this.midy(y));
                    this.context.moveTo(this.ptx(x + 1), this.midy(y) + 3);
                    this.context.lineTo(this.midx(x) - 2, this.midy(y));
                    break;
            }
            this.mark(x, y);
        }
        ptx(x) {
            return x * constant_1.CONSTANT.GAP_X;
        }
        pty(y) {
            return y * constant_1.CONSTANT.GAP_Y;
        }
        midx(x) {
            return x * constant_1.CONSTANT.GAP_X + constant_1.CONSTANT.GAP_X / 2;
        }
        midy(y) {
            return y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y / 2;
        }
    }
    exports.UnitDraw = UnitDraw;
});
define("canvus", ["require", "exports", "unitdraw", "constant", "interface"], function (require, exports, unitdraw_1, constant_2, interface_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MyCanvus {
        constructor(canvus_id, isGrid) {
            this.drawing = false;
            this.isGrid = false;
            this.mstyle = constant_2.CONSTANT.THEME.DEFAULT;
            // intilizate the elemnets
            this.canvas = document.getElementById(canvus_id);
            this.dpi = window.devicePixelRatio;
            this.context = this.canvas.getContext("2d");
            this.isGrid = isGrid;
            this.mUniDraw = new unitdraw_1.UnitDraw(this.context);
            // touch listner.
            let _this = this;
            window.addEventListener("resize", function () {
                _this.setSize(window.innerWidth, window.innerHeight);
                if (_this.mCallback) {
                    _this.mCallback.onResize();
                }
            }, false);
            this.canvas.addEventListener("mousedown", function (e) {
                _this.drawing = true;
                _this.mousePos = _this.getMousePos(e);
                if (_this.mCallback) {
                    _this.mCallback.onStart({
                        x: _this.mousePos[0],
                        y: _this.mousePos[1]
                    });
                }
            }, false);
            this.canvas.addEventListener("mouseup", function (e) {
                _this.drawing = false;
                _this.notify(_this.getMousePos(e));
                if (_this.mCallback) {
                    _this.mCallback.onEnd({
                        x: _this.getMousePos(e)[0],
                        y: _this.getMousePos(e)[1]
                    });
                }
            }, false);
            this.canvas.addEventListener("mousemove", function (e) {
                _this.notify(_this.getMousePos(e));
            }, false);
            this.reDraw();
        }
        notify(mousePos) {
            if (!this.drawing) {
                return;
            }
            if (this.lastPos &&
                this.lastPos[0] == mousePos[0] &&
                this.lastPos[1] == mousePos[1]) {
                return;
            }
            this.lastPos = mousePos;
            if (this.mCallback) {
                this.mCallback.onMove({ x: mousePos[0], y: mousePos[1] });
            }
        }
        setStyle(style, isFront) {
            if (isFront) {
                this.context.fillStyle = style.fillColorHighlight;
            }
            else {
                this.context.fillStyle = style.fillColor;
            }
            this.context.strokeStyle = style.drawColor;
            this.context.font = "14px monospace";
        }
        // draw the grid.
        drawGrid() {
            this.setStyle(constant_2.CONSTANT.THEME.GRID, true);
            this.context.beginPath();
            for (var x = 0; x <= this.canvas.width; x += constant_2.CONSTANT.GAP_X) {
                this.context.moveTo(0.5 + x, 0);
                this.context.lineTo(0.5 + x, this.canvas.height);
            }
            for (var x = 0; x <= this.canvas.height; x += constant_2.CONSTANT.GAP_Y) {
                this.context.moveTo(0, 0.5 + x);
                this.context.lineTo(this.canvas.width, 0.5 + x);
            }
            this.context.stroke();
        }
        draw(pack, isFront) {
            this.setStyle(pack.style, isFront);
            this.context.beginPath();
            if (pack.pack.points[0].type == interface_2.DrawType.CHAR) {
                this.context.fillStyle = pack.style.drawColor;
            }
            this.mUniDraw.draw(pack.pack.points);
            this.context.stroke();
            this.mCachePoint = pack;
        }
        // clear canvus
        clearAll() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.isGrid) {
                this.drawGrid();
            }
        }
        // find the corid for touch point.
        getMousePos(mouseEvent) {
            var rect = this.canvas.getBoundingClientRect();
            let x = mouseEvent.clientX - rect.left;
            let y = mouseEvent.clientY - rect.top;
            // fix: Mouse is not poiting to right box.
            let point = [
                Math.ceil(x / constant_2.CONSTANT.GAP_X) - 1,
                Math.ceil(y / constant_2.CONSTANT.GAP_Y) - 1
            ];
            return point;
        }
        // get topleft coorinate for <x,y>
        getCoordinate(x, y) {
            return { x: x * constant_2.CONSTANT.GAP_X, y: x * constant_2.CONSTANT.GAP_Y };
        }
        setSize(width, height) {
            this.canvas.width = width;
            this.canvas.height = height;
            this.reDraw();
        }
        reDraw() {
            this.clearAll();
            if (this.isGrid) {
                this.drawGrid();
            }
            if (this.mCachePoint) {
                this.draw(this.mCachePoint, false);
            }
        }
    }
    exports.MyCanvus = MyCanvus;
});
define("interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Direction;
    (function (Direction) {
        Direction[Direction["TOP"] = 0] = "TOP";
        Direction[Direction["BOTTOM"] = 1] = "BOTTOM";
        Direction[Direction["LEFT"] = 2] = "LEFT";
        Direction[Direction["RIGHT"] = 3] = "RIGHT";
        Direction[Direction["NONE"] = 4] = "NONE";
    })(Direction = exports.Direction || (exports.Direction = {}));
    var DrawType;
    (function (DrawType) {
        DrawType[DrawType["PLUS"] = 0] = "PLUS";
        DrawType[DrawType["MINUS"] = 1] = "MINUS";
        DrawType[DrawType["MINUS_V"] = 2] = "MINUS_V";
        DrawType[DrawType["CLEAR"] = 3] = "CLEAR";
        DrawType[DrawType["MARK"] = 4] = "MARK";
        DrawType[DrawType["CHAR"] = 5] = "CHAR";
        DrawType[DrawType["SVG"] = 6] = "SVG";
        DrawType[DrawType["ARROW"] = 7] = "ARROW";
        DrawType[DrawType["DOT"] = 8] = "DOT";
    })(DrawType = exports.DrawType || (exports.DrawType = {}));
    var DrawOption;
    (function (DrawOption) {
        DrawOption["LINE"] = "LINE: move mouse to draw line";
        DrawOption["LINE_D"] = "DLINE: draw a directed line";
        DrawOption["LINE_DD"] = "DDLine: Draw a bothe directed line";
        DrawOption["RECT"] = "RECT: Drag the mouse to draw a rectbagle ";
        DrawOption["TEXT"] = "TEST: touch a cell to write a text";
        DrawOption["CLEAR"] = "CLEAR: Drag the mouse to clear area";
        DrawOption["MARKBOX"] = "MARK: Drag to mark a reason.";
        DrawOption["NONE"] = "NONE";
        DrawOption["SELECTED_DELETE"] = "DELETE: Click on the spape to delete.";
        DrawOption["SELECTED_DUPLICATE"] = "CLONE: Select and drag to make a copy";
        DrawOption["SELECT"] = "SELECT: touch a shape to select";
        DrawOption["MOVE"] = "Move: Select a shape and drag to move";
        DrawOption["COPY_AND_MOVE"] = "DUPLICATE: Select and drag to duplicate";
        DrawOption["RESIZE"] = "RESIZE: Drag an edge to resize";
        DrawOption["TEST_POINT"] = "TEST: Drop a elemnet to test.";
    })(DrawOption = exports.DrawOption || (exports.DrawOption = {}));
});
define("constant", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CONSTANT {
    }
    CONSTANT.GAP_X = 10;
    CONSTANT.GAP_Y = 15;
    CONSTANT.TEXT_GAP_OFFSET = 4;
    CONSTANT.BACKGROUND_COLOR = "#ffffff";
    CONSTANT.THEME = {
        DEFAULT: {
            fillColor: "#f5f5f5",
            fillColorHighlight: "#75edfc",
            drawColor: "#111111",
            textColor: "#000000"
        },
        GRID: {
            fillColor: "#ffffff",
            fillColorHighlight: "#75edfc",
            drawColor: "#f5f5f5",
            textColor: "#f5f5f5"
        },
        RED: {
            fillColor: "#fbe9e7",
            fillColorHighlight: "#75edfc",
            drawColor: "#ff3d00",
            textColor: "#c30000"
        },
        BLUE: {
            fillColor: "#e1f5fe",
            fillColorHighlight: "#75edfc",
            drawColor: "#0d47a1",
            textColor: "#002171"
        },
        GREEN: {
            fillColor: "#c8e6c9",
            fillColorHighlight: "#75edfc",
            drawColor: "#00c853",
            textColor: "#009624"
        },
        ORANGE: {
            fillColor: "#FBE9E7",
            fillColorHighlight: "#75edfc",
            drawColor: "#DD2C00",
            textColor: "#BF360C"
        },
        PURPLE: {
            fillColor: "#f3e5f5",
            fillColorHighlight: "#75edfc",
            drawColor: "#7b1fa2",
            textColor: "#4a148c"
        }
    };
    exports.CONSTANT = CONSTANT;
});
define("component", ["require", "exports", "utils", "interface"], function (require, exports, utils_1, interface_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseDrawElemnet {
        constructor() {
            this.points = new Array();
        }
        getElementPackage() {
            throw new Error("Method not implemented for BaseDrawElemnet.");
        }
        getDrawOption() {
            throw new Error("Method not implemented for BaseDrawElemnet");
        }
        moveBy(offset) {
            throw new Error("Method not implemented for BaseDrawElemnet");
        }
        resize(from, to) {
            throw new Error("Method not implemented for BaseDrawElemnet");
        }
        clone() {
            return JSON.parse(JSON.stringify(this));
        }
    }
    exports.BaseDrawElemnet = BaseDrawElemnet;
    class MarkBox extends BaseDrawElemnet {
        constructor(x11, y11, x22, y22) {
            super();
            let cor = utils_1.CommonUtils.getFixedCorner(x11, y11, x22, y22);
            let x1 = (this.x1 = cor[0]);
            let y1 = (this.y1 = cor[1]);
            let x2 = (this.x2 = cor[2]);
            let y2 = (this.y2 = cor[3]);
            for (let i = x1; i <= x2; i++) {
                for (let j = y1; j <= y2; j++) {
                    this.points.push({ x: x1, y: y1, type: interface_3.DrawType.MARK });
                }
            }
        }
        getElementPackage() {
            return {
                points: this.points,
                type: interface_3.DrawOption.RECT,
                args: [this.x1, this.y1, this.x2, this.y2],
                ele: this
            };
        }
        moveBy(offset) {
            return new MarkBox(this.x1 + offset.x, this.y1 + offset.y, this.x2 + offset.x, this.y2 + offset.y);
        }
        resize(from, to) { }
        getDrawOption() {
            return interface_3.DrawOption.MARKBOX;
        }
    }
    exports.MarkBox = MarkBox;
    class Rect extends BaseDrawElemnet {
        constructor(x11, y11, x22, y22) {
            super();
            let cor = utils_1.CommonUtils.getFixedCorner(x11, y11, x22, y22);
            let x1 = (this.x1 = cor[0]);
            let y1 = (this.y1 = cor[1]);
            let x2 = (this.x2 = cor[2]);
            let y2 = (this.y2 = cor[3]);
            this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y1, x2 - x1));
            this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y2, x2 - x1));
            this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y1, y2 - y1));
            this.points = this.points.concat(utils_1.CommonUtils.line_y(x2, y1, y2 - y1));
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y2, type: interface_3.DrawType.PLUS });
        }
        getElementPackage() {
            return {
                points: this.points,
                type: interface_3.DrawOption.RECT,
                args: [this.x1, this.y1, this.x2, this.y2],
                ele: this
            };
        }
        moveBy(offset) {
            return new Rect(this.x1 + offset.x, this.y1 + offset.y, this.x2 + offset.x, this.y2 + offset.y);
        }
        resize(from, to) {
            throw new Error("Method not implemented.");
        }
        getDrawOption() {
            return interface_3.DrawOption.RECT;
        }
    }
    exports.Rect = Rect;
    class ALine extends BaseDrawElemnet {
        constructor(x1, y1, x2, y2) {
            super();
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            switch (utils_1.CommonUtils.getDirection(x1, y1, x2, y2)) {
                case 1:
                    this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y1, y2 - y1));
                    this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
                    this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y2, x2 - x1));
                    break;
                case 2:
                    this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y2, y1 - y2));
                    this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
                    this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y2, x2 - x1));
                    break;
                case 3:
                    this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y1, y2 - y1));
                    this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
                    this.points = this.points.concat(utils_1.CommonUtils.line_x(x2, y2, x1 - x2));
                    break;
                case 4:
                    this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y2, y1 - y2));
                    this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
                    this.points = this.points.concat(utils_1.CommonUtils.line_x(x2, y2, x1 - x2));
                    break;
            }
        }
        getElementPackage() {
            return {
                points: this.points,
                type: interface_3.DrawOption.LINE,
                args: [],
                ele: this
            };
        }
        moveBy(offset) {
            throw new Error("Method not implemented for ALine");
        }
        resize(from, to) {
            throw new Error("Method not implemented.");
        }
        getDrawOption() {
            return interface_3.DrawOption.NONE;
        }
    }
    exports.ALine = ALine;
    class Line extends ALine {
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y2, type: interface_3.DrawType.PLUS });
        }
        moveBy(offset) {
            return new Line(this.x1 + offset.x, this.y1 + offset.y, this.x2 + offset.x, this.y2 + offset.y);
        }
        getDrawOption() {
            return interface_3.DrawOption.LINE;
        }
    }
    exports.Line = Line;
    class Line_D extends ALine {
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            let lastPt = this.points[this.points.length - 1];
            let dim = utils_1.CommonUtils.getDirectionOfTwoConsicutivePoints({ x: lastPt.x, y: lastPt.y }, { x: x2, y: y2 });
            if (dim != interface_3.Direction.NONE) {
                console.log(dim);
                utils_1.CommonUtils.pushAndReplace(this.points, {
                    x: x2,
                    y: y2,
                    type: interface_3.DrawType.ARROW,
                    data: dim
                });
            }
            else {
                console.log("Error in Line_D ");
            }
        }
        moveBy(offset) {
            return new Line_D(this.x1 + offset.x, this.y1 + offset.y, this.x2 + offset.x, this.y2 + offset.y);
        }
        getDrawOption() {
            return interface_3.DrawOption.LINE_D;
        }
    }
    class Line_DD extends ALine {
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            utils_1.CommonUtils.pushAndReplace(this.points, {
                x: x2,
                y: y2,
                type: interface_3.DrawType.DOT,
                data: ">"
            });
            utils_1.CommonUtils.pushAndReplace(this.points, {
                x: x1,
                y: y1,
                type: interface_3.DrawType.DOT,
                data: "<"
            });
        }
        getDrawOption() {
            return interface_3.DrawOption.LINE_DD;
        }
        moveBy(offset) {
            return new Line_DD(this.x1 + offset.x, this.y1 + offset.y, this.x2 + offset.x, this.y2 + offset.y);
        }
    }
    class Text extends BaseDrawElemnet {
        constructor(x, y, text) {
            super();
            this.x1 = x;
            this.y1 = y;
            this.text = text;
            for (let i = 0; i < text.length; i++) {
                this.points.push({
                    x: x + i,
                    y: y,
                    type: interface_3.DrawType.CHAR,
                    data: text.charAt(i)
                });
            }
        }
        getElementPackage() {
            return {
                points: this.points,
                type: interface_3.DrawOption.TEXT,
                args: [this.x1, this.y1, this.text],
                ele: this
            };
        }
        moveBy(offset) {
            return new Text(this.x1 + offset.x, this.y1 + offset.y, this.text);
        }
        resize(from, to) {
            throw new Error("Method not implemented.");
        }
        getDrawOption() {
            return interface_3.DrawOption.TEXT;
        }
    }
    exports.Text = Text;
    class ClearBox extends BaseDrawElemnet {
        constructor(x1, y1, x2, y2) {
            super();
            for (var i = x1; i <= x2; i++) {
                for (var j = y1; j <= y2; j++) {
                    this.points.push({ x: i, y: j, type: interface_3.DrawType.CLEAR });
                }
            }
        }
        getElementPackage() {
            return {
                points: this.points,
                type: interface_3.DrawOption.LINE,
                args: [this.x1, this.y1, this.y1, this.y2],
                ele: this
            };
        }
        moveBy(offset) {
            return new ClearBox(this.x1 + offset.x, this.y1 + offset.y, this.x2 + offset.x, this.y2 + offset.y);
        }
        resize(from, to) {
            throw new Error("Method not implemented.");
        }
        getDrawOption() {
            return interface_3.DrawOption.CLEAR;
        }
    }
    exports.ClearBox = ClearBox;
    /*****************************************************
     *  Define the manager below.
     *****************************************************/
    class ComponentManager {
        constructor(d) {
            this.mDrawOption = interface_3.DrawOption.NONE;
            this.mTextEle = null;
            /*************************************************************
             *  Define Text Functions
             * ************************************************************/
            this.mText = "";
            this.mMovedIdx = -1;
            this.mDrawManager = d;
        }
        onStart(point) {
            this.mStartPoint = point;
            if (this.isTextAction()) {
                this, this.handleTextStart(point);
            }
            else if (this.isSelectAction()) {
                this.handleSelectStart(point);
            }
            else if (this.isDrawFunction()) {
                this.handleDrawStart(point);
            }
            else if (this.isMoveAction()) {
                this.handleMovedStart(point);
            }
        }
        onEnd(a) {
            if (this.isSelectAction()) {
                this.handleSelectEnd(a);
            }
            else if (this.isDrawFunction()) {
                this.handleDrawEnd(this.ele.getElementPackage().points);
            }
            else if (this.isMoveAction()) {
                this.handleMovedEnd(a);
            }
        }
        onMove(a) {
            if (this.isSelectAction()) {
                this.handleSelectMove(a);
            }
            else if (this.isDrawFunction()) {
                this.handleDrawMove(a);
            }
            else if (this.isMoveAction()) {
                this.handleMovedMove(a);
            }
        }
        select(dpot) {
            this.mDrawOption = dpot;
        }
        getStyle() {
            return this.mDrawManager.getStyle();
        }
        isTextAction() {
            return this.mDrawOption == interface_3.DrawOption.TEXT;
        }
        onTextSubmit() {
            if (this.mText.length > 0) {
                let ele = new Text(this.mTextStartPoint.x, this.mTextStartPoint.y, this.mText);
                this.mDrawManager.insertToStack({
                    pack: ele.getElementPackage(),
                    style: this.mDrawManager.getStyle()
                });
                this.mDrawManager.discardChange();
            }
            this.mText = "";
        }
        handleTextStart(point) {
            if (this.mText.length > 0) {
                this.onTextSubmit();
            }
            if (this.mDrawManager.mUiCallback) {
                this.mDrawManager.mUiCallback.onTextBoxShown();
            }
            this.mTextStartPoint = point;
            this.onTextChange("");
        }
        onTextCancel() {
            this.mDrawManager.discardChange();
            this.mText = "";
        }
        onTextChange(text) {
            console.log(text);
            this.mText = text;
            if (this.mText.length == 0) {
                let ele = new MarkBox(this.mTextStartPoint.x, this.mTextStartPoint.y, this.mTextStartPoint.x, this.mTextStartPoint.y);
                this.mDrawManager.drawFront({
                    pack: ele.getElementPackage(),
                    style: this.mDrawManager.getStyle()
                });
            }
            else {
                this.mTextEle = new Text(this.mTextStartPoint.x, this.mTextStartPoint.y, this.mText);
                this.mDrawManager.drawFront({
                    pack: this.mTextEle.getElementPackage(),
                    style: this.mDrawManager.getStyle()
                });
            }
        }
        /*************************************************************
         *  Define Draw Functions
         * ************************************************************/
        isDrawFunction() {
            return (this.mDrawOption == interface_3.DrawOption.LINE ||
                this.mDrawOption == interface_3.DrawOption.LINE_D ||
                this.mDrawOption == interface_3.DrawOption.LINE_DD ||
                this.mDrawOption == interface_3.DrawOption.RECT ||
                this.mDrawOption == interface_3.DrawOption.CLEAR);
        }
        handleDrawStart(point) {
            this.mStartPoint = point;
        }
        handleDrawMove(a) {
            switch (this.mDrawOption) {
                case interface_3.DrawOption.RECT:
                    this.ele = new Rect(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.LINE:
                    this.ele = new Line(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.LINE_D:
                    this.ele = new Line_D(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.LINE_DD:
                    this.ele = new Line_DD(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_3.DrawOption.CLEAR:
                    this.ele = new ClearBox(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
            }
            this.mDrawManager.drawFront({
                pack: this.ele.getElementPackage(),
                style: this.getStyle()
            });
        }
        handleDrawEnd(points) {
            if (this.isDrawFunction()) {
                this.mDrawManager.insertToStack({
                    pack: this.ele.getElementPackage(),
                    style: this.mDrawManager.getStyle()
                });
                this.mDrawManager.discardChange();
            }
            else {
            }
        }
        isSelectAction() {
            return (this.mDrawOption == interface_3.DrawOption.SELECT ||
                this.mDrawOption == interface_3.DrawOption.SELECTED_DELETE ||
                this.mDrawOption == interface_3.DrawOption.SELECTED_DUPLICATE);
        }
        handleSelectStart(point) {
            this.mSelectedIdx = this.mDrawManager.getStackIndexForPoint(point);
            if (this.mSelectedIdx == -1) {
                //dismiss selection.
                return;
            }
            this.mSelectedPack = this.mDrawManager.getStackPoints(this.mSelectedIdx);
            this.mDrawManager.drawFront(this.mSelectedPack);
        }
        handleSelectMove(point) { }
        handleSelectEnd(point) {
            if (this.mSelectedIdx == -1) {
                return;
            }
            switch (this.mDrawOption) {
                case interface_3.DrawOption.SELECTED_DELETE:
                    this.mDrawManager.deleteFromStack(this.mSelectedIdx);
                    break;
                case interface_3.DrawOption.SELECTED_DUPLICATE:
                    let ele = this.mSelectedPack.pack.ele.moveBy({ x: -2, y: -2 });
                    this.mDrawManager.insertToStack({
                        style: this.mSelectedPack.style,
                        pack: ele.getElementPackage()
                    });
                    break;
            }
            this.mDrawManager.discardChange();
            this.mSelectedIdx = -1;
        }
        isMoveAction() {
            return (this.mDrawOption == interface_3.DrawOption.MOVE ||
                interface_3.DrawOption.COPY_AND_MOVE ||
                interface_3.DrawOption.RESIZE);
        }
        handleMovedStart(point) {
            this.mMovedIdx = this.mDrawManager.getStackIndexForPoint(point);
            if (this.mMovedIdx == -1) {
                //dismiss selection.
                return;
            }
            this.mMovedStart = point;
            this.mMovedPack = this.mDrawManager.getStackPoints(this.mMovedIdx);
            this.mDrawElemnet = this.mMovedPack.pack.ele;
            switch (this.mDrawOption) {
                case interface_3.DrawOption.MOVE:
                    this.mDrawManager.drawBackWithoutSpacific(this.mMovedIdx);
                    break;
                case interface_3.DrawOption.COPY_AND_MOVE:
                case interface_3.DrawOption.RESIZE:
            }
            this.mDrawManager.drawFront(this.mMovedPack);
        }
        handleMovedMove(point) {
            if (this.mMovedIdx == -1) {
                return;
            }
            switch (this.mDrawOption) {
                case interface_3.DrawOption.MOVE:
                case interface_3.DrawOption.COPY_AND_MOVE:
                    let ele1 = this.mMovedPack.pack.ele.moveBy({
                        x: point.x - this.mMovedStart.x,
                        y: point.y - this.mMovedStart.y
                    });
                    this.mDrawManager.drawFront({
                        style: this.mMovedPack.style,
                        pack: ele1.getElementPackage()
                    });
                    break;
                case interface_3.DrawOption.RESIZE:
                    this.mDrawManager.drawFront(utils_1.CommonUtils.resizeTransform(this.mMovedPack, this.mMovedStart, point));
            }
        }
        handleMovedEnd(point) {
            if (this.mMovedIdx == -1) {
                return;
            }
            switch (this.mDrawOption) {
                case interface_3.DrawOption.COPY_AND_MOVE:
                    let ele2 = this.mMovedPack.pack.ele.moveBy({
                        x: point.x - this.mMovedStart.x,
                        y: point.y - this.mMovedStart.y
                    });
                    this.mDrawManager.insertToStack({
                        style: this.mMovedPack.style,
                        pack: ele2.getElementPackage()
                    });
                    break;
                case interface_3.DrawOption.MOVE:
                    let ele3 = this.mMovedPack.pack.ele.moveBy({
                        x: point.x - this.mMovedStart.x,
                        y: point.y - this.mMovedStart.y
                    });
                    this.mDrawManager.replaceToStack(this.mMovedIdx, {
                        style: this.mMovedPack.style,
                        pack: ele3.getElementPackage()
                    });
                    break;
                case interface_3.DrawOption.RESIZE:
                    this.mDrawManager.replaceToStack(this.mMovedIdx, utils_1.CommonUtils.resizeTransform(this.mMovedPack, this.mMovedStart, point));
            }
            this.mDrawManager.discardChange();
            this.mMovedIdx = -1;
            this.mMovedStart = null;
            this.mMovedPack = null;
        }
    }
    exports.ComponentManager = ComponentManager;
});
define("utils", ["require", "exports", "interface", "component"], function (require, exports, interface_4, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CommonUtils {
        static line_x(x1, y1, count) {
            let p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1 + i, y: y1, type: interface_4.DrawType.MINUS });
            }
            return p;
        }
        static line_y(x1, y1, count) {
            let p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1, y: y1 + i, type: interface_4.DrawType.MINUS_V });
            }
            return p;
        }
        // get direction for two touch point.
        static getDirection(x1, y1, x2, y2) {
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
        }
        // top, right bottom, left
        static getDirectionOfTwoConsicutivePoints(point1, point2) {
            if (point1.x == point2.x) {
                if (point1.y < point2.y) {
                    return interface_4.Direction.BOTTOM;
                }
                else {
                    return interface_4.Direction.TOP;
                }
            }
            if (point1.y == point2.y) {
                if (point1.x < point2.x) {
                    return interface_4.Direction.RIGHT;
                }
                else {
                    return interface_4.Direction.LEFT;
                }
            }
            return interface_4.Direction.NONE;
        }
        // returns the topleft and botton right for any two point acts as rest
        static getFixedCorner(x1, y1, x2, y2) {
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
        }
        /*
          public static transform(pack: DrawPackage, xoffset, yoffset): DrawPackage {
            let newpoints = new Array();
            for (let point of pack.pack.points) {
              newpoints.push({
                x: point.x + xoffset,
                y: point.y + yoffset,
                data: point.data,
                type: point.type
              });
            }
            let newargs = pack.pack.args;
            // THIS IS A BUG - WE MUST DO THE TRANSFOM IN EACH COMPOENET.
            if (pack.pack.type == DrawOption.RECT) {
              newargs[0] += xoffset;
              newargs[1] += yoffset;
              newargs[2] += xoffset;
              newargs[3] += yoffset;
            }
            return {
              style: pack.style,
              pack: { args: newargs, points: newpoints, type: pack.pack.type }
            };
          }
          */
        // Take an ElementPackage and two moving point and return ElementPackage after resize.
        static resizeTransform(pack, startPoint, endPoint) {
            if (pack.pack.type != interface_4.DrawOption.RECT) {
                console.log("resizeTransform not yet Supported for ", pack.pack.type);
                return;
            }
            let ele = null;
            switch (this.findPointInWhichEdge(pack.pack, startPoint)) {
                case interface_4.Direction.TOP:
                    ele = new component_1.Rect(pack.pack.args[0], endPoint.y, pack.pack.args[2], pack.pack.args[3]).getElementPackage();
                    break;
                case interface_4.Direction.BOTTOM:
                    ele = new component_1.Rect(pack.pack.args[0], pack.pack.args[1], pack.pack.args[2], endPoint.y).getElementPackage();
                    break;
                case interface_4.Direction.LEFT:
                    ele = new component_1.Rect(endPoint.x, pack.pack.args[1], pack.pack.args[2], pack.pack.args[3]).getElementPackage();
                    break;
                case interface_4.Direction.RIGHT:
                    ele = new component_1.Rect(pack.pack.args[0], pack.pack.args[1], endPoint.x, pack.pack.args[3]).getElementPackage();
                    break;
            }
            if (ele == null) {
                console.log("Some error in resizeTransform");
            }
            return {
                style: pack.style,
                pack: ele != null ? ele : pack.pack
            };
        }
        // given a rect and a point - find which edge it lies.
        static findPointInWhichEdge(pack, point) {
            let x1 = pack.args[0];
            let y1 = pack.args[1];
            let x2 = pack.args[2];
            let y2 = pack.args[3];
            if (point.y == y1 && point.x <= x2 && point.x >= x1) {
                return interface_4.Direction.TOP;
            }
            else if (point.y == y2 && point.x <= x2 && point.x >= x1) {
                return interface_4.Direction.BOTTOM;
            }
            else if (point.x == x1 && point.y <= y2 && point.y >= y1) {
                return interface_4.Direction.LEFT;
            }
            else if (point.x == x2 && point.y <= y2 && point.y >= y1) {
                return interface_4.Direction.RIGHT;
            }
            console.log("Some error in findPointInWhichEdge");
            return interface_4.Direction.NONE;
        }
        // when we move from point1 to point2 - how we make this move ?
        // The retuen value looks like:  <top|botton, left|right>
        static findMoveDirection(point1, point2) {
            return [
                point2.y > point1.y ? interface_4.Direction.TOP : interface_4.Direction.BOTTOM,
                point2.x > point1.x ? interface_4.Direction.RIGHT : interface_4.Direction.LEFT
            ];
        }
        static pushAndReplace(points, point) {
            let flag = false;
            for (let i = 0; i < points.length; i++) {
                if (points[i].x == point.x && points[i].y == point.y) {
                    points[i] = point;
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                points.push(point);
            }
        }
    }
    CommonUtils.myProp = "Hello";
    exports.CommonUtils = CommonUtils;
});
// This is main DrawManager function,
define("draw", ["require", "exports", "constant", "canvus", "component"], function (require, exports, constant_3, canvus_1, component_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawManager {
        constructor(canvus_id1, canvus_id2) {
            this.mPointMap = {}; // list of point to index of statck
            this.mStack = new Array();
            this.mRedo = new Array();
            this.mDrawElementMouseEventHandler = new Array();
            this.mStyle = constant_3.CONSTANT.THEME.DEFAULT;
            // intilizate the elemnets
            this.mCanvusBack = new canvus_1.MyCanvus(canvus_id1, true);
            this.mCanvusFront = new canvus_1.MyCanvus(canvus_id2);
            this.mComponentManager = new component_2.ComponentManager(this);
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
                },
                onResize: function (a) {
                    _this.discardChange();
                }
            };
            this.mCanvusBack.setSize(window.innerWidth, window.innerHeight);
            this.mCanvusFront.setSize(window.innerWidth, window.innerHeight);
            this.discardChange();
        }
        onTextSubmit() {
            this.mComponentManager.onTextSubmit();
            if (this.mUiCallback) {
                this.mUiCallback.onTextBoxHide();
            }
        }
        onTextCancel() {
            this.mComponentManager.onTextCancel();
            if (this.mUiCallback) {
                this.mUiCallback.onTextBoxHide();
            }
        }
        onTextChange(text) {
            this.mComponentManager.onTextChange(text);
        }
        repaintBack() {
            this.mCanvusFront.clearAll();
            this.mCanvusBack.clearAll();
            for (let pack of this.mStack) {
                this.mCanvusBack.draw(pack, false);
            }
        }
        repaintBackWithoutSpacific(index) {
            this.mCanvusFront.clearAll();
            this.mCanvusBack.clearAll();
            for (let i = 0; i < this.mStack.length; i++) {
                if (i != index) {
                    this.mCanvusBack.draw(this.mStack[i], false);
                }
            }
        }
        insertToStackInternal(item) {
            console.log("[INFO] insertToStackInternal", item);
            this.mStack.push(item);
            for (let p of item.pack.points) {
                this.mPointMap[p.x + "#" + p.y] = this.mStack.length - 1;
            }
        }
        // this is expensive.
        recomputeMap() {
            this.mPointMap = new Object();
            for (let s = 0; s < this.mStack.length; s++) {
                for (let p of this.mStack[s].pack.points) {
                    this.mPointMap[p.x + "#" + p.y] = s;
                }
            }
        }
        // look ups.
        getStackIndexForPoint(point) {
            if (this.mPointMap[point.x + "#" + point.y] != undefined) {
                return this.mPointMap[point.x + "#" + point.y];
            }
            else {
                return -1;
            }
        }
        getStackPoints(index) {
            return this.mStack[index];
        }
        deleteFromStack(index) {
            this.mStack.splice(index, 1);
            this.recomputeMap();
        }
        insertToStack(pack) {
            this.insertToStackInternal(pack);
            this.recomputeMap();
        }
        replaceToStack(index, pack) {
            this.mStack[index] = pack;
            this.recomputeMap();
        }
        // draw functions.
        drawFront(pack) {
            this.mCanvusFront.clearAll();
            this.mCanvusFront.draw(pack, true);
        }
        drawBackWithoutSpacific(index) {
            this.repaintBackWithoutSpacific(index);
        }
        attach(cb) {
            this.mDrawElementMouseEventHandler.push(cb);
        }
        getStyle() {
            return this.mStyle;
        }
        // Public APIs
        undo() {
            if (this.mStack.length > 0) {
                this.mRedo.push(this.mStack.pop());
            }
            this.repaintBack();
        }
        redo() {
            if (this.mRedo.length > 0) {
                this.mStack.push(this.mRedo.pop());
            }
            this.repaintBack();
        }
        select(option) {
            this.mComponentManager.select(option);
            if (this.mUiCallback) {
                this.mUiCallback.onUpdateHint(option.toString() + "(" + this.mStack.length + ")");
            }
        }
        setStyle(style) {
            this.mStyle = style;
        }
        clearAll() {
            this.mCanvusBack.clearAll();
            this.mStack = new Array();
            this.mRedo = new Array();
            this.repaintBack();
        }
        discardChange() {
            this.repaintBack();
        }
        setUiCallback(uicallback) {
            this.mUiCallback = uicallback;
        }
    }
    exports.DrawManager = DrawManager;
});
// TODO.
// fix resize issue - to draw the grid at the begibing.
// fix point coordinate issye.
// defign move functinality.
// design select funtinality.
