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
    LINE="LINE: move mouse to draw line",
    LINE_D="DLINE: draw a directed line",
    LINE_DD="DDLine: Draw a bothe directed line",
    RECT="RECT: Drag the mouse to draw a rectbagle ",
    TEXT="TEST: touch a cell to write a text",
    CLEAR="CLEAR: Drag the mouse to clear area",
    MARKBOX="MARK: Drag to mark a reason.",
    NONE="NONE",
    SELECTED_DELETE="DELETE: Click on the spape to delete.",
    SELECTED_DUPLICATE="CLONE: Select and drag to make a copy",
    SELECT="SELECT: touch a shape to select",
    MOVE="Move: Select a shape and drag to move",
    COPY_AND_MOVE="DUPLICATE: Select and drag to duplicate",
    RESIZE="RESIZE: Drag an edge to resize",
    TEST_POINT="TEST: Drop a elemnet to test.",
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