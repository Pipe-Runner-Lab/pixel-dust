import { CanvasCommands, CanvasType, InstrumentType } from '../types/types';

class PixelCanvas {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  dimension: number;

  tileDimension: number;

  canvasType: CanvasType;

  constructor(canvasType: CanvasType, dimension: number, uuid: string) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('pixel-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    this.canvas.setAttribute('id', uuid);

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }
  }

  execute(command: CanvasCommands): void {
    switch (command.instrument) {
      case InstrumentType.PEN:
        this.ctx.fillStyle = command.color;
        this.ctx.fillRect(
          Math.round(command.x * this.tileDimension),
          Math.round(command.y * this.tileDimension),
          this.tileDimension,
          this.tileDimension
        );
        break;
      case InstrumentType.PIXEL_SQUARE:
        this.ctx.fillStyle = command.color;
        this.ctx.fillRect(
          Math.round(command.x * this.tileDimension - 16),
          Math.round(command.y * this.tileDimension - 16),
          this.tileDimension * 5,
          this.tileDimension * 5
        );
        break;
      case InstrumentType.ERASER:
        this.ctx.clearRect(
          Math.round(command.x * this.tileDimension),
          Math.round(command.y * this.tileDimension),
          this.tileDimension,
          this.tileDimension
        );
        break;
      default:
        break;
    }
  }

  getCanvasBlob(type?: string, quality?: number): Promise<Blob | null> {
    return new Promise((resolve) => {
      this.canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        type ?? 'img/png',
        quality
      );
    });
  }
}

export default PixelCanvas;
