import { Subscription } from 'rxjs';
import CommandGenerator from './command-generator';
import LayerManager from './layer-manager';
import CommandHistory from './command-history';
import PreviewCanvas from '../canvas/preview-canvas';
declare type ExecutionPipelineProps = {
    layerManager: LayerManager;
    commandGenerator: CommandGenerator;
    previewCanvas: PreviewCanvas;
};
declare class ExecutionPipeline {
    layerManager: LayerManager;
    previewCanvas: PreviewCanvas;
    commandGenerator: CommandGenerator;
    commandHistory: CommandHistory;
    subscriptions: Subscription[];
    constructor(options: ExecutionPipelineProps);
    undo(count?: number): void;
    cleanUp(): void;
}
export default ExecutionPipeline;
//# sourceMappingURL=execution-pipeline.d.ts.map