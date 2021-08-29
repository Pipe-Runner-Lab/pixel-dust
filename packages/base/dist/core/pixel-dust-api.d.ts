import PixelDustEngine from './pixel-dust-engine';
import { LayerMetaData, CanvasType, InstrumentType } from '../types/types';
declare type PixelDustApiProps = {
    mountTarget: HTMLDivElement;
    dimension?: number;
    canvasType?: CanvasType;
    initializeWithLayer?: boolean;
    layerStackUpdateCB?: (layerStack: LayerMetaData[]) => void;
    activeLayerUpdateCB?: (layerStack: LayerMetaData | null) => void;
};
declare class PixelDustApi {
    pixelDustEngine: PixelDustEngine;
    constructor({ mountTarget, dimension, layerStackUpdateCB, activeLayerUpdateCB, canvasType, initializeWithLayer }: PixelDustApiProps);
    cleanUp(): void;
    setForegroundColor(color: string): void;
    setBackgroundColor(color: string): void;
    setInstrumentType(instrument: InstrumentType): void;
    addLayerAfter(arg?: {
        uuid?: string;
    }): void;
    addLayerBefore(arg: {
        uuid: string;
    }): void;
    hideLayer(arg: {
        uuid: string;
    }): void;
    showLayer(arg: {
        uuid: string;
    }): void;
    setActiveLayer(arg: {
        uuid: string;
    }): void;
    deleteLayer(arg: {
        uuid: string;
    }): void;
    insertLayerAfter(arg: {
        uuid: string;
        destinationUuid: string;
    }): void;
    insertLayerBefore(arg: {
        uuid: string;
        destinationUuid: string;
    }): void;
    export(): Promise<void>;
}
export { CanvasType, InstrumentType };
export type { LayerMetaData };
export default PixelDustApi;
//# sourceMappingURL=pixel-dust-api.d.ts.map