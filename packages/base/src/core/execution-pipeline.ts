import { Subscription } from 'rxjs';
import {
  map,
  filter,
  tap,
  finalize,
  repeat,
  share,
  reduce,
  groupBy,
  switchMap
} from 'rxjs/operators';
import CommandGenerator from './command-generator';
import LayerManager from './layer-manager';
import { HistoryCanvasCommands, InstrumentType } from '../types/types';
import CommandHistory from './command-history';
import PreviewCanvas from '../canvas/preview-canvas';

type ExecutionPipelineProps = {
  layerManager: LayerManager;
  commandGenerator: CommandGenerator;
  previewCanvas: PreviewCanvas;
};

class ExecutionPipeline {
  layerManager: LayerManager;

  previewCanvas: PreviewCanvas;

  commandGenerator: CommandGenerator;

  commandHistory: CommandHistory;

  subscriptions: Subscription[] = [];

  constructor(options: ExecutionPipelineProps) {
    this.layerManager = options.layerManager;
    this.commandGenerator = options.commandGenerator;
    this.previewCanvas = options.previewCanvas;

    this.subscriptions.push(
      this.commandGenerator.previewCanvasCommand$
        .pipe(
          finalize(() => {
            this.previewCanvas.refresh();
          }),
          repeat()
        )
        .subscribe({
          next: (command) => {
            this.previewCanvas.preview(command);
          }
        })
    );

    const drawCommand$ = this.commandGenerator.canvasCommand$.pipe(
      filter(() => !!this.layerManager.activeLayer),
      map((command) => {
        if (!this.layerManager.activeLayer?.uuid) {
          throw new Error('Active layer needed to store history');
        }

        return {
          ...command,
          activeLayerUuid: this.layerManager.activeLayer?.uuid
        };
      }),
      tap((command) => {
        this.layerManager.activeLayer?.pixelCanvas.execute(command);
      }),
      groupBy((command) => command.instrument),
      switchMap((command$) =>
        command$.pipe(
          reduce(
            (acc: HistoryCanvasCommands, command) => {
              if (command.instrument === InstrumentType.PEN) {
                acc.color = command.color;
              }

              acc.instrument = command.instrument;
              acc.activeLayerUuid = command.activeLayerUuid;
              acc.cartesianArray.push({ x: command.x, y: command.y });
              return acc;
            },
            {
              instrument: InstrumentType.PEN,
              color: undefined,
              activeLayerUuid: '',
              cartesianArray: []
            }
          )
        )
      ),
      repeat(),
      share()
    );

    const layerCommand$ = this.commandGenerator.layerCommand$.pipe(
      map((command) => this.layerManager.execute(command))
    );

    this.commandHistory = new CommandHistory({
      drawCommand$,
      layerCommand$
    });

    this.subscriptions.push(
      drawCommand$.subscribe({
        next: (command) => {
          this.layerManager.updateLayerPreview(command.activeLayerUuid);
        }
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  undo(count = 1): void {
    // find out type of command
    const numberOfCommands = this.commandHistory.redoStack.length;
    if (numberOfCommands >= 1) {
      const lastCommand = this.commandHistory.redoStack[numberOfCommands - 1];
      console.log(lastCommand);
    } else {
      throw Error('Undo cannot be performed');
    }
  }

  cleanUp(): void {
    this.commandHistory.cleanUp();

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}

export default ExecutionPipeline;
