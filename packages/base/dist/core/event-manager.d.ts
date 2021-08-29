import { Observable } from 'rxjs';
declare type EventManagerProps = {
    canvasContainerElement: HTMLDivElement;
    stage: HTMLDivElement;
};
declare class EventManager {
    targetElement: HTMLDivElement;
    containerElement: HTMLDivElement;
    canvasMoveCache: {
        prevX: number;
        prevY: number;
        initX: number;
        initY: number;
        isMoving: boolean;
    };
    canvasScaleCache: {
        scale: number;
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
    constructor(options: EventManagerProps);
    cleanUp(): void;
}
export default EventManager;
//# sourceMappingURL=event-manager.d.ts.map