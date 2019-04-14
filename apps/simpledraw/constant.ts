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
      fillColor: "#fbe9e7",
      fillColorHighlight: "#75edfc",
      drawColor: "#ff3d00",
      textColor: "#c30000"
    },
    BLUE: {
      fillColor: "#e1f5fe",
      fillColorHighlight: "#75edfc",
      drawColor: "#0d47a1",
      textColor: "#002171"
    },
    GREEN: {
      fillColor: "#c8e6c9",
      fillColorHighlight: "#75edfc",
      drawColor: "#00c853",
      textColor: "#009624"
    },
    ORANGE: {
      fillColor: "#FBE9E7",
      fillColorHighlight: "#75edfc",
      drawColor: "#DD2C00",
      textColor: "#BF360C"
    },
    PURPLE: {
      fillColor: "#f3e5f5",
      fillColorHighlight: "#75edfc",
      drawColor: "#7b1fa2",
      textColor: "#4a148c"
    }
  };
}
