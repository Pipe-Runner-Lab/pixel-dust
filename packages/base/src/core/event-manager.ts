import { fromEvent, Observable, concat } from 'rxjs';
import {
  switchMap,
  filter,
  takeUntil,
  tap,
  map,
  first,
  takeWhile,
  finalize,
  mapTo
} from 'rxjs/operators';

type EventManagerProps = {
  canvasContainerElement: HTMLDivElement;
  stage: HTMLDivElement;
};

class EventManager {
  targetElement: HTMLDivElement;

  containerElement: HTMLDivElement;

  canvasMoveCache = {
    prevX: 0,
    prevY: 0,
    initX: 0,
    initY: 0,
    isMoving: false
  };

  canvasScaleCache = {
    scale: 1
  };

  canvasMove$: Observable<{
    x: number;
    y: number;
  }>;

  canvasDraw$: Observable<{
    x: number;
    y: number;
  }>;

  canvasPreview$: Observable<{
    x: number;
    y: number;
  }>;

  canvasScale$: Observable<{
    scale: number;
  }>;

  undoStream$: Observable<void>;

  constructor(options: EventManagerProps) {
    this.targetElement = options.canvasContainerElement;
    this.containerElement = options.stage;

    const mouseDown$ = fromEvent<MouseEvent>(this.targetElement, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(this.targetElement, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(window, 'mouseup');
    const mouseLeave$ = fromEvent<MouseEvent>(this.targetElement, 'mouseleave');

    const wheel$ = fromEvent<WheelEvent>(this.containerElement, 'wheel').pipe(
      tap((event: WheelEvent) => {
        event.preventDefault();
      })
    );

    const spaceKeyDown$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
      filter((event: KeyboardEvent) => event.code === 'Space')
    );
    const spaceKeyUp$ = fromEvent<KeyboardEvent>(window, 'keyup').pipe(
      filter((event: KeyboardEvent) => event.code === 'Space')
    );

    const ctrlKeyDown$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
      filter((event: KeyboardEvent) => event.code === 'ControlLeft')
    );
    const ctrlKeyUp$ = fromEvent<KeyboardEvent>(window, 'keyup').pipe(
      filter((event: KeyboardEvent) => event.code === 'ControlLeft')
    );

    const zKeyDown$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
      filter((event: KeyboardEvent) => event.code === 'KeyZ')
    );

    this.canvasMove$ = spaceKeyDown$.pipe(
      first(),
      tap(() => {
        this.canvasMoveCache.isMoving = true;
        options.canvasContainerElement.style.setProperty('cursor', 'grab');
      }),
      switchMap(() => {
        return concat(
          mouseDown$.pipe(
            first(),
            tap((event: MouseEvent) => {
              const { x, y } = event;
              this.canvasMoveCache.prevX = x;
              this.canvasMoveCache.prevY = y;
            })
          ),
          mouseMove$
        );
      }),
      map((event: MouseEvent) => {
        const { x, y } = event;
        const { prevX, prevY, initX, initY } = this.canvasMoveCache;
        const nextX = x - prevX + initX;
        const nextY = y - prevY + initY;

        this.canvasMoveCache.prevX = x;
        this.canvasMoveCache.prevY = y;
        this.canvasMoveCache.initX = nextX;
        this.canvasMoveCache.initY = nextY;

        return {
          x: nextX,
          y: nextY
        };
      }),
      takeUntil(spaceKeyUp$),
      takeUntil(mouseUp$),
      finalize(() => {
        this.canvasMoveCache.isMoving = false;
        options.canvasContainerElement.style.setProperty('cursor', 'unset');
      })
    );

    this.canvasScale$ = wheel$.pipe(
      filter((event: WheelEvent) => event.ctrlKey),
      map((event) => {
        const prevScale = this.canvasScaleCache.scale;

        if (event.deltaY < 0) {
          if (prevScale >= 2) {
            return this.canvasScaleCache;
          }

          this.canvasScaleCache = {
            scale: prevScale + 0.1
          };

          return this.canvasScaleCache;
        }

        if (prevScale <= 0.7) {
          return this.canvasScaleCache;
        }

        this.canvasScaleCache = {
          scale: prevScale - 0.1
        };

        return this.canvasScaleCache;
      })
    );

    this.canvasDraw$ = concat(mouseDown$.pipe(first()), mouseMove$).pipe(
      takeWhile(() => !this.canvasMoveCache.isMoving),
      takeUntil(mouseUp$),
      map((event: MouseEvent) => ({ x: event.offsetX, y: event.offsetY }))
    );

    this.canvasPreview$ = mouseMove$.pipe(
      takeUntil(mouseLeave$),
      map((event: MouseEvent) => {
        return { x: event.offsetX, y: event.offsetY };
      })
    );

    this.undoStream$ = ctrlKeyDown$.pipe(
      switchMap(() => zKeyDown$),
      mapTo(undefined),
      takeUntil(ctrlKeyUp$)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for event manager called');
  }
}

export default EventManager;
