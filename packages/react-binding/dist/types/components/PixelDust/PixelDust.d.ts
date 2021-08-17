import React from 'react';
import PixelDustApi, { LayerMetaData, InstrumentType } from '@pixel-dust/base';
declare type PixelDustProps = {
    foregroundColor: string;
    backgroundColor: string;
    instrument: InstrumentType;
    onLayerStackChange: (layerStack: LayerMetaData[]) => void;
    onActiveLayerChange: (layer: LayerMetaData | null) => void;
};
declare type PixelDustState = Record<string, undefined>;
declare class PixelDust extends React.Component<PixelDustProps, PixelDustState> {
    pixelDustApi: PixelDustApi | undefined;
    constructor(props: PixelDustProps);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: PixelDustProps): boolean;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default PixelDust;
//# sourceMappingURL=PixelDust.d.ts.map