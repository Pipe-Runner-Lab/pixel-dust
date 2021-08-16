import { CanvasCommands, CanvasType, InstrumentType } from '../types/types';

class PreviewCanvas {
  canvas: HTMLCanvasElement;

  dimension: number;

  ctx: CanvasRenderingContext2D;

  tileDimension: number;

  canvasType: CanvasType;

  lastCommand: CanvasCommands | null = null;

  constructor(canvasType: CanvasType, dimension: number, mountTarget: HTMLDivElement) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('preview-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    mountTarget.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }
  }

  preview(command: CanvasCommands): void {
    this.refresh();
    this.lastCommand = command;

    switch (command.instrument) {
      case InstrumentType.PEN:
        this.ctx.fillStyle = command.color.replace(/[\d.]+\)$/g, '0.4)');
        this.ctx.fillRect(
          Math.round(command.x * this.tileDimension),
          Math.round(command.y * this.tileDimension),
          this.tileDimension,
          this.tileDimension
        );
        break;
      case InstrumentType.PIXEL_SQUARE:
        this.ctx.fillStyle = command.color.replace(/[\d.]+\)$/g, '0.4)');
        this.ctx.fillRect(
          Math.round(command.x * this.tileDimension - 16),
          Math.round(command.y * this.tileDimension - 16),
          this.tileDimension * 5,
          this.tileDimension * 5
        );
        break;
      case InstrumentType.ERASER:
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(
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

  refresh(): void {
    switch (this.lastCommand?.instrument) {
      case InstrumentType.PEN:
        this.ctx.clearRect(
          Math.round(this.lastCommand.x * this.tileDimension),
          Math.round(this.lastCommand.y * this.tileDimension),
          this.tileDimension,
          this.tileDimension
        );
        break;
      case InstrumentType.PIXEL_SQUARE:
        this.ctx.clearRect(
          Math.round(this.lastCommand.x * this.tileDimension - 16),
          Math.round(this.lastCommand.y * this.tileDimension - 16),
          this.tileDimension * 5,
          this.tileDimension * 5
        );
        break;
      case InstrumentType.ERASER:
        this.ctx.clearRect(
          Math.round(this.lastCommand.x * this.tileDimension),
          Math.round(this.lastCommand.y * this.tileDimension),
          this.tileDimension,
          this.tileDimension
        );
        break;
      default:
        break;
    }
  }
}

export default PreviewCanvas;
