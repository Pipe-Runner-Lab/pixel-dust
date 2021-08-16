import { Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import {
  CanvasType,
  PenCommand,
  PixelSquareCommand,
  EraserCommand,
  InstrumentType,
  CanvasCommands,
  LayerCommands
} from '../types/types';

type CommandGeneratorProps = {
  drawStream: Observable<{
    x: number;
    y: number;
  }>;
  previewStream: Observable<{ x: number; y: number }>;
  dimension: number;
  canvasType: CanvasType;
};
class CommandGenerator {
  canvasCommand$: Observable<CanvasCommands>;

  previewCanvasCommand$: Observable<CanvasCommands>;

  layerCommand$ = new Subject<LayerCommands>();

  drawingState = {
    foregroundColor: 'rgb(0, 0, 0, 1)',
    backgroundColor: 'rgb(255, 255, 255, 1)',
    instrument: InstrumentType.PEN
  };

  constructor(options: CommandGeneratorProps) {
    this.canvasCommand$ = options.drawStream.pipe(
      map(({ x, y }) => ({ u: x / options.dimension, v: y / options.dimension })),
      map(({ u, v }) => ({
        x: Math.floor(u * options.canvasType),
        y: Math.floor(v * options.canvasType)
      })),
      map(({ x, y }) => {
        switch (this.drawingState.instrument) {
          case InstrumentType.PEN:
            return {
              x,
              y,
              color: this.drawingState.foregroundColor,
              instrument: InstrumentType.PEN
            } as PenCommand;
          case InstrumentType.PIXEL_SQUARE:
            return {
              x,
              y,
              color: this.drawingState.foregroundColor,
              instrument: InstrumentType.PIXEL_SQUARE
            } as PixelSquareCommand;
          case InstrumentType.ERASER:
            return {
              x,
              y,
              instrument: InstrumentType.ERASER
            } as EraserCommand;
          default:
            throw new Error('Draw command not supported');
        }
      }),
      distinctUntilChanged((prev, curr) => {
        if (prev && curr) {
          if (prev.x !== curr.x || prev.y !== curr.y || prev.instrument !== curr.instrument) {
            return false;
          }
          if ((prev as PenCommand).color && (curr as PenCommand).color) {
            if ((prev as PenCommand).color !== (curr as PenCommand).color) {
              return false;
            }
            return true;
          }
        }
        return true;
      })
    );

    this.previewCanvasCommand$ = options.previewStream.pipe(
      map(({ x, y }) => ({ u: x / options.dimension, v: y / options.dimension })),
      map(({ u, v }) => ({
        x: Math.floor(u * options.canvasType),
        y: Math.floor(v * options.canvasType)
      })),
      map(({ x, y }) => {
        switch (this.drawingState.instrument) {
          case InstrumentType.PEN:
            return {
              x,
              y,
              color: this.drawingState.foregroundColor,
              instrument: InstrumentType.PEN
            } as PenCommand;
          case InstrumentType.PIXEL_SQUARE:
            return {
              x,
              y,
              color: this.drawingState.foregroundColor,
              instrument: InstrumentType.PIXEL_SQUARE
            } as PixelSquareCommand;
          case InstrumentType.ERASER:
            return {
              x,
              y,
              instrument: InstrumentType.ERASER
            } as EraserCommand;
          default:
            throw new Error('Preview command not supported');
        }
      }),
      distinctUntilChanged((prev, curr) => {
        if (prev && curr) {
          if (prev.x !== curr.x || prev.y !== curr.y || prev.instrument !== curr.instrument) {
            return false;
          }
          if ((prev as PenCommand).color && (curr as PenCommand).color) {
            if ((prev as PenCommand).color !== (curr as PenCommand).color) {
              return false;
            }
            return true;
          }
        }
        return true;
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for command generator called');
  }
}

export default CommandGenerator;
