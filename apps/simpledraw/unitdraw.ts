import { CONSTANT } from "./constant";
import { Points, DrawType } from "./interface";



export class UnitDraw{
    private context;
    constructor(context){
        this.context = context;
    }
    public draw(points:Points){
        for (let p of points) {
            switch (p.type) {
              case DrawType.PLUS:
                this.plus(p.x, p.y)
                break;
              case DrawType.MINUS:
                this.minus(p.x, p.y)
                break;
              case DrawType.MINUS_V:
                this.minus_v(p.x, p.y)
                break;
              case DrawType.MARK:
                this.mark(p.x, p.y)
                break;
              case DrawType.CLEAR:
                this.clear(p.x, p.y)
                break;
              case DrawType.CHAR:
                this.printChar(p.x, p.y, p.data)
                break;
              case DrawType.CHAR:
                this.printChar(p.x, p.y, p.data)
                break;
            }
          }
    }
    
    private mark(x: number, y: number) {
        this.context.fillStyle = CONSTANT.BACKGROUND_COLOR;
        this.context.fillRect(
            x * CONSTANT.GAP_X + 1, y * CONSTANT.GAP_Y + 1, CONSTANT.GAP_X - 1, CONSTANT.GAP_Y - 1);
      }
    
    private clear(x, y) {
        this.context.fillStyle = CONSTANT.BACKGROUND_COLOR;
        this.context.fillRect(
            x * CONSTANT.GAP_X + 1, y * CONSTANT.GAP_Y + 1, CONSTANT.GAP_X - 1, CONSTANT.GAP_Y - 1);
      };
    
      private printChar(x, y, c) {
        console.log("printChar :"+c);
        this.context.font = '14px monospace';
        this.context.fillText(
            c, x * CONSTANT.GAP_X, y * CONSTANT.GAP_Y + CONSTANT.GAP_Y - CONSTANT.TEXT_GAP_OFFSET);
        this.mark(x,y);
      }
    
      // draw plus
      private plus(x: number, y: number) {
        let midx = x * CONSTANT.GAP_X + CONSTANT.GAP_X / 2;
        let midy = y * CONSTANT.GAP_Y + CONSTANT.GAP_Y / 2;
        this.context.moveTo(midx - 3 + 0.5, midy + 0.5);
        this.context.lineTo(midx + 3 + 0.5, midy + 0.5);
        this.context.moveTo(midx + 0.5, midy - 3);
        this.context.lineTo(midx + 0.5, midy + 3);
        this.mark(x, y);
      }
    
      // draw minus
      private minus(x: number, y: number) {
        this.context.moveTo(
            x * CONSTANT.GAP_X + 2.5, y * CONSTANT.GAP_Y + CONSTANT.GAP_Y / 2 + 0.5);
        this.context.lineTo(
            (x + 1) * CONSTANT.GAP_X - 1.5, y * CONSTANT.GAP_Y + CONSTANT.GAP_Y / 2 + 0.5);
        this.mark(x, y);
      }
    
      // draw minus in vertical.
      private minus_v(x: number, y: number) {
        this.context.moveTo(
            x * CONSTANT.GAP_X + CONSTANT.GAP_X / 2 + 0.5, y * CONSTANT.GAP_Y + 2);
        this.context.lineTo(
            x * CONSTANT.GAP_X + CONSTANT.GAP_X / 2 + 0.5, (y + 1) * CONSTANT.GAP_Y - 2);
        this.mark(x, y);
      }
}
  