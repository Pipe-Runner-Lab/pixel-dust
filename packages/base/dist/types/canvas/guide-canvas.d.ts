import { CanvasType } from '../types/types';
declare class GuideCanvas {
    canvas: HTMLCanvasElement;
    dimension: number;
    ctx: CanvasRenderingContext2D;
    tileDimension: number;
    canvasType: CanvasType;
    constructor(canvasType: CanvasType, dimension: number, mountTarget: HTMLDivElement);
    drawGuideLines(): void;
}
export default GuideCanvas;
//# sourceMappingURL=guide-canvas.d.ts.map