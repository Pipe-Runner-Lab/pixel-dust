import PixelCanvas from '../canvas/pixel-canvas';
import { LayerMetaData, CanvasType, LayerCommands, HistoryLayerCommands } from '../types/types';
export declare type Layer = {
    pixelCanvas: PixelCanvas;
    uuid: string;
    imagePreview?: string;
    hidden: boolean;
};
declare type LayerManagerProps = {
    canvasContainerElement: HTMLDivElement;
    dimension: number;
    canvasType: CanvasType;
};
declare class LayerManager {
    layerStack: Layer[];
    dimension: number;
    canvasType: CanvasType;
    canvasLayerWrapperElement: HTMLDivElement;
    activeLayer: Layer | null;
    layerStackUpdateCB: undefined | ((arg: LayerMetaData[]) => void);
    activeLayerUpdateCB: undefined | ((arg: LayerMetaData | null) => void);
    constructor(options: LayerManagerProps);
    cleanUp(): void;
    setActiveLayer(arg: {
        uuid: string;
    } | null): void;
    getActiveLayer(): Layer | null;
    getActiveLayerUUID(): string | null;
    addLayerAfter(arg?: {
        uuid?: string;
    }): Layer;
    hideLayer(arg: {
        uuid: string;
    }): void;
    showLayer(arg: {
        uuid: string;
    }): void;
    addLayerBefore(arg: {
        uuid: string;
    }): Layer;
    deleteLayer(arg: {
        uuid: string;
    }): void;
    insertLayerBefore(arg: {
        destinationUuid: string;
        uuid: string;
    }): void;
    insertLayerAfter(arg: {
        destinationUuid: string;
        uuid: string;
    }): void;
    execute(command: LayerCommands): HistoryLayerCommands;
    updateLayerPreview(uuid: string): Promise<void>;
    exportImage(name?: string, format?: string): Promise<void>;
}
export default LayerManager;
//# sourceMappingURL=layer-manager.d.ts.map