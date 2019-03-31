import { Points, DrawType } from "./interface";

export abstract class CommonUtils {
    static line_x(x1: number, y1: number, count: number): Points {
      let p: Points = new Array();
      for (var i: number = 1; i < Math.abs(count); i++) {
        p.push({x: x1 + i, y: y1, type: DrawType.MINUS})
      }
      return p;
    }
  
    static line_y(x1: number, y1: number, count: number): Points {
      let p: Points = new Array();
      for (var i: number = 1; i <  Math.abs(count); i++) {
        p.push({x: x1, y: y1 + i, type: DrawType.MINUS_V})
      }
      return p;
    }
  
    public static myProp = 'Hello';
    // get direction for two touch point.
    public static getDirection(x1: number, y1: number, x2: number, y2: number) {
      if (x1 <= x2) {
        if (y1 <= y2) {
          return 1;  // Down Right
        } else {
          return 2;  // UP Right.
        }
      } else {
        if (y1 <= y2) {
          return 3;  // Down Left
        } else {
          return 4;  // UP Left
        }
      }
    }
    // returns the topleft and botton right for any two point acts as rest
    public static getFixedCorner(x1: number, y1: number, x2: number, y2: number) {
      if (x1 <= x2) {
        if (y1 <= y2) {
          return [x1, y1, x2, y2];
        } else {
          return [x1, y2, x2, y1];
        }
      } else {
        if (y1 <= y2) {
          return [x2, y1, x1, y2];
        } else {
          return [x2, y2, x1, y1];
        }
      }
    }
  }