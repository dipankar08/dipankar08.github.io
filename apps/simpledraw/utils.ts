import { Points, DrawType, DrawPackage, ElementPackage, Direction, Point, DrawOption } from "./interface";
import { Rect } from "./component";

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
    // top, right bottom, left
    public static getDirectionOfTwoConsicutivePoints(x1: number, y1: number, x2: number, y2: number) {
      if(x1==x2){
        if(y1<y2){
          return 2; // RIGHT
        } else{
          return 4; // LEFT
        }
      }
      if(y1==y2){
        if(x1<x2){
          return 3; // BOTTOM
        } else{
          return 1; // TOP
        }
      }
      return 0; // INVALID
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

    public static transform(pack:DrawPackage,xoffset, yoffset):DrawPackage{
      let newpoints = new Array();
      for(let point of pack.pack.points){
          newpoints.push({x:point.x+xoffset, y:point.y+yoffset,data:point.data,type:point.type});
      }
      let newargs = pack.pack.args;
      // THIS IS A BUG - WE MUST DO THE TRANSFOM IN EACH COMPOENET.
      if(pack.pack.type == DrawOption.RECT){
        newargs[0] +=xoffset;
        newargs[1] +=yoffset;
        newargs[2] +=xoffset;
        newargs[3] +=yoffset;
      }
      return {
        style:pack.style,
        pack:{args:newargs, points:newpoints, type:pack.pack.type}
      }
    }

    // Take an ElementPackage and two moving point and return ElementPackage after resize.
    public static resizeTransform(pack:DrawPackage,startPoint:Point, endPoint:Point):DrawPackage{
      if(pack.pack.type != DrawOption.RECT){
        console.log("resizeTransform not yet Supported for ",pack.pack.type);
        return;
      }
      let ele = null;
      switch(this.findPointInWhichEdge(pack.pack,startPoint)){
        case Direction.TOP:
          ele = new Rect(pack.pack.args[0],endPoint.y, pack.pack.args[2], pack.pack.args[3]).getElementPackage()
          break;
        case Direction.BOTTOM:
          ele = new Rect(pack.pack.args[0],pack.pack.args[1], pack.pack.args[2],endPoint.y).getElementPackage()
          break;
        case Direction.LEFT:
          ele = new Rect(endPoint.x,pack.pack.args[1], pack.pack.args[2], pack.pack.args[3]).getElementPackage()
          break;
          case Direction.RIGHT:
          ele = new Rect(pack.pack.args[0],pack.pack.args[1], endPoint.x,pack.pack.args[3]).getElementPackage()
          break;
      }
      if(ele == null){
        console.log("Some error in resizeTransform");
      }
      return { 
        style:pack.style,
        pack: ele != null? ele:pack.pack
      }
    }

    // given a rect and a point - find which edge it lies.
    public static findPointInWhichEdge(pack:ElementPackage, point):Direction{
      let x1= pack.args[0]
      let y1 = pack.args[1]
      let x2 = pack.args[2]
      let y2 = pack.args[3]
      if(point.y == y1 && point.x <=x2 && point.x >=x1){
        return Direction.TOP;
      } else if(point.y == y2 && point.x <=x2 && point.x >=x1){
        return Direction.BOTTOM;
      } else if(point.x == x1 && point.y <=y2 && point.y >=y1){
        return Direction.LEFT;
      } else if(point.x == x2 && point.y <=y2 && point.y >=y1){
        return Direction.RIGHT;
      }
      console.log("Some error in findPointInWhichEdge");
      return Direction.NONE;
    }

    // when we move from point1 to point2 - how we make this move ?
    // The retuen value looks like:  <top|botton, left|right>
    public static findMoveDirection(point1:Point, point2:Point):Array<Direction>{
        return [
          point2.y > point1.y ? Direction.TOP:Direction.BOTTOM,
          point2.x > point1.x ? Direction.RIGHT:Direction.LEFT,
        ]
    }
  }