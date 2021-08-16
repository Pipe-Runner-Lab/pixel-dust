import { CanvasCommands, CanvasType } from '../types/types';
declare class PixelCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dimension: number;
    tileDimension: number;
    canvasType: CanvasType;
    constructor(canvasType: CanvasType, dimension: number, uuid: string);
    execute(command: CanvasCommands): void;
    getCanvasBlob(type?: string, quality?: number): Promise<Blob | null>;
}
export default PixelCanvas;
//# sourceMappingURL=pixel-canvas.d.ts.map