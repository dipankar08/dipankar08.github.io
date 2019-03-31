declare module "constant" {
    export abstract class CONSTANT {
        static GAP_X: number;
        static GAP_Y: number;
        static TEXT_GAP_OFFSET: number;
        static BACKGROUND_COLOR: string;
        static STOKE_COLOR: string;
        static TEXT_COLOR: string;
    }
}
declare module "interface" {
    export enum DrawType {
        PLUS = 0,
        MINUS = 1,
        MINUS_V = 2,
        TEXT = 3,
        CLEAR = 4,
        MARK = 5,
        CHAR = 6
    }
    export enum DrawOption {
        LINE = 0,
        LINE_D = 1,
        LINE_DD = 2,
        RECT = 3,
        TEXT = 4,
        CLEAR = 5,
        MARK = 6,
        NONE = 7,
        MOVE = 8,
        TEST_POINT = 9
    }
    export interface DrawElemnet extends DrawElementMouseEventHandler {
        getPoints(): Points;
        getDrawOption(): DrawOption;
    }
    export type Points = Array<{
        x: number;
        y: number;
        type: DrawType;
        data?: string;
    }>;
    export type Point = {
        x: number;
        y: number;
    };
    export type Style = {
        'fillColor'?: string;
        'drawColor'?: string;
        'textColor'?: string;
        'gridLineColor'?: string;
    };
    export type TouchCallback = {
        'onStart': Function;
        'onMove': Function;
        'onEnd': Function;
    };
    export interface DrawElementMouseEventHandler {
        onStart(a: Point): any;
        onEnd(a: Point): any;
        onMove(a: Point): any;
    }
}
declare module "unitdraw" {
    import { Points } from "interface";
    export class UnitDraw {
        private context;
        constructor(context: any);
        draw(points: Points): void;
        private mark;
        private clear;
        private printChar;
        private plus;
        private minus;
        private minus_v;
    }
}
declare module "canvus" {
    import { Points, TouchCallback } from "interface";
    interface ICanvus {
        draw(points: Points): any;
    }
    export class MyCanvus implements ICanvus {
        readonly canvas: any;
        private dpi;
        private drawing;
        readonly context: any;
        mCallback: TouchCallback;
        private mousePos;
        private lastPos;
        private isGrid;
        private mstyle;
        private mCachePoint;
        private mUniDraw;
        constructor(canvus_id: any, isGrid?: boolean);
        private notify;
        setStyle(drawColor?: string, fillColor?: string, textColor?: string): void;
        drawGrid(): void;
        draw(points: Points): void;
        clearAll(): void;
        private getMousePos;
        private getCoordinate;
        private setSize;
        reDraw(): void;
    }
}
declare module "utils" {
    import { Points } from "interface";
    export abstract class CommonUtils {
        static line_x(x1: number, y1: number, count: number): Points;
        static line_y(x1: number, y1: number, count: number): Points;
        static myProp: string;
        static getDirection(x1: number, y1: number, x2: number, y2: number): 2 | 1 | 3 | 4;
        static getFixedCorner(x1: number, y1: number, x2: number, y2: number): number[];
    }
}
declare module "draw" {
    import { DrawElementMouseEventHandler, Points } from "interface";
    export class DrawManager {
        private mCanvusBack;
        private mCanvusFront;
        private mPointMap;
        private mStack;
        private mRedo;
        private mDrawElementMouseEventHandler;
        private mComponentManager;
        constructor(canvus_id1: any, canvus_id2: any);
        private repaintBack;
        private repaintBackWithoutSpacific;
        private insertToStack;
        private recomputeMap;
        undo(): void;
        redo(): void;
        clearAll(): void;
        attach(cb: DrawElementMouseEventHandler): void;
        getStackIndexForPoint(point: any): number;
        getStackPoints(index: number): Points;
        drawFront(points: any): void;
        drawBack(points: any): void;
        drawBackWithReplace(points: any, index: number): void;
        drawBackWithoutSpacific(index: number): void;
    }
}
declare module "component" {
    import { DrawOption, Point, Points, DrawElemnet, DrawElementMouseEventHandler } from "interface";
    import { DrawManager } from "draw";
    export class LineX implements DrawElemnet {
        getDrawOption(): DrawOption;
        onStart(a: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        x1: number;
        y1: number;
        count: number;
        points: Points;
        constructor(x1: any, y1: any, count: any);
        getPoints(): Points;
    }
    export class TestPoint implements DrawElemnet, DrawElementMouseEventHandler {
        getDrawOption(): DrawOption;
        onStart(a: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        points: Points;
        constructor();
        getPoints(): Points;
    }
    export class LineY implements DrawElemnet {
        getDrawOption(): DrawOption;
        onStart(a: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        x1: number;
        y1: number;
        count: number;
        points: Points;
        constructor(x1: any, y1: any, count: any);
        getPoints(): Points;
    }
    export class Rect implements DrawElemnet {
        getDrawOption(): DrawOption;
        onStart(a: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        points: Points;
        constructor(x11: any, y11: any, x22: any, y22: any);
        getPoints(): Points;
    }
    export class ALine implements DrawElemnet {
        getDrawOption(): DrawOption;
        onStart(point: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        points: Points;
        constructor(x1: any, y1: any, x2: any, y2: any);
        getPoints(): Points;
    }
    export class Line extends ALine {
        getDrawOption(): DrawOption;
        constructor(x1: any, y1: any, x2: any, y2: any);
    }
    export class Text implements DrawElemnet {
        getDrawOption(): DrawOption;
        onStart(a: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        x1: number;
        y1: number;
        text: string;
        points: Points;
        constructor(x1: number, y: number, text: string);
        getPoints(): Points;
    }
    export class ClearBox implements DrawElemnet {
        getDrawOption(): DrawOption;
        onStart(a: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        points: Points;
        constructor(x1: any, y1: any, x2: any, y2: any);
        getPoints(): Points;
    }
    export class ComponentManager {
        private mDrawManager;
        private mStartPoint;
        private ele?;
        private mDrawOption;
        constructor(d: DrawManager);
        onStart(a: Point): void;
        onEnd(a: Point): void;
        onMove(a: Point): void;
        private isDrawFunction;
        private isMoveFunction;
        private handleDrawStart;
        private handleDrawMove;
        private handleDrawEnd;
        private mMoveSetIndex;
        private mMoveStart;
        private isValidMove;
        private handleMoveStart;
        private handleMoveMove;
        private handleMoveEnd;
        private getMoveTranfromedPoint;
        private drawMoveTrasition;
        select(mDrawOption: DrawOption): void;
    }
}
