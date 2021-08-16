import { Observable, merge, Subscription } from 'rxjs';
import { HistoryCanvasCommands, HistoryLayerCommands } from '../types/types';

type CommandHistoryProps = {
  drawCommand$: Observable<HistoryCanvasCommands>;
  layerCommand$: Observable<HistoryLayerCommands>;
};

type Command = HistoryCanvasCommands | HistoryLayerCommands;

class CommandHistory {
  redoStack: Command[] = [];

  subscriptions: Subscription[] = [];

  constructor({ drawCommand$, layerCommand$ }: CommandHistoryProps) {
    this.subscriptions.push(
      merge(drawCommand$, layerCommand$).subscribe({
        next: (command) => {
          console.log(command);
          this.redoStack.push(command);
        }
      })
    );
  }

  cleanUp(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}

export default CommandHistory;
