import { CanvasType } from '../types/types';

class GuideCanvas {
  canvas: HTMLCanvasElement;

  dimension: number;

  ctx: CanvasRenderingContext2D;

  tileDimension: number;

  canvasType: CanvasType;

  constructor(canvasType: CanvasType, dimension: number, mountTarget: HTMLDivElement) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas-guide');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    mountTarget.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }

    this.drawGuideLines();
  }

  drawGuideLines(): void {
    this.ctx.strokeStyle = '#E9F1F1';
    this.ctx.lineWidth = 1;
    for (let i = this.tileDimension; i < this.canvas.width; i += this.tileDimension) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
      this.ctx.stroke();
    }
    for (let i = this.tileDimension; i < this.canvas.width; i += this.tileDimension) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.width);
      this.ctx.stroke();
    }
  }
}

export default GuideCanvas;
