import React, { useCallback, useRef, useState } from 'react';
import { PixelDust } from '@pixel-dust/react';
import { InstrumentType, LayerMetaData } from '@pixel-dust/base';
import ToolBox from 'components/ToolBox';
import LayerBox from 'components/LayerBox';
import {
  DrawingBoardContainer,
  CanvasWrapper,
  ToolBoxWrapper,
  LayerBoxWrapper
  // LoadingContainer
} from './DrawingBoard.styles';

function DrawingBoard(): JSX.Element {
  const pixelDustReactRef = useRef<PixelDust>(null);

  const [activeInstrument, setActiveInstrument] = useState<InstrumentType>(InstrumentType.PEN);
  const [activeForegroundRGBA, setActiveForegroundRGBA] = useState<string>('#000000');
  const [activeBackgroundRGBA, setActiveBackgroundRGBA] = useState<string>('#ffffff');

  const [layerStack, setLayerStack] = useState<LayerMetaData[]>([]);
  const [activeLayer, setActiveLayer] = useState<LayerMetaData | null>(null);

  const onLayerStackChange = useCallback((_layerStack: LayerMetaData[]): void => {
    setLayerStack([..._layerStack].reverse());
  }, []);
  const onActiveLayerChange = useCallback((_activeLayer: LayerMetaData | null): void => {
    setActiveLayer(_activeLayer);
  }, []);

  const addLayerAfterOnEngine = useCallback(
    (arg?: { uuid?: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.addLayerAfter(arg);
    },
    [pixelDustReactRef]
  );

  const addLayerBeforeOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.addLayerBefore(arg);
    },
    [pixelDustReactRef]
  );

  const setActiveLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.setActiveLayer(arg);
    },
    [pixelDustReactRef]
  );

  const deleteLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.deleteLayer(arg);
    },
    [pixelDustReactRef]
  );

  const hideLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.hideLayer(arg);
    },
    [pixelDustReactRef]
  );

  const showLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.showLayer(arg);
    },
    [pixelDustReactRef]
  );

  const insertLayerAfterOnEngine = useCallback(
    (arg: { uuid: string; destinationUuid: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.insertLayerAfter(arg);
    },
    [pixelDustReactRef]
  );

  const insertLayerBeforeOnEngine = useCallback(
    (arg: { uuid: string; destinationUuid: string }): void => {
      pixelDustReactRef.current?.pixelDustApi?.insertLayerBefore(arg);
    },
    [pixelDustReactRef]
  );

  const exportFromEngine = useCallback(async () => {
    return pixelDustReactRef.current?.pixelDustApi?.export();
  }, []);

  // if (!draftData) {
  //   return (
  //     <LoadingContainer>
  //       <Spinner />
  //       <div>Loading your draft...</div>
  //     </LoadingContainer>
  //   );
  // }

  return (
    <DrawingBoardContainer>
      <ToolBoxWrapper>
        <ToolBox
          instrument={activeInstrument}
          onChangeInstrument={setActiveInstrument}
          onChangeForegroundColor={setActiveForegroundRGBA}
          onChangeBackgroundColor={setActiveBackgroundRGBA}
          onExport={exportFromEngine}
        />
      </ToolBoxWrapper>
      <CanvasWrapper>
        <PixelDustReact
          ref={pixelDustReactRef}
          instrument={activeInstrument}
          foregroundColor={activeForegroundRGBA}
          backgroundColor={activeBackgroundRGBA}
          onLayerStackChange={onLayerStackChange}
          onActiveLayerChange={onActiveLayerChange}
        />
      </CanvasWrapper>
      <LayerBoxWrapper>
        <LayerBox
          addLayerBefore={addLayerBeforeOnEngine}
          addLayerAfter={addLayerAfterOnEngine}
          setActiveLayer={setActiveLayerOnEngine}
          deleteLayer={deleteLayerOnEngine}
          layerStack={layerStack}
          activeLayer={activeLayer}
          hideLayer={hideLayerOnEngine}
          showLayer={showLayerOnEngine}
          insertLayerAfter={insertLayerAfterOnEngine}
          insertLayerBefore={insertLayerBeforeOnEngine}
        />
      </LayerBoxWrapper>
    </DrawingBoardContainer>
  );
}

export default DrawingBoard;
