import { MyCanvus } from "./canvus";

export enum DrawType {
    PLUS,
    MINUS,
    MINUS_V,
    TEXT,
    CLEAR,
    MARK,
    CHAR,
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
  
  
export interface DrawElemnet  extends DrawElementMouseEventHandler{
    getPoints(): Points;
    getDrawOption():DrawOption;
  }
  
export type Points = Array<{x: number, y: number, type: DrawType, data?: string}>;
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