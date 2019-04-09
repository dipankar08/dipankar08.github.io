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
            this.context.moveTo(this.midx(x), this.midy(y));
            this.context.arc(this.midx(x), this.midy(y), constant_1.CONSTANT.GAP_X / 2, 0, 2 * Math.PI);
        }
        mark(x, y) {
            this.context.fillRect(x * constant_1.CONSTANT.GAP_X + 1, y * constant_1.CONSTANT.GAP_Y + 1, constant_1.CONSTANT.GAP_X - 1, constant_1.CONSTANT.GAP_Y - 1);
        }
        clear(x, y) {
            this.context.fillRect(x * constant_1.CONSTANT.GAP_X + 1, y * constant_1.CONSTANT.GAP_Y + 1, constant_1.CONSTANT.GAP_X - 1, constant_1.CONSTANT.GAP_Y - 1);
        }
        ;
        char(x, y, c) {
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
            this.context = this.canvas.getContext('2d');
            this.isGrid = isGrid;
            this.mUniDraw = new unitdraw_1.UnitDraw(this.context);
            // touch listner.
            let _this = this;
            window.addEventListener('resize', function () {
                _this.setSize(window.innerWidth, window.innerHeight);
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
            this.reDraw();
        }
        notify(mousePos) {
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
        }
        setStyle(style, isFront) {
            if (isFront) {
                this.context.fillStyle = style.fillColorHighlight;
            }
            else {
                this.context.fillStyle = style.fillColor;
            }
            this.context.strokeStyle = style.drawColor;
            this.context.font = '20px monospace';
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
            if (pack.points[0].type == interface_2.DrawType.CHAR) {
                this.context.fillStyle = pack.style.drawColor;
            }
            this.mUniDraw.draw(pack.points);
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
        ;
        // find the corid for touch point.
        getMousePos(mouseEvent) {
            var rect = this.canvas.getBoundingClientRect();
            let x = mouseEvent.clientX - rect.left;
            let y = mouseEvent.clientY - rect.top;
            // fix: Mouse is not poiting to right box.
            let point = [Math.ceil(x / constant_2.CONSTANT.GAP_X) - 1, Math.ceil(y / constant_2.CONSTANT.GAP_Y) - 1];
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
        DrawOption[DrawOption["LINE"] = 0] = "LINE";
        DrawOption[DrawOption["LINE_D"] = 1] = "LINE_D";
        DrawOption[DrawOption["LINE_DD"] = 2] = "LINE_DD";
        DrawOption[DrawOption["RECT"] = 3] = "RECT";
        DrawOption[DrawOption["TEXT"] = 4] = "TEXT";
        DrawOption[DrawOption["CLEAR"] = 5] = "CLEAR";
        DrawOption[DrawOption["MARK"] = 6] = "MARK";
        DrawOption[DrawOption["NONE"] = 7] = "NONE";
        DrawOption[DrawOption["SELECTED_DELETE"] = 8] = "SELECTED_DELETE";
        DrawOption[DrawOption["SELECTED_DUPLICATE"] = 9] = "SELECTED_DUPLICATE";
        DrawOption[DrawOption["SELECT"] = 10] = "SELECT";
        DrawOption[DrawOption["COPY"] = 11] = "COPY";
        DrawOption[DrawOption["MOVE"] = 12] = "MOVE";
        DrawOption[DrawOption["COPY_AND_MOVE"] = 13] = "COPY_AND_MOVE";
        DrawOption[DrawOption["RESIZE"] = 14] = "RESIZE";
        DrawOption[DrawOption["TEST_POINT"] = 15] = "TEST_POINT";
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
    CONSTANT.BACKGROUND_COLOR = '#fff';
    CONSTANT.THEME = {
        "DEFAULT": { fillColor: "#F2EFEB", fillColorHighlight: "#75edfc", "drawColor": "#111111", "textColor": "#000000" },
        "GRID": { fillColor: "#ffffff", "drawColor": "#F2EFEB", "textColor": "#F2EFEB" },
        "RED": { fillColor: "#FFEBEE", "drawColor": "#FF1744", "textColor": "#D50000" },
        "BLUE": { fillColor: "#E8EAF6", "drawColor": "#304FFE", "textColor": "#304FFE" },
        "GREEN": { fillColor: "#E8F5E9", "drawColor": "#1B5E20", "textColor": "#304FFE" },
        "YELLOW": { fillColor: "#FFF59D", "drawColor": "#F57F17", "textColor": "#304FFE" },
        "ORANGE": { fillColor: "#FBE9E7", "drawColor": "#DD2C00", "textColor": "#BF360C" },
    };
    exports.CONSTANT = CONSTANT;
});
define("utils", ["require", "exports", "interface"], function (require, exports, interface_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CommonUtils {
        static line_x(x1, y1, count) {
            let p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1 + i, y: y1, type: interface_3.DrawType.MINUS });
            }
            return p;
        }
        static line_y(x1, y1, count) {
            let p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1, y: y1 + i, type: interface_3.DrawType.MINUS_V });
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
        static getDirectionOfTwoConsicutivePoints(x1, y1, x2, y2) {
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
        static transform(pack, xoffset, yoffset) {
            let newpoints = new Array();
            for (let point of pack.points) {
                newpoints.push({ x: point.x + xoffset, y: point.y + yoffset, data: point.data, type: point.type });
            }
            return {
                style: pack.style,
                points: newpoints
            };
        }
    }
    CommonUtils.myProp = 'Hello';
    exports.CommonUtils = CommonUtils;
});
define("component", ["require", "exports", "utils", "interface"], function (require, exports, utils_1, interface_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LineX {
        constructor(x1, y1, count) {
            this.points = new Array();
            this.x1 = x1;
            this.y1 = y1;
            this.count = count;
            for (var i = 0; i <= this.count; i++) {
                this.points.push({ x: this.x1 + i, y: this.y1, type: interface_4.DrawType.MINUS });
            }
        }
        getDrawOption() {
            return interface_4.DrawOption.NONE;
        }
        getPoints() {
            return this.points;
        }
    }
    exports.LineX = LineX;
    class TestPoint {
        constructor() {
            this.points = new Array();
        }
        getDrawOption() {
            return interface_4.DrawOption.TEST_POINT;
        }
        getPoints() {
            return this.points;
        }
    }
    exports.TestPoint = TestPoint;
    class LineY {
        constructor(x1, y1, count) {
            this.points = new Array();
            this.x1 = x1;
            this.y1 = y1;
            this.count = count;
            for (var i = 0; i <= this.count; i++) {
                this.points.push({ x: this.x1, y: this.y1 + i, type: interface_4.DrawType.MINUS_V });
            }
        }
        getDrawOption() {
            return interface_4.DrawOption.TEST_POINT;
            //throw new Error("Method not implemented.");
        }
        getPoints() {
            return this.points;
        }
    }
    exports.LineY = LineY;
    class Rect {
        constructor(x11, y11, x22, y22) {
            this.points = new Array();
            let cor = utils_1.CommonUtils.getFixedCorner(x11, y11, x22, y22);
            let x1 = cor[0];
            let y1 = cor[1];
            let x2 = cor[2];
            let y2 = cor[3];
            this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y1, x2 - x1));
            this.points = this.points.concat(utils_1.CommonUtils.line_x(x1, y2, x2 - x1));
            this.points = this.points.concat(utils_1.CommonUtils.line_y(x1, y1, y2 - y1));
            this.points = this.points.concat(utils_1.CommonUtils.line_y(x2, y1, y2 - y1));
            this.points.push({ x: x1, y: y1, type: interface_4.DrawType.PLUS });
            this.points.push({ x: x1, y: y2, type: interface_4.DrawType.PLUS });
            this.points.push({ x: x2, y: y1, type: interface_4.DrawType.PLUS });
            this.points.push({ x: x2, y: y2, type: interface_4.DrawType.PLUS });
        }
        getDrawOption() {
            return interface_4.DrawOption.RECT;
        }
        getPoints() {
            return this.points;
        }
    }
    exports.Rect = Rect;
    class ALine {
        constructor(x1, y1, x2, y2) {
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
            this.points.push({ x: x1, y: y2, type: interface_4.DrawType.PLUS });
        }
        getDrawOption() {
            return interface_4.DrawOption.NONE;
        }
        getPoints() {
            //let filters = new Array();
            //  BUG : you must remove duplicates. 
            return this.points;
        }
    }
    exports.ALine = ALine;
    class Line extends ALine {
        getDrawOption() {
            return interface_4.DrawOption.LINE;
        }
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x1, y: y1, type: interface_4.DrawType.PLUS });
            this.points.push({ x: x2, y: y2, type: interface_4.DrawType.PLUS });
        }
    }
    exports.Line = Line;
    class Line_D extends ALine {
        getDrawOption() {
            return interface_4.DrawOption.LINE_D;
        }
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x1, y: y1, type: interface_4.DrawType.PLUS });
            //this.points.push({x:x2, y:y2, type:DrawType.ARROW, data: 2})
            this.points.push({ x: x2, y: y2, type: interface_4.DrawType.DOT });
        }
    }
    class Line_DD extends ALine {
        getDrawOption() {
            return interface_4.DrawOption.LINE_DD;
        }
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x2, y: y2, type: interface_4.DrawType.DOT, data: ">" });
            this.points.push({ x: x1, y: y1, type: interface_4.DrawType.DOT, data: "<" });
        }
    }
    class Text {
        constructor(x, y, text) {
            this.points = new Array();
            for (let i = 0; i < text.length; i++) {
                this.points.push({ x: x + i, y: y, type: interface_4.DrawType.CHAR, data: text.charAt(i) });
            }
        }
        getDrawOption() {
            return interface_4.DrawOption.TEXT;
        }
        getPoints() {
            return this.points;
        }
    }
    exports.Text = Text;
    class ClearBox {
        constructor(x1, y1, x2, y2) {
            this.points = new Array();
            for (var i = x1; i <= x2; i++) {
                for (var j = y1; j <= y2; j++) {
                    this.points.push({ x: i, y: j, type: interface_4.DrawType.CLEAR });
                }
            }
        }
        getDrawOption() {
            return interface_4.DrawOption.CLEAR;
        }
        getPoints() {
            return this.points;
        }
    }
    exports.ClearBox = ClearBox;
    class ComponentManager {
        constructor(d) {
            this.mDrawOption = interface_4.DrawOption.NONE;
            this.mTextEle = null;
            this.mMovedIdx = -1;
            this.mDrawManager = d;
        }
        onStart(point) {
            this.mStartPoint = point;
            if (this.isSelectAction()) {
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
            if (this.ele) {
                if (this.isSelectAction()) {
                    this.handleSelectEnd(a);
                }
                else if (this.isDrawFunction()) {
                    this.handleDrawEnd(this.ele.getPoints());
                }
                else if (this.isMoveAction()) {
                    this.handleMovedEnd(a);
                }
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
        onTextSubmit() {
            if (this.mDrawOption == interface_4.DrawOption.TEXT && this.mTextEle != null) {
                this.mDrawManager.drawBack({ 'points': this.mTextEle.getPoints(), 'style': this.mDrawManager.getStyle() });
            }
        }
        onTextCancel() {
        }
        onTextChange(text) {
            if (this.mDrawOption == interface_4.DrawOption.TEXT) {
                this.mTextEle =
                    new Text(this.mStartPoint.x, this.mStartPoint.y, text);
                this.mDrawManager.drawFront({ 'points': this.mTextEle.getPoints(), 'style': this.mDrawManager.getStyle() });
            }
        }
        select(dpot) {
            this.mDrawOption = dpot;
            if (this.isSelectAction()) {
                this.handleNewSelectEvent(dpot);
            }
        }
        /*************************************************************
        *  Define Draw Functions
        * ************************************************************/
        isDrawFunction() {
            return this.mDrawOption == interface_4.DrawOption.LINE ||
                this.mDrawOption == interface_4.DrawOption.LINE_D ||
                this.mDrawOption == interface_4.DrawOption.LINE_DD ||
                this.mDrawOption == interface_4.DrawOption.RECT ||
                this.mDrawOption == interface_4.DrawOption.CLEAR;
        }
        handleDrawStart(point) {
            this.mStartPoint = point;
        }
        handleDrawMove(a) {
            switch (this.mDrawOption) {
                case interface_4.DrawOption.RECT:
                    this.ele =
                        new Rect(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_4.DrawOption.LINE:
                    this.ele =
                        new Line(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_4.DrawOption.LINE_D:
                    this.ele =
                        new Line_D(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_4.DrawOption.LINE_DD:
                    this.ele =
                        new Line_DD(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
                case interface_4.DrawOption.CLEAR:
                    this.ele =
                        new ClearBox(this.mStartPoint.x, this.mStartPoint.y, a.x, a.y);
                    break;
            }
            this.mDrawManager.drawFront({ 'points': this.ele.getPoints(), 'style': this.getStyle() });
        }
        getStyle() {
            return this.mDrawManager.getStyle();
        }
        handleDrawEnd(points) {
            if (this.mDrawOption == interface_4.DrawOption.SELECT) {
            }
            if (this.isDrawFunction()) {
                this.mDrawManager.drawBack({ 'points': points, 'style': this.mDrawManager.getStyle() });
            }
            else {
            }
        }
        isSelectAction() {
            return this.mDrawOption == interface_4.DrawOption.SELECT || this.mDrawOption == interface_4.DrawOption.SELECTED_DELETE || this.mDrawOption == interface_4.DrawOption.SELECTED_DUPLICATE;
        }
        handleSelectStart(point) {
            this.mSelectedIdx = this.mDrawManager.getStackIndexForPoint(point);
            if (this.mSelectedIdx == -1) {
                //dismiss selection. 
                this.handleNewSelectEvent(interface_4.DrawOption.NONE);
                return;
            }
            this.mSelectedPack = this.mDrawManager.getStackPoints(this.mSelectedIdx);
            this.mDrawManager.drawFront(this.mSelectedPack);
        }
        handleSelectMove(point) {
        }
        handleSelectEnd(point) {
        }
        handleNewSelectEvent(drawOption) {
            if (this.mSelectedIdx == -1) {
                return;
            }
            switch (drawOption) {
                case interface_4.DrawOption.SELECTED_DELETE:
                    this.mDrawManager.deleteFromStack(this.mSelectedIdx);
                    break;
                case interface_4.DrawOption.SELECTED_DUPLICATE:
                    this.mDrawManager.insertToStack(utils_1.CommonUtils.transform(this.mSelectedPack, -2, -2));
                    break;
            }
            this.mDrawManager.discardChange();
            this.mSelectedIdx = -1;
        }
        isMoveAction() {
            return this.mDrawOption == interface_4.DrawOption.MOVE || interface_4.DrawOption.COPY_AND_MOVE;
        }
        handleMovedStart(point) {
            this.mMovedIdx = this.mDrawManager.getStackIndexForPoint(point);
            if (this.mMovedIdx == -1) {
                //dismiss selection. 
                return;
            }
            this.mMovedStart = point;
            this.mMovedPack = this.mDrawManager.getStackPoints(this.mMovedIdx);
            this.mDrawManager.drawFront(this.mMovedPack);
        }
        handleMovedMove(point) {
            if (this.mMovedIdx == -1) {
                return;
            }
            this.mDrawManager.drawFront(utils_1.CommonUtils.transform(this.mMovedPack, point.x - this.mMovedStart.x, point.y - this.mMovedStart.y));
        }
        handleMovedEnd(point) {
            if (this.mMovedIdx == -1) {
                return;
            }
            if (this.mDrawOption == interface_4.DrawOption.COPY_AND_MOVE) {
                this.mDrawManager.insertToStack(utils_1.CommonUtils.transform(this.mMovedPack, point.x - this.mMovedStart.x, point.y - this.mMovedStart.y));
            }
            else {
                this.mDrawManager.replaceToStack(this.mMovedIdx, utils_1.CommonUtils.transform(this.mMovedPack, point.x - this.mMovedStart.x, point.y - this.mMovedStart.y));
            }
            this.mDrawManager.discardChange();
            this.mSelectedIdx = -1;
        }
    }
    exports.ComponentManager = ComponentManager;
});
// This is main DrawManager function,
define("draw", ["require", "exports", "constant", "canvus", "component"], function (require, exports, constant_3, canvus_1, component_1) {
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
            this.mComponentManager = new component_1.ComponentManager(this);
            var _this = this;
            this.mCanvusFront.mCallback = {
                onStart: function (a) {
                    _this.mComponentManager.onStart(a);
                    if (_this.mUiCallback) {
                        _this.mUiCallback.onTextBoxShown();
                    }
                },
                onEnd: function (a) {
                    _this.mComponentManager.onEnd(a);
                },
                onMove: function (a) {
                    _this.mComponentManager.onMove(a);
                }
            };
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
            for (let p of item.points) {
                this.mPointMap[p.x + "#" + p.y] = this.mStack.length - 1;
            }
        }
        // this is expensive.
        recomputeMap() {
            this.mPointMap = new Object();
            for (let s = 0; s < this.mStack.length; s++) {
                for (let p of this.mStack[s].points) {
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
        }
        insertToStack(pack) {
            this.insertToStackInternal(pack);
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
        drawBack(pack) {
            this.insertToStackInternal(pack);
            this.mCanvusFront.clearAll();
            this.repaintBack();
        }
        drawBackWithReplace(pack, index) {
            this.mStack[index] = pack;
            this.repaintBack();
            this.recomputeMap();
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
