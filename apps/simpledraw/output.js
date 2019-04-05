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
        }
        dot(x, y, data) {
            this.context.moveTo(this.midx(x), this.midy(y));
            this.context.arc(this.midx(x), this.midy(y), constant_1.CONSTANT.GAP_X / 2, 0, 2 * Math.PI);
        }
        mark(x, y) {
            this.context.fillStyle = constant_1.CONSTANT.BACKGROUND_COLOR;
            this.context.fillRect(x * constant_1.CONSTANT.GAP_X + 1, y * constant_1.CONSTANT.GAP_Y + 1, constant_1.CONSTANT.GAP_X - 1, constant_1.CONSTANT.GAP_Y - 1);
        }
        clear(x, y) {
            this.context.fillStyle = constant_1.CONSTANT.BACKGROUND_COLOR;
            this.context.fillRect(x * constant_1.CONSTANT.GAP_X + 1, y * constant_1.CONSTANT.GAP_Y + 1, constant_1.CONSTANT.GAP_X - 1, constant_1.CONSTANT.GAP_Y - 1);
        }
        ;
        printChar(x, y, c) {
            console.log("printChar :" + c);
            this.context.font = '14px monospace';
            this.context.fillText(c, x * constant_1.CONSTANT.GAP_X, y * constant_1.CONSTANT.GAP_Y + constant_1.CONSTANT.GAP_Y - constant_1.CONSTANT.TEXT_GAP_OFFSET);
            this.mark(x, y);
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
define("canvus", ["require", "exports", "unitdraw", "constant"], function (require, exports, unitdraw_1, constant_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MyCanvus {
        constructor(canvus_id, isGrid) {
            this.drawing = false;
            this.isGrid = false;
            this.mstyle = constant_2.THEME['DEFAULT'];
            // intilizate the elemnets
            this.canvas = document.getElementById(canvus_id);
            this.dpi = window.devicePixelRatio;
            this.context = this.canvas.getContext('2d');
            this.isGrid = isGrid;
            this.mUniDraw = new unitdraw_1.UnitDraw(this.context);
            // touch listner.
            let _this = this;
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
        setStyle(style) {
            this.context.fillColor = style.fillColor;
            this.context.strokeStyle = style.drawColor;
        }
        // draw the grid.
        drawGrid() {
            this.setStyle(constant_2.THEME.get('GRID'));
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
        draw(pack) {
            this.clearAll();
            if (this.isGrid) {
                this.drawGrid();
            }
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
            // this is just a fix
            let point = [Math.floor((x + x * .05) / constant_2.CONSTANT.GAP_X), Math.floor((y + y * 0.05) / constant_2.CONSTANT.GAP_Y)];
            return point;
        }
        // get topleft coorinate for <x,y>
        getCoordinate(x, y) {
            return { x: x * constant_2.CONSTANT.GAP_X, y: x * constant_2.CONSTANT.GAP_Y };
        }
        setSize(width, height) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
        reDraw() {
            this.setSize(window.innerWidth, window.innerHeight);
            this.clearAll();
            if (this.isGrid) {
                this.drawGrid();
            }
            if (this.mCachePoint) {
                this.draw(this.mCachePoint);
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
define("constant", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CONSTANT {
    }
    CONSTANT.GAP_X = 10;
    CONSTANT.GAP_Y = 10;
    CONSTANT.TEXT_GAP_OFFSET = 2;
    CONSTANT.BACKGROUND_COLOR = '#fff';
    CONSTANT.STOKE_COLOR = '#F2EFEB'; //"#FEFAF9"//"#f5f5f5"
    CONSTANT.TEXT_COLOR = '#000';
    exports.CONSTANT = CONSTANT;
    exports.THEME = new Map();
    exports.THEME.set("DEFAULT", { fillColor: "#00f00", "drawColor": "#ff0000", "textColor": "#ff00ff" });
    exports.THEME.set("GRID", { fillColor: "#00f00", "drawColor": "#ff0000", "textColor": "#ff00ff" });
});
define("utils", ["require", "exports", "interface"], function (require, exports, interface_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CommonUtils {
        static line_x(x1, y1, count) {
            let p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1 + i, y: y1, type: interface_2.DrawType.MINUS });
            }
            return p;
        }
        static line_y(x1, y1, count) {
            let p = new Array();
            for (var i = 1; i < Math.abs(count); i++) {
                p.push({ x: x1, y: y1 + i, type: interface_2.DrawType.MINUS_V });
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
    }
    CommonUtils.myProp = 'Hello';
    exports.CommonUtils = CommonUtils;
});
define("component", ["require", "exports", "utils", "interface"], function (require, exports, utils_1, interface_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LineX {
        constructor(x1, y1, count) {
            this.points = new Array();
            this.x1 = x1;
            this.y1 = y1;
            this.count = count;
            for (var i = 0; i <= this.count; i++) {
                this.points.push({ x: this.x1 + i, y: this.y1, type: interface_3.DrawType.MINUS });
            }
        }
        getDrawOption() {
            return interface_3.DrawOption.NONE;
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
            return interface_3.DrawOption.TEST_POINT;
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
                this.points.push({ x: this.x1, y: this.y1 + i, type: interface_3.DrawType.MINUS_V });
            }
        }
        getDrawOption() {
            return interface_3.DrawOption.TEST_POINT;
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
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y2, type: interface_3.DrawType.PLUS });
        }
        getDrawOption() {
            return interface_3.DrawOption.RECT;
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
            this.points.push({ x: x1, y: y2, type: interface_3.DrawType.PLUS });
        }
        getDrawOption() {
            return interface_3.DrawOption.NONE;
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
            return interface_3.DrawOption.LINE;
        }
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            this.points.push({ x: x2, y: y2, type: interface_3.DrawType.PLUS });
        }
    }
    exports.Line = Line;
    class Line_D extends ALine {
        getDrawOption() {
            return interface_3.DrawOption.LINE_D;
        }
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.PLUS });
            //this.points.push({x:x2, y:y2, type:DrawType.ARROW, data: 2})
            this.points.push({ x: x2, y: y2, type: interface_3.DrawType.DOT });
        }
    }
    class Line_DD extends ALine {
        getDrawOption() {
            return interface_3.DrawOption.LINE_DD;
        }
        constructor(x1, y1, x2, y2) {
            super(x1, y1, x2, y2);
            this.points.push({ x: x2, y: y2, type: interface_3.DrawType.DOT, data: ">" });
            this.points.push({ x: x1, y: y1, type: interface_3.DrawType.DOT, data: "<" });
        }
    }
    class Text {
        constructor(x1, y, text) {
            this.points = new Array();
            for (let i = 0; i < text.length; i++) {
                this.points.push({ x: i, y: this.y1, type: interface_3.DrawType.TEXT, data: text.charAt(i) });
            }
        }
        getDrawOption() {
            return interface_3.DrawOption.TEXT;
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
                    this.points.push({ x: i, y: j, type: interface_3.DrawType.CLEAR });
                }
            }
        }
        getDrawOption() {
            return interface_3.DrawOption.CLEAR;
        }
        getPoints() {
            return this.points;
        }
    }
    exports.ClearBox = ClearBox;
    class ComponentManager {
        constructor(d) {
            this.mDrawOption = interface_3.DrawOption.NONE;
            this.isValidMove = false;
            this.mDrawManager = d;
        }
        onStart(a) {
            if (this.isDrawFunction()) {
                this.handleDrawStart(a);
            }
            else if (this.isMoveFunction()) {
                this.handleMoveStart(a);
            }
        }
        onEnd(a) {
            if (this.ele) {
                if (this.isDrawFunction()) {
                    this.handleDrawEnd(this.ele.getPoints());
                }
                else if (this.isMoveFunction()) {
                    this.handleMoveEnd(a);
                }
            }
        }
        onMove(a) {
            if (this.isDrawFunction()) {
                this.handleDrawMove(a);
            }
            else if (this.isMoveFunction()) {
                this.handleMoveMove(a);
            }
        }
        isDrawFunction() {
            return this.mDrawOption == interface_3.DrawOption.LINE ||
                this.mDrawOption == interface_3.DrawOption.LINE_D ||
                this.mDrawOption == interface_3.DrawOption.LINE_DD ||
                this.mDrawOption == interface_3.DrawOption.RECT ||
                this.mDrawOption == interface_3.DrawOption.CLEAR;
        }
        isMoveFunction() {
            return this.mDrawOption == interface_3.DrawOption.MOVE;
        }
        handleDrawStart(point) {
            this.mStartPoint = point;
        }
        handleDrawMove(a) {
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
            this.mDrawManager.drawFront({ 'points': this.ele.getPoints(), 'style': this.getStyle() });
        }
        getStyle() {
            return this.mDrawManager.getStyle();
        }
        handleDrawEnd(points) {
            this.mDrawManager.drawBack({ 'points': points, 'style': this.mDrawManager.getStyle() });
        }
        handleMoveStart(point) {
            console.log(" handleMoveStart called");
            this.mMoveStart = point;
            if (this.mDrawManager.getStackIndexForPoint(point) != -1) {
                this.drawMoveTrasition(point, point);
                this.isValidMove = true;
            }
        }
        handleMoveMove(point) {
            console.log(" handleMoveMove called");
            if (!this.isValidMove) {
                return;
            }
            this.drawMoveTrasition(this.mMoveStart, point);
        }
        handleMoveEnd(end) {
            console.log(" handleMoveEnd called");
            if (!this.isValidMove) {
                return;
            }
            console.log(" handleMoveEnd called 1");
            console.log(end);
            console.log(this.getMoveTranfromedPoint(this.mMoveStart, end));
            let newPoints = this.getMoveTranfromedPoint(this.mMoveStart, end);
            this.mDrawManager.drawBackWithReplace({ points: newPoints, style: this.getStyle() }, this.mMoveSetIndex);
            this.isValidMove = false;
        }
        getMoveTranfromedPoint(start, end) {
            let points = new Array();
            for (let p of this.mDrawManager.getStackPoints(this.mMoveSetIndex)) {
                points.push({ x: p.x + end.x - start.x, y: p.y + end.y - start.y, type: p.type, data: p.data });
            }
            return points;
        }
        drawMoveTrasition(start, end) {
            this.mDrawManager.drawFront({ points: this.getMoveTranfromedPoint(start, end), style: this.getStyle() });
        }
        select(mDrawOption) {
            this.mDrawOption = mDrawOption;
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
            this.mStyle = constant_3.THEME.get('DEFAULT');
            // intilizate the elemnets
            this.mCanvusBack = new canvus_1.MyCanvus(canvus_id1, true);
            this.mCanvusFront = new canvus_1.MyCanvus(canvus_id2);
            //this.mCanvusFront.setStyle('#111',"#d0e4b3", "#111")
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
        repaintBack() {
            this.mCanvusFront.clearAll();
            this.mCanvusBack.clearAll();
            for (let pack of this.mStack) {
                this.mCanvusBack.draw(pack);
            }
        }
        repaintBackWithoutSpacific(index) {
            this.mCanvusFront.clearAll();
            this.mCanvusBack.clearAll();
            for (let i = 0; i < this.mStack.length; i++) {
                if (i != index) {
                    this.mCanvusBack.draw(this.mStack[i]);
                }
            }
        }
        insertToStack(item) {
            console.log("[INFO] insertToStack", item);
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
            return this.mStack[index].points;
        }
        // draw functions.
        drawFront(pack) {
            this.mCanvusFront.draw(pack);
        }
        drawBack(pack) {
            this.insertToStack(pack);
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
        clearAll() {
            this.mCanvusBack.clearAll();
            this.mStack = new Array();
            this.mRedo = new Array();
            this.repaintBack();
        }
        attach(cb) {
            this.mDrawElementMouseEventHandler.push(cb);
        }
        select(option) {
            this.mComponentManager.select(option);
        }
        setStyle(style) {
            this.mStyle = style;
        }
        getStyle() {
            return this.mStyle;
        }
    }
    exports.DrawManager = DrawManager;
});
// TODO.
// fix resize issue - to draw the grid at the begibing.
// fix point coordinate issye.
// defign move functinality.
// design select funtinality.
