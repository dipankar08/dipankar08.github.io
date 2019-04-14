import { Style } from "./interface";

export abstract class CONSTANT {
  static GAP_X: number = 10;
  static GAP_Y: number = 15;
  static TEXT_GAP_OFFSET: number = 4;
  static BACKGROUND_COLOR = "#ffffff";
  static THEME = {
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
      fillColor: "#FFEBEE",
      fillColorHighlight: "#75edfc",
      drawColor: "#FF1744",
      textColor: "#D50000"
    },
    BLUE: {
      fillColor: "#E8EAF6",
      fillColorHighlight: "#75edfc",
      drawColor: "#304FFE",
      textColor: "#304FFE"
    },
    GREEN: {
      fillColor: "#E8F5E9",
      fillColorHighlight: "#75edfc",
      drawColor: "#1B5E20",
      textColor: "#304FFE"
    },
    YELLOW: {
      fillColor: "#FFF59D",
      fillColorHighlight: "#75edfc",
      drawColor: "#F57F17",
      textColor: "#304FFE"
    },
    ORANGE: {
      fillColor: "#FBE9E7",
      fillColorHighlight: "#75edfc",
      drawColor: "#DD2C00",
      textColor: "#BF360C"
    }
  };
}
