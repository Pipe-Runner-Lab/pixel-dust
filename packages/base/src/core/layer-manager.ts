import { v4 as uuidv4 } from 'uuid';
import PixelCanvas from '../canvas/pixel-canvas';
import {
  LayerMetaData,
  CanvasType,
  LayerCommands,
  LayerCommandType,
  HistoryLayerCommands
} from '../types/types';

export type Layer = {
  pixelCanvas: PixelCanvas;
  uuid: string;
  imagePreview?: string;
  hidden: boolean;
};

type LayerManagerProps = {
  canvasContainerElement: HTMLDivElement;
  dimension: number;
  canvasType: CanvasType;
};

class LayerManager {
  layerStack: Layer[];

  dimension: number;

  canvasType: CanvasType;

  canvasLayerWrapperElement: HTMLDivElement;

  activeLayer: Layer | null = null;

  layerStackUpdateCB: undefined | ((arg: LayerMetaData[]) => void) = undefined;

  activeLayerUpdateCB: undefined | ((arg: LayerMetaData | null) => void) = undefined;

  constructor(options: LayerManagerProps) {
    this.layerStack = [];
    this.dimension = options.dimension;
    this.canvasType = options.canvasType;

    this.canvasLayerWrapperElement = document.createElement('div');
    this.canvasLayerWrapperElement.classList.add('canvas-layer-wrapper');

    options.canvasContainerElement.appendChild(this.canvasLayerWrapperElement);
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for layer manager called');
  }

  setActiveLayer(arg: { uuid: string } | null): void {
    if (arg) {
      const filterOutput = this.layerStack.filter((layer) => layer.uuid === arg.uuid);

      if (filterOutput.length > 1) {
        throw Error('uuid matches more than one layer');
      } else if (filterOutput.length < 1) {
        throw Error('uuid does not match any layer');
      } else {
        const [layer] = filterOutput;
        this.activeLayer = layer;
      }
    } else {
      this.activeLayer = null;
    }

    if (this.activeLayerUpdateCB) this.activeLayerUpdateCB(this.activeLayer);
  }

  getActiveLayer(): Layer | null {
    return this.activeLayer;
  }

  getActiveLayerUUID(): string | null {
    return this.activeLayer?.uuid ?? null;
  }

  addLayerAfter(arg?: { uuid?: string }): Layer {
    if (!arg?.uuid) {
      const uuid = uuidv4();
      const layer = {
        pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
        uuid,
        hidden: false
      };
      this.canvasLayerWrapperElement.appendChild(layer.pixelCanvas.canvas);
      this.layerStack.push(layer);

      if (this.layerStackUpdateCB)
        this.layerStackUpdateCB(
          this.layerStack.map((_layer) => ({
            uuid: _layer.uuid,
            imagePreview: _layer.imagePreview,
            hidden: _layer.hidden
          }))
        );

      return layer;
    }

    // TODO: If uuid provided
    const uuid = uuidv4();
    const layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid,
      hidden: false
    };
    this.layerStack.push(layer);
    return layer;
  }

  hideLayer(arg: { uuid: string }): void {
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer) {
      layer.hidden = true;
      layer.pixelCanvas.canvas.style.setProperty('opacity', '0');
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );
  }

  showLayer(arg: { uuid: string }): void {
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer) {
      layer.hidden = false;
      layer.pixelCanvas.canvas.style.setProperty('opacity', '1');
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );
  }

  addLayerBefore(arg: { uuid: string }): Layer {
    console.log(arg);
    const uuid = uuidv4();
    const layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid,
      hidden: false
    };

    for (let idx = 0, { length } = this.layerStack; idx < length; idx += 1) {
      if (this.layerStack[idx].uuid === arg.uuid) {
        this.canvasLayerWrapperElement.insertBefore(
          layer.pixelCanvas.canvas,
          this.layerStack[idx].pixelCanvas.canvas
        );
        this.layerStack.splice(idx, 0, layer);
        break;
      }
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );

    return layer;
  }

  deleteLayer(arg: { uuid: string }): void {
    const [selectedLayer, ...rest] = this.layerStack.filter((layer) => layer.uuid === arg.uuid);
    if (rest.length > 0) {
      throw Error('uuid matches more than one layer');
    }
    if (!selectedLayer) {
      throw Error('uuid does not match any layer');
    }
    this.canvasLayerWrapperElement.removeChild(selectedLayer.pixelCanvas.canvas);
    this.layerStack = this.layerStack.filter((layer) => layer.uuid !== selectedLayer.uuid);

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );

    this.setActiveLayer(null);
  }

  insertLayerBefore(arg: { destinationUuid: string; uuid: string }): void {
    const destinationLayer = this.layerStack.find((_layer) => _layer.uuid === arg.destinationUuid);
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer && destinationLayer) {
      const filteredLayerStack = this.layerStack.filter((_layer) => _layer.uuid !== arg.uuid);

      for (let idx = 0, { length } = filteredLayerStack; idx < length; idx += 1) {
        if (filteredLayerStack[idx].uuid === arg.destinationUuid) {
          filteredLayerStack.splice(idx, 0, layer);

          this.layerStack = filteredLayerStack;

          this.canvasLayerWrapperElement.insertBefore(
            layer.pixelCanvas.canvas,
            destinationLayer.pixelCanvas.canvas
          );
          break;
        }
      }

      if (this.layerStackUpdateCB)
        this.layerStackUpdateCB(
          this.layerStack.map((_layer) => ({
            uuid: _layer.uuid,
            imagePreview: _layer.imagePreview,
            hidden: _layer.hidden
          }))
        );
    }
  }

  insertLayerAfter(arg: { destinationUuid: string; uuid: string }): void {
    const destinationLayer = this.layerStack.find((_layer) => _layer.uuid === arg.destinationUuid);
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer && destinationLayer) {
      const filteredLayerStack = this.layerStack.filter((_layer) => _layer.uuid !== arg.uuid);

      for (let idx = 0, { length } = filteredLayerStack; idx < length; idx += 1) {
        if (filteredLayerStack[idx].uuid === arg.destinationUuid) {
          if (idx === filteredLayerStack.length - 1) {
            filteredLayerStack.push(layer);
          } else {
            filteredLayerStack.splice(idx + 1, 0, layer);
          }

          this.layerStack = filteredLayerStack;

          this.canvasLayerWrapperElement.insertBefore(
            layer.pixelCanvas.canvas,
            destinationLayer.pixelCanvas.canvas.nextSibling
          );
          break;
        }
      }

      if (this.layerStackUpdateCB)
        this.layerStackUpdateCB(
          this.layerStack.map((_layer) => ({
            uuid: _layer.uuid,
            imagePreview: _layer.imagePreview,
            hidden: _layer.hidden
          }))
        );
    }
  }

  execute(command: LayerCommands): HistoryLayerCommands {
    switch (command.type) {
      case LayerCommandType.ADD_AFTER: {
        const { uuid: generatedUuid } = this.addLayerAfter({
          uuid: command.uuid
        });
        return { ...command, generatedUuid };
      }
      case LayerCommandType.ADD_BEFORE: {
        console.log(command);
        const { uuid: generatedUuid } = this.addLayerBefore({
          uuid: command.uuid
        });
        return { ...command, generatedUuid };
      }
      case LayerCommandType.DELETE: {
        this.deleteLayer({ uuid: command.uuid });
        return command;
      }
      case LayerCommandType.HIDE: {
        this.hideLayer({ uuid: command.uuid });
        return command;
      }
      case LayerCommandType.SHOW: {
        this.showLayer({ uuid: command.uuid });
        return command;
      }
      case LayerCommandType.INSERT_AFTER: {
        this.insertLayerAfter({
          uuid: command.uuid,
          destinationUuid: command.destinationUuid
        });
        return command;
      }
      case LayerCommandType.INSERT_BEFORE: {
        this.insertLayerBefore({
          uuid: command.uuid,
          destinationUuid: command.destinationUuid
        });
        return command;
      }
      default:
        throw new Error('Layer command not supported');
    }
  }

  async updateLayerPreview(uuid: string): Promise<void> {
    const layer = this.layerStack.find((_layer) => _layer.uuid === uuid);

    if (layer) {
      const blob = await layer.pixelCanvas.getCanvasBlob();
      layer.imagePreview = URL.createObjectURL(blob);
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );
  }

  async exportImage(name = 'my-project', format = 'img/png'): Promise<void> {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.height = this.dimension;
    exportCanvas.width = this.dimension;

    const ctx = exportCanvas.getContext('2d');
    this.layerStack.forEach((layer) => {
      if(!layer.hidden)
      ctx?.drawImage(layer.pixelCanvas.canvas, 0, 0, this.dimension, this.dimension);
    });

    const generateBlob = new Promise((resolve) => {
      exportCanvas.toBlob((blob) => {
        resolve(blob);
      }, format);
    });

    const blob = await generateBlob;

    const imageUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('download', name);
    a.setAttribute('href', imageUrl);
    a.click();
  }
}

export default LayerManager;
