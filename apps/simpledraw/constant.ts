import { Style } from "./interface";

export abstract class CONSTANT {
static GAP_X: number = 10;
static GAP_Y: number = 15;
static TEXT_GAP_OFFSET: number = 4;
static BACKGROUND_COLOR = '#fff';
static THEME ={
        "DEFAULT": {fillColor:"#F2EFEB",fillColorHighlight:"#75edfc","drawColor":"#111111","textColor":"#000000"},
        "GRID": {fillColor:"#ffffff","drawColor":"#F2EFEB","textColor":"#F2EFEB"},
        "RED": {fillColor:"#FFEBEE","drawColor":"#FF1744","textColor":"#D50000"},
        "BLUE": {fillColor:"#E8EAF6","drawColor":"#304FFE","textColor":"#304FFE"},
        "GREEN": {fillColor:"#E8F5E9","drawColor":"#1B5E20","textColor":"#304FFE"},
        "YELLOW": {fillColor:"#FFF59D","drawColor":"#F57F17","textColor":"#304FFE"},
        "ORANGE": {fillColor:"#FBE9E7","drawColor":"#DD2C00","textColor":"#BF360C"},
    }
}
