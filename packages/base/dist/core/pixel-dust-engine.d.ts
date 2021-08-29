import { Subscription } from 'rxjs';
import CommandGenerator from './command-generator';
import EventManager from './event-manager';
import ExecutionPipeline from './execution-pipeline';
import LayerManager from './layer-manager';
import { CanvasType } from '../types/types';
import GuideCanvas from '../canvas/guide-canvas';
import PreviewCanvas from '../canvas/preview-canvas';
import '../styles/pixel-dust.css';
declare type PixelDustEngineProps = {
    mountTarget: HTMLDivElement;
    dimension: number;
    initializeWithLayer?: true;
    canvasType: CanvasType;
};
declare class PixelDustEngine {
    guideCanvas: GuideCanvas | undefined;
    previewCanvas: PreviewCanvas | undefined;
    mountTarget: HTMLDivElement;
    stage: HTMLDivElement;
    pixelDustCanvasContainer: HTMLDivElement;
    eventManager: EventManager;
    layerManager: LayerManager;
    commandGenerator: CommandGenerator;
    executionPipeline: ExecutionPipeline;
    subscriptions: Subscription[];
    containerPosition: {
        x: number;
        y: number;
        top: number;
        left: number;
        height: number;
        width: number;
    };
    computationCache: {
        containerX: number;
        containerY: number;
    };
    constructor({ mountTarget, dimension, canvasType }: PixelDustEngineProps);
    cleanUp(): void;
}
export default PixelDustEngine;
//# sourceMappingURL=pixel-dust-engine.d.ts.map