import {CONSTANT} from './constant';
import {Direction, DrawType, Points} from './interface';



export class UnitDraw {
  private context;
  constructor(context) {
    this.context = context;
  }
  public draw(points: Points) {
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
          this.char(p.x, p.y, p.data)
          break;
        case DrawType.SVG:
          this.svg(p.x, p.y, p.data)
          break;
        case DrawType.ARROW:
          this.arrow(p.x, p.y, p.data)
          break;
        case DrawType.DOT:
          this.dot(p.x, p.y, p.data);
        break;
      }
    }
  }
  dot(x: number, y: number, data: any): any {
    this.context.moveTo(this.midx(x) + CONSTANT.GAP_X / 2, this.midy(y));
    this.context.arc(
        this.midx(x), this.midy(y), CONSTANT.GAP_X / 2, 0, 2 * Math.PI);
    this.mark(x, y);
  }


  private mark(x: number, y: number) {
    this.context.fillRect(
        x * CONSTANT.GAP_X + 1, y * CONSTANT.GAP_Y + 1, CONSTANT.GAP_X - 1,
        CONSTANT.GAP_Y - 1);
  }

  private clear(x, y) {
    this.context.fillRect(
        x * CONSTANT.GAP_X + 1, y * CONSTANT.GAP_Y + 1, CONSTANT.GAP_X - 1,
        CONSTANT.GAP_Y - 1);
  };

  private char(x, y, c) {
    // this.mark(x, y); This is a BUG.
    this.context.fillText(
        c, x * CONSTANT.GAP_X,
        y * CONSTANT.GAP_Y + CONSTANT.GAP_Y - CONSTANT.TEXT_GAP_OFFSET);
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
        x * CONSTANT.GAP_X + 2.5,
        y * CONSTANT.GAP_Y + CONSTANT.GAP_Y / 2 + 0.5);
    this.context.lineTo(
        (x + 1) * CONSTANT.GAP_X - 1.5,
        y * CONSTANT.GAP_Y + CONSTANT.GAP_Y / 2 + 0.5);
    this.mark(x, y);
  }

  // draw minus in vertical.
  private minus_v(x: number, y: number) {
    this.context.moveTo(
        x * CONSTANT.GAP_X + CONSTANT.GAP_X / 2 + 0.5, y * CONSTANT.GAP_Y + 2);
    this.context.lineTo(
        x * CONSTANT.GAP_X + CONSTANT.GAP_X / 2 + 0.5,
        (y + 1) * CONSTANT.GAP_Y - 2);
    this.mark(x, y);
  }

  private svg(x: number, y: number, src) {
    var img = new Image();
    let _context = this.context;
    img.onload = function() {
      _context.drawImage(img, 0, 0);
    } 
    img.src = src;
  }

  private arrow(x: number, y: number, data: Direction): void {
    switch (data) {
      case Direction.TOP:
        this.context.moveTo(this.midx(x) - 4, this.pty(y + 1));
        this.context.lineTo(this.midx(x), this.midy(y) - 2);
        this.context.moveTo(this.midx(x) + 4, this.pty(y + 1));
        this.context.lineTo(this.midx(x), this.midy(y) - 2);
        break;
      case Direction.RIGHT:
        this.context.moveTo(this.ptx(x), this.midy(y) - 3);
        this.context.lineTo(this.midx(x) + 2, this.midy(y));
        this.context.moveTo(this.ptx(x), this.midy(y) + 3);
        this.context.lineTo(this.midx(x) + 2, this.midy(y));
        break;
      case Direction.BOTTOM:
        this.context.moveTo(this.midx(x) - 4, this.pty(y));
        this.context.lineTo(this.midx(x), this.midy(y));
        this.context.moveTo(this.midx(x) + 4, this.pty(y));
        this.context.lineTo(this.midx(x), this.midy(y));
        break;
      case Direction.LEFT:
        this.context.moveTo(this.ptx(x + 1), this.midy(y) - 3);
        this.context.lineTo(this.midx(x) - 2, this.midy(y));
        this.context.moveTo(this.ptx(x + 1), this.midy(y) + 3);
        this.context.lineTo(this.midx(x) - 2, this.midy(y));
        break;
    }
    this.mark(x, y);
  }

  private ptx(x: number) {
    return x * CONSTANT.GAP_X;
  }
  private pty(y: number) {
    return y * CONSTANT.GAP_Y;
  }
  private midx(x: number) {
    return x * CONSTANT.GAP_X + CONSTANT.GAP_X / 2;
  }
  private midy(y: number) {
    return y * CONSTANT.GAP_Y + CONSTANT.GAP_Y / 2;
  }
}
