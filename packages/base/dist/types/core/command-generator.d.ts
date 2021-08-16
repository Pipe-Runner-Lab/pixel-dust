import { Observable, Subject } from 'rxjs';
import { CanvasType, InstrumentType, CanvasCommands, LayerCommands } from '../types/types';
declare type CommandGeneratorProps = {
    drawStream: Observable<{
        x: number;
        y: number;
    }>;
    previewStream: Observable<{
        x: number;
        y: number;
    }>;
    dimension: number;
    canvasType: CanvasType;
};
declare class CommandGenerator {
    canvasCommand$: Observable<CanvasCommands>;
    previewCanvasCommand$: Observable<CanvasCommands>;
    layerCommand$: Subject<LayerCommands>;
    drawingState: {
        foregroundColor: string;
        backgroundColor: string;
        instrument: InstrumentType;
    };
    constructor(options: CommandGeneratorProps);
    cleanUp(): void;
}
export default CommandGenerator;
//# sourceMappingURL=command-generator.d.ts.map