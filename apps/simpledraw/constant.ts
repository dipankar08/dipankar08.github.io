import { Style } from "./interface";

export abstract class CONSTANT {
static GAP_X: number = 10;
static GAP_Y: number = 10;
static TEXT_GAP_OFFSET: number = 2;
static BACKGROUND_COLOR = '#fff';
static STOKE_COLOR = '#F2EFEB';  //"#FEFAF9"//"#f5f5f5"
static TEXT_COLOR = '#000'; 
}

export var THEME = new Map<string, Style>(

);
THEME.set("DEFAULT", {fillColor:"#00f00","drawColor":"#ff0000","textColor":"#ff00ff"});
THEME.set("GRID", {fillColor:"#00f00","drawColor":"#ff0000","textColor":"#ff00ff"});
