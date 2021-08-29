import React, { useCallback, useRef, useState } from 'react';
import { InstrumentType, LayerMetaData } from '@pixel-dust/base';
import { PixelDust } from '@pixel-dust/react';
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
  const pixelDustRef = useRef<PixelDust>(null);

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
      pixelDustRef.current?.pixelDustApi?.addLayerAfter(arg);
    },
    [pixelDustRef]
  );

  const addLayerBeforeOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustRef.current?.pixelDustApi?.addLayerBefore(arg);
    },
    [pixelDustRef]
  );

  const setActiveLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustRef.current?.pixelDustApi?.setActiveLayer(arg);
    },
    [pixelDustRef]
  );

  const deleteLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustRef.current?.pixelDustApi?.deleteLayer(arg);
    },
    [pixelDustRef]
  );

  const hideLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustRef.current?.pixelDustApi?.hideLayer(arg);
    },
    [pixelDustRef]
  );

  const showLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustRef.current?.pixelDustApi?.showLayer(arg);
    },
    [pixelDustRef]
  );

  const insertLayerAfterOnEngine = useCallback(
    (arg: { uuid: string; destinationUuid: string }): void => {
      pixelDustRef.current?.pixelDustApi?.insertLayerAfter(arg);
    },
    [pixelDustRef]
  );

  const insertLayerBeforeOnEngine = useCallback(
    (arg: { uuid: string; destinationUuid: string }): void => {
      pixelDustRef.current?.pixelDustApi?.insertLayerBefore(arg);
    },
    [pixelDustRef]
  );

  const exportFromEngine = useCallback(async () => {
    return pixelDustRef.current?.pixelDustApi?.export();
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
        <PixelDust
          ref={pixelDustRef}
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
