import { MyCanvus } from "./canvus";

export enum DrawType {
    PLUS,
    MINUS,
    MINUS_V,
    TEXT,
    CLEAR,
    MARK,
    CHAR,
    SVG,
    ARROW,
    DOT,
}
export enum DrawOption {
    LINE,
    LINE_D,
    LINE_DD,
    RECT,
    TEXT,
    CLEAR,
    MARK,
    NONE,
    MOVE,
    TEST_POINT,
  }
  
export interface DrawElemnet{
    getPoints(): Points;
    getDrawOption():DrawOption;
  }
  
export type Points = Array<{x: number, y: number, type: DrawType, data?: any}>;
export type Point = {x:number, y:number}

export type Style = {
    'fillColor'?:string,
    'drawColor'?:string,
    'textColor'?:string,
    'gridLineColor'?:string,
  }
export type TouchCallback = {
    'onStart': Function,
    'onMove': Function,
    'onEnd': Function
  };
  
export interface DrawElementMouseEventHandler{
    onStart(a:Point),
    onEnd(a:Point),
    onMove(a:Point),
  }

  export type DrawPackage = {
    'style':Style,
    'points':Points
  }