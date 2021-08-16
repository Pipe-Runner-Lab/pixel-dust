/** Pixel Canvas types */
export declare enum CanvasType {
    X50 = 50,
    X100 = 100,
    X200 = 200,
    X500 = 500
}
/** Layer Manager types */
export declare type LayerMetaData = {
    uuid: string;
    imagePreview?: string;
    hidden: boolean;
};
export declare enum LayerCommandType {
    ADD_AFTER = "ADD_AFTER",
    ADD_BEFORE = "ADD_BEFORE",
    DELETE = "DELETE",
    REARRANGE = "REARRANGE",
    HIDE = "HIDE",
    SHOW = "SHOW",
    INSERT_BEFORE = "INSERT_BEFORE",
    INSERT_AFTER = "INSERT_AFTER"
}
export declare type AddLayerAfter = {
    type: LayerCommandType.ADD_AFTER;
    uuid?: string;
};
export declare type AddLayerBefore = {
    type: LayerCommandType.ADD_BEFORE;
    uuid: string;
};
export declare type DeleteLayer = {
    type: LayerCommandType.DELETE;
    uuid: string;
};
export declare type HideLayer = {
    type: LayerCommandType.HIDE;
    uuid: string;
};
export declare type ShowLayer = {
    type: LayerCommandType.SHOW;
    uuid: string;
};
export declare type InsertLayerBefore = {
    type: LayerCommandType.INSERT_BEFORE;
    uuid: string;
    destinationUuid: string;
};
export declare type InsertLayerAfter = {
    type: LayerCommandType.INSERT_AFTER;
    uuid: string;
    destinationUuid: string;
};
export declare type LayerCommands = AddLayerAfter | AddLayerBefore | DeleteLayer | HideLayer | ShowLayer | InsertLayerBefore | InsertLayerAfter;
export declare type ExtendedAddLayerAfter = AddLayerAfter & {
    generatedUuid: string;
};
export declare type ExtendedAddLayerBefore = AddLayerBefore & {
    generatedUuid: string;
};
export declare type HistoryLayerCommands = ExtendedAddLayerAfter | ExtendedAddLayerBefore | DeleteLayer | HideLayer | ShowLayer | InsertLayerBefore | InsertLayerAfter;
/** Command Generator types */
export declare enum InstrumentType {
    PEN = "PEN",
    FILL = "FILL",
    ERASER = "ERASER",
    PIXEL_SQUARE = "PIXEL_SQUARE",
    PIXEL_CIRCLE = "PIXEL_CIRCLE",
    COLOR_PICKER = "COLOR_PICKER"
}
declare type BaseCommand = {
    x: number;
    y: number;
};
export declare type PenCommand = BaseCommand & {
    instrument: InstrumentType.PEN;
    color: string;
    size?: number;
};
export declare type PixelSquareCommand = BaseCommand & {
    instrument: InstrumentType.PIXEL_SQUARE;
    color: string;
    size?: number;
};
export declare type EraserCommand = BaseCommand & {
    instrument: InstrumentType.ERASER;
    size?: number;
};
export declare type CanvasCommands = PenCommand | EraserCommand | PixelSquareCommand;
/** Command History types */
export declare type HistoryCanvasCommands = {
    instrument: InstrumentType.PEN | InstrumentType.ERASER | InstrumentType.PIXEL_SQUARE;
    color: string | undefined;
    activeLayerUuid: string;
    cartesianArray: {
        x: number;
        y: number;
    }[];
};
export {};
//# sourceMappingURL=types.d.ts.map