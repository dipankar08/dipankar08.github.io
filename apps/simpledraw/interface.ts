import { MyCanvus } from "./canvus";

export enum Direction{
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  NONE
}
export enum DrawType {
    PLUS,
    MINUS,
    MINUS_V,
    CLEAR,
    MARK,
    CHAR,
    SVG,
    ARROW,
    DOT,
}
export enum DrawOption {
    LINE="line",
    LINE_D="directed line",
    LINE_DD="both directed line",
    RECT="rectabgle",
    TEXT="test",
    CLEAR="clear all",
    MARKBOX="mark box",
    NONE="none",
    SELECTED_DELETE="delete",
    SELECTED_DUPLICATE="copy and drag to draw",
    SELECT="selecet",
    COPY="copy",
    MOVE="move",
    COPY_AND_MOVE="select and drag for copy",
    RESIZE="resize",
    TEST_POINT="point",
  }
  
  export type ElementPackage = {
  points:Points,
  type:DrawOption,
  args:Array<any>,
  }
export interface DrawElemnet{
    getElementPackage(): ElementPackage;
    getDrawOption():DrawOption;
  }
  
export type Points = Array<{x: number, y: number, type: DrawType, data?: any}>;
export type Point = {x:number, y:number}

export type Style = {
    'fillColor'?:string,
    'fillColorHighlight'?:string,
    'drawColor'?:string,
    'textColor'?:string,
    'gridLineColor'?:string,
  }

  export type UiCallback={
    onTextBoxShown:Function,
    onTextBoxHide:Function,
    onUpdateHint:Function,
  };
export type TouchCallback = {
    'onStart': Function,
    'onMove': Function,
    'onEnd': Function,
    onResize:Function,
  };
  
export interface DrawElementMouseEventHandler{
    onStart(a:Point),
    onEnd(a:Point),
    onMove(a:Point),
  }

  export type DrawPackage = {
    'style':Style,
    pack:ElementPackage,
  }