import { Subscription } from 'rxjs';
import { repeat } from 'rxjs/operators';
import CommandGenerator from './command-generator';
import EventManager from './event-manager';
import ExecutionPipeline from './execution-pipeline';
import LayerManager from './layer-manager';
import { CanvasType } from '../types/types';
import GuideCanvas from '../canvas/guide-canvas';
import PreviewCanvas from '../canvas/preview-canvas';
import '../styles/pixel-dust.css';

type PixelDustEngineProps = {
  mountTarget: HTMLDivElement;
  dimension: number;
  initializeWithLayer?: true;
  canvasType: CanvasType;
};

class PixelDustEngine {
  guideCanvas: GuideCanvas | undefined;

  previewCanvas: PreviewCanvas | undefined;

  mountTarget: HTMLDivElement;

  stage: HTMLDivElement;

  pixelDustCanvasContainer: HTMLDivElement;

  eventManager: EventManager;

  layerManager: LayerManager;

  commandGenerator: CommandGenerator;

  executionPipeline: ExecutionPipeline;

  subscriptions: Subscription[] = [];

  containerPosition = {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    height: 0,
    width: 0
  };

  computationCache = {
    containerX: 0,
    containerY: 0
  };

  constructor({ mountTarget, dimension, canvasType }: PixelDustEngineProps) {
    this.mountTarget = mountTarget;

    // Create stage (area with gray background)
    this.stage = document.createElement('div');
    this.stage.classList.add('pixel-dust-stage');

    // Create canvas container (the white area also responsible for dealing with interaction events)
    this.pixelDustCanvasContainer = document.createElement('div');
    this.pixelDustCanvasContainer.classList.add('pixel-dust-canvas-container');
    this.pixelDustCanvasContainer.style.setProperty('height', `${dimension}px`);
    this.pixelDustCanvasContainer.style.setProperty('width', `${dimension}px`);

    // Add canvas container to stage
    this.stage.appendChild(this.pixelDustCanvasContainer);

    // Add stage to mount point
    this.mountTarget.appendChild(this.stage);

    // Initialize event manager for getting interaction streams
    this.eventManager = new EventManager({
      canvasContainerElement: this.pixelDustCanvasContainer,
      stage: this.stage
    });

    // Initialize layer manager for handling canvas layers and active layer
    this.layerManager = new LayerManager({
      canvasType,
      dimension,
      canvasContainerElement: this.pixelDustCanvasContainer
    });

    // Initialize command generator
    this.commandGenerator = new CommandGenerator({
      dimension,
      canvasType,
      drawStream: this.eventManager.canvasDraw$,
      previewStream: this.eventManager.canvasPreview$
    });

    this.guideCanvas = new GuideCanvas(canvasType, dimension, this.pixelDustCanvasContainer);
    this.previewCanvas = new PreviewCanvas(canvasType, dimension, this.pixelDustCanvasContainer);

    // Initialize execution pipeline
    this.executionPipeline = new ExecutionPipeline({
      layerManager: this.layerManager,
      commandGenerator: this.commandGenerator,
      previewCanvas: this.previewCanvas
    });

    // use event manager move stream to deal with canvas move
    this.subscriptions.push(
      this.eventManager.canvasMove$.pipe(repeat()).subscribe({
        next: (arg) => {
          const { x, y } = arg;
          this.pixelDustCanvasContainer?.style.setProperty('--stage-pos-x', String(x));
          this.pixelDustCanvasContainer?.style.setProperty('--stage-pos-y', String(y));
        },
        complete: () => {},
        error: (error) => console.error(error)
      })
    );

    // use event manager scroll stream to deal with canvas scale
    this.subscriptions.push(
      this.eventManager.canvasScale$.subscribe({
        next: (arg) => {
          this.pixelDustCanvasContainer?.style.setProperty('--stage-scale', String(arg.scale));
        },
        complete: () => {},
        error: (error) => console.error(error)
      })
    );

    // use event manager undo stream to deal with undo commands
    this.subscriptions.push(
      this.eventManager.undoStream$.subscribe({
        next: () => {
          this.executionPipeline.undo();
        },
        complete: () => {},
        error: (error) => console.error(error)
      })
    );
  }

  cleanUp(): void {
    this.layerManager?.cleanUp();
    this.commandGenerator?.cleanUp();
    this.executionPipeline?.cleanUp();
    this.eventManager?.cleanUp();

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.mountTarget.innerHTML = '';
  }
}

export default PixelDustEngine;
