import { CanvasCommands, CanvasType } from '../types/types';
declare class PreviewCanvas {
    canvas: HTMLCanvasElement;
    dimension: number;
    ctx: CanvasRenderingContext2D;
    tileDimension: number;
    canvasType: CanvasType;
    lastCommand: CanvasCommands | null;
    constructor(canvasType: CanvasType, dimension: number, mountTarget: HTMLDivElement);
    preview(command: CanvasCommands): void;
    refresh(): void;
}
export default PreviewCanvas;
//# sourceMappingURL=preview-canvas.d.ts.map