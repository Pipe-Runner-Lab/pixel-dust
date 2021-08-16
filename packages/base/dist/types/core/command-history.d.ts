import { Observable, Subscription } from 'rxjs';
import { HistoryCanvasCommands, HistoryLayerCommands } from '../types/types';
declare type CommandHistoryProps = {
    drawCommand$: Observable<HistoryCanvasCommands>;
    layerCommand$: Observable<HistoryLayerCommands>;
};
declare type Command = HistoryCanvasCommands | HistoryLayerCommands;
declare class CommandHistory {
    redoStack: Command[];
    subscriptions: Subscription[];
    constructor({ drawCommand$, layerCommand$ }: CommandHistoryProps);
    cleanUp(): void;
}
export default CommandHistory;
//# sourceMappingURL=command-history.d.ts.map