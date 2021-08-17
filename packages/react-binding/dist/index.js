import React from 'react';
import { repeat, map, distinctUntilChanged, tap, filter, first, switchMap, takeUntil, finalize, takeWhile, mapTo, groupBy, reduce, share } from 'rxjs/operators';
import { Subject, fromEvent, concat, merge } from 'rxjs';
import { v4 } from 'uuid';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
/** Pixel Canvas types */


var CanvasType;

(function (CanvasType) {
  CanvasType[CanvasType["X50"] = 50] = "X50";
  CanvasType[CanvasType["X100"] = 100] = "X100";
  CanvasType[CanvasType["X200"] = 200] = "X200";
  CanvasType[CanvasType["X500"] = 500] = "X500";
})(CanvasType || (CanvasType = {}));

var LayerCommandType;

(function (LayerCommandType) {
  LayerCommandType["ADD_AFTER"] = "ADD_AFTER";
  LayerCommandType["ADD_BEFORE"] = "ADD_BEFORE";
  LayerCommandType["DELETE"] = "DELETE";
  LayerCommandType["REARRANGE"] = "REARRANGE";
  LayerCommandType["HIDE"] = "HIDE";
  LayerCommandType["SHOW"] = "SHOW";
  LayerCommandType["INSERT_BEFORE"] = "INSERT_BEFORE";
  LayerCommandType["INSERT_AFTER"] = "INSERT_AFTER";
})(LayerCommandType || (LayerCommandType = {}));
/** Command Generator types */


var InstrumentType;

(function (InstrumentType) {
  InstrumentType["PEN"] = "PEN";
  InstrumentType["FILL"] = "FILL";
  InstrumentType["ERASER"] = "ERASER";
  InstrumentType["PIXEL_SQUARE"] = "PIXEL_SQUARE";
  InstrumentType["PIXEL_CIRCLE"] = "PIXEL_CIRCLE";
  InstrumentType["COLOR_PICKER"] = "COLOR_PICKER";
})(InstrumentType || (InstrumentType = {}));

var CommandGenerator = function () {
  function CommandGenerator(options) {
    var _this = this;

    this.layerCommand$ = new Subject();
    this.drawingState = {
      foregroundColor: 'rgb(0, 0, 0, 1)',
      backgroundColor: 'rgb(255, 255, 255, 1)',
      instrument: InstrumentType.PEN
    };
    this.canvasCommand$ = options.drawStream.pipe(map(function (_a) {
      var x = _a.x,
          y = _a.y;
      return {
        u: x / options.dimension,
        v: y / options.dimension
      };
    }), map(function (_a) {
      var u = _a.u,
          v = _a.v;
      return {
        x: Math.floor(u * options.canvasType),
        y: Math.floor(v * options.canvasType)
      };
    }), map(function (_a) {
      var x = _a.x,
          y = _a.y;

      switch (_this.drawingState.instrument) {
        case InstrumentType.PEN:
          return {
            x: x,
            y: y,
            color: _this.drawingState.foregroundColor,
            instrument: InstrumentType.PEN
          };

        case InstrumentType.PIXEL_SQUARE:
          return {
            x: x,
            y: y,
            color: _this.drawingState.foregroundColor,
            instrument: InstrumentType.PIXEL_SQUARE
          };

        case InstrumentType.ERASER:
          return {
            x: x,
            y: y,
            instrument: InstrumentType.ERASER
          };

        default:
          throw new Error('Draw command not supported');
      }
    }), distinctUntilChanged(function (prev, curr) {
      if (prev && curr) {
        if (prev.x !== curr.x || prev.y !== curr.y || prev.instrument !== curr.instrument) {
          return false;
        }

        if (prev.color && curr.color) {
          if (prev.color !== curr.color) {
            return false;
          }

          return true;
        }
      }

      return true;
    }));
    this.previewCanvasCommand$ = options.previewStream.pipe(map(function (_a) {
      var x = _a.x,
          y = _a.y;
      return {
        u: x / options.dimension,
        v: y / options.dimension
      };
    }), map(function (_a) {
      var u = _a.u,
          v = _a.v;
      return {
        x: Math.floor(u * options.canvasType),
        y: Math.floor(v * options.canvasType)
      };
    }), map(function (_a) {
      var x = _a.x,
          y = _a.y;

      switch (_this.drawingState.instrument) {
        case InstrumentType.PEN:
          return {
            x: x,
            y: y,
            color: _this.drawingState.foregroundColor,
            instrument: InstrumentType.PEN
          };

        case InstrumentType.PIXEL_SQUARE:
          return {
            x: x,
            y: y,
            color: _this.drawingState.foregroundColor,
            instrument: InstrumentType.PIXEL_SQUARE
          };

        case InstrumentType.ERASER:
          return {
            x: x,
            y: y,
            instrument: InstrumentType.ERASER
          };

        default:
          throw new Error('Preview command not supported');
      }
    }), distinctUntilChanged(function (prev, curr) {
      if (prev && curr) {
        if (prev.x !== curr.x || prev.y !== curr.y || prev.instrument !== curr.instrument) {
          return false;
        }

        if (prev.color && curr.color) {
          if (prev.color !== curr.color) {
            return false;
          }

          return true;
        }
      }

      return true;
    }));
  } // eslint-disable-next-line class-methods-use-this


  CommandGenerator.prototype.cleanUp = function () {
    console.info('clean up for command generator called');
  };

  return CommandGenerator;
}();

var EventManager = function () {
  function EventManager(options) {
    var _this = this;

    this.canvasMoveCache = {
      prevX: 0,
      prevY: 0,
      initX: 0,
      initY: 0,
      isMoving: false
    };
    this.canvasScaleCache = {
      scale: 1
    };
    this.targetElement = options.canvasContainerElement;
    this.containerElement = options.stage;
    var mouseDown$ = fromEvent(this.targetElement, 'mousedown');
    var mouseMove$ = fromEvent(this.targetElement, 'mousemove');
    var mouseUp$ = fromEvent(window, 'mouseup');
    var mouseLeave$ = fromEvent(this.targetElement, 'mouseleave');
    var wheel$ = fromEvent(this.containerElement, 'wheel').pipe(tap(function (event) {
      event.preventDefault();
    }));
    var spaceKeyDown$ = fromEvent(window, 'keydown').pipe(filter(function (event) {
      return event.code === 'Space';
    }));
    var spaceKeyUp$ = fromEvent(window, 'keyup').pipe(filter(function (event) {
      return event.code === 'Space';
    }));
    var ctrlKeyDown$ = fromEvent(window, 'keydown').pipe(filter(function (event) {
      return event.code === 'ControlLeft';
    }));
    var ctrlKeyUp$ = fromEvent(window, 'keyup').pipe(filter(function (event) {
      return event.code === 'ControlLeft';
    }));
    var zKeyDown$ = fromEvent(window, 'keydown').pipe(filter(function (event) {
      return event.code === 'KeyZ';
    }));
    this.canvasMove$ = spaceKeyDown$.pipe(first(), tap(function () {
      _this.canvasMoveCache.isMoving = true;
      options.canvasContainerElement.style.setProperty('cursor', 'grab');
    }), switchMap(function () {
      return concat(mouseDown$.pipe(first(), tap(function (event) {
        var x = event.x,
            y = event.y;
        _this.canvasMoveCache.prevX = x;
        _this.canvasMoveCache.prevY = y;
      })), mouseMove$);
    }), map(function (event) {
      var x = event.x,
          y = event.y;
      var _a = _this.canvasMoveCache,
          prevX = _a.prevX,
          prevY = _a.prevY,
          initX = _a.initX,
          initY = _a.initY;
      var nextX = x - prevX + initX;
      var nextY = y - prevY + initY;
      _this.canvasMoveCache.prevX = x;
      _this.canvasMoveCache.prevY = y;
      _this.canvasMoveCache.initX = nextX;
      _this.canvasMoveCache.initY = nextY;
      return {
        x: nextX,
        y: nextY
      };
    }), takeUntil(spaceKeyUp$), takeUntil(mouseUp$), finalize(function () {
      _this.canvasMoveCache.isMoving = false;
      options.canvasContainerElement.style.setProperty('cursor', 'unset');
    }));
    this.canvasScale$ = wheel$.pipe(filter(function (event) {
      return event.ctrlKey;
    }), map(function (event) {
      var prevScale = _this.canvasScaleCache.scale;

      if (event.deltaY < 0) {
        if (prevScale >= 2) {
          return _this.canvasScaleCache;
        }

        _this.canvasScaleCache = {
          scale: prevScale + 0.1
        };
        return _this.canvasScaleCache;
      }

      if (prevScale <= 0.7) {
        return _this.canvasScaleCache;
      }

      _this.canvasScaleCache = {
        scale: prevScale - 0.1
      };
      return _this.canvasScaleCache;
    }));
    this.canvasDraw$ = concat(mouseDown$.pipe(first()), mouseMove$).pipe(takeWhile(function () {
      return !_this.canvasMoveCache.isMoving;
    }), takeUntil(mouseUp$), map(function (event) {
      return {
        x: event.offsetX,
        y: event.offsetY
      };
    }));
    this.canvasPreview$ = mouseMove$.pipe(takeUntil(mouseLeave$), map(function (event) {
      return {
        x: event.offsetX,
        y: event.offsetY
      };
    }));
    this.undoStream$ = ctrlKeyDown$.pipe(switchMap(function () {
      return zKeyDown$;
    }), mapTo(undefined), takeUntil(ctrlKeyUp$));
  } // eslint-disable-next-line class-methods-use-this


  EventManager.prototype.cleanUp = function () {
    console.info('clean up for event manager called');
  };

  return EventManager;
}();

var CommandHistory = function () {
  function CommandHistory(_a) {
    var _this = this;

    var drawCommand$ = _a.drawCommand$,
        layerCommand$ = _a.layerCommand$;
    this.redoStack = [];
    this.subscriptions = [];
    this.subscriptions.push(merge(drawCommand$, layerCommand$).subscribe({
      next: function (command) {
        console.log(command);

        _this.redoStack.push(command);
      }
    }));
  }

  CommandHistory.prototype.cleanUp = function () {
    this.subscriptions.forEach(function (subscription) {
      subscription.unsubscribe();
    });
  };

  return CommandHistory;
}();

var ExecutionPipeline = function () {
  function ExecutionPipeline(options) {
    var _this = this;

    this.subscriptions = [];
    this.layerManager = options.layerManager;
    this.commandGenerator = options.commandGenerator;
    this.previewCanvas = options.previewCanvas;
    this.subscriptions.push(this.commandGenerator.previewCanvasCommand$.pipe(finalize(function () {
      _this.previewCanvas.refresh();
    }), repeat()).subscribe({
      next: function (command) {
        _this.previewCanvas.preview(command);
      }
    }));
    var drawCommand$ = this.commandGenerator.canvasCommand$.pipe(filter(function () {
      return !!_this.layerManager.activeLayer;
    }), map(function (command) {
      var _a, _b;

      if (!((_a = _this.layerManager.activeLayer) === null || _a === void 0 ? void 0 : _a.uuid)) {
        throw new Error('Active layer needed to store history');
      }

      return __assign(__assign({}, command), {
        activeLayerUuid: (_b = _this.layerManager.activeLayer) === null || _b === void 0 ? void 0 : _b.uuid
      });
    }), tap(function (command) {
      var _a;

      (_a = _this.layerManager.activeLayer) === null || _a === void 0 ? void 0 : _a.pixelCanvas.execute(command);
    }), groupBy(function (command) {
      return command.instrument;
    }), switchMap(function (command$) {
      return command$.pipe(reduce(function (acc, command) {
        if (command.instrument === InstrumentType.PEN) {
          acc.color = command.color;
        }

        acc.instrument = command.instrument;
        acc.activeLayerUuid = command.activeLayerUuid;
        acc.cartesianArray.push({
          x: command.x,
          y: command.y
        });
        return acc;
      }, {
        instrument: InstrumentType.PEN,
        color: undefined,
        activeLayerUuid: '',
        cartesianArray: []
      }));
    }), repeat(), share());
    var layerCommand$ = this.commandGenerator.layerCommand$.pipe(map(function (command) {
      return _this.layerManager.execute(command);
    }));
    this.commandHistory = new CommandHistory({
      drawCommand$: drawCommand$,
      layerCommand$: layerCommand$
    });
    this.subscriptions.push(drawCommand$.subscribe({
      next: function (command) {
        _this.layerManager.updateLayerPreview(command.activeLayerUuid);
      }
    }));
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  ExecutionPipeline.prototype.undo = function (count) {
    // find out type of command
    var numberOfCommands = this.commandHistory.redoStack.length;

    if (numberOfCommands >= 1) {
      var lastCommand = this.commandHistory.redoStack[numberOfCommands - 1];
      console.log(lastCommand);
    } else {
      throw Error('Undo cannot be performed');
    }
  };

  ExecutionPipeline.prototype.cleanUp = function () {
    this.commandHistory.cleanUp();
    this.subscriptions.forEach(function (subscription) {
      subscription.unsubscribe();
    });
  };

  return ExecutionPipeline;
}();

var PixelCanvas = function () {
  function PixelCanvas(canvasType, dimension, uuid) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('pixel-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    this.canvas.setAttribute('id', uuid);
    var ctx = this.canvas.getContext('2d');

    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }
  }

  PixelCanvas.prototype.execute = function (command) {
    switch (command.instrument) {
      case InstrumentType.PEN:
        this.ctx.fillStyle = command.color;
        this.ctx.fillRect(Math.round(command.x * this.tileDimension), Math.round(command.y * this.tileDimension), this.tileDimension, this.tileDimension);
        break;

      case InstrumentType.PIXEL_SQUARE:
        this.ctx.fillStyle = command.color;
        this.ctx.fillRect(Math.round(command.x * this.tileDimension - 16), Math.round(command.y * this.tileDimension - 16), this.tileDimension * 5, this.tileDimension * 5);
        break;

      case InstrumentType.ERASER:
        this.ctx.clearRect(Math.round(command.x * this.tileDimension), Math.round(command.y * this.tileDimension), this.tileDimension, this.tileDimension);
        break;
    }
  };

  PixelCanvas.prototype.getCanvasBlob = function (type, quality) {
    var _this = this;

    return new Promise(function (resolve) {
      _this.canvas.toBlob(function (blob) {
        resolve(blob);
      }, type !== null && type !== void 0 ? type : 'img/png', quality);
    });
  };

  return PixelCanvas;
}();

var LayerManager = function () {
  function LayerManager(options) {
    this.activeLayer = null;
    this.layerStackUpdateCB = undefined;
    this.activeLayerUpdateCB = undefined;
    this.layerStack = [];
    this.dimension = options.dimension;
    this.canvasType = options.canvasType;
    this.canvasLayerWrapperElement = document.createElement('div');
    this.canvasLayerWrapperElement.classList.add('canvas-layer-wrapper');
    options.canvasContainerElement.appendChild(this.canvasLayerWrapperElement);
  } // eslint-disable-next-line class-methods-use-this


  LayerManager.prototype.cleanUp = function () {
    console.info('clean up for layer manager called');
  };

  LayerManager.prototype.setActiveLayer = function (arg) {
    if (arg) {
      var filterOutput = this.layerStack.filter(function (layer) {
        return layer.uuid === arg.uuid;
      });

      if (filterOutput.length > 1) {
        throw Error('uuid matches more than one layer');
      } else if (filterOutput.length < 1) {
        throw Error('uuid does not match any layer');
      } else {
        var layer = filterOutput[0];
        this.activeLayer = layer;
      }
    } else {
      this.activeLayer = null;
    }

    if (this.activeLayerUpdateCB) this.activeLayerUpdateCB(this.activeLayer);
  };

  LayerManager.prototype.getActiveLayer = function () {
    return this.activeLayer;
  };

  LayerManager.prototype.getActiveLayerUUID = function () {
    var _a, _b;

    return (_b = (_a = this.activeLayer) === null || _a === void 0 ? void 0 : _a.uuid) !== null && _b !== void 0 ? _b : null;
  };

  LayerManager.prototype.addLayerAfter = function (arg) {
    if (!(arg === null || arg === void 0 ? void 0 : arg.uuid)) {
      var uuid_1 = v4();
      var layer_1 = {
        pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid_1),
        uuid: uuid_1,
        hidden: false
      };
      this.canvasLayerWrapperElement.appendChild(layer_1.pixelCanvas.canvas);
      this.layerStack.push(layer_1);
      if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
        return {
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        };
      }));
      return layer_1;
    } // TODO: If uuid provided


    var uuid = v4();
    var layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid: uuid,
      hidden: false
    };
    this.layerStack.push(layer);
    return layer;
  };

  LayerManager.prototype.hideLayer = function (arg) {
    var layer = this.layerStack.find(function (_layer) {
      return _layer.uuid === arg.uuid;
    });

    if (layer) {
      layer.hidden = true;
      layer.pixelCanvas.canvas.style.setProperty('opacity', '0');
    }

    if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
      return {
        uuid: _layer.uuid,
        imagePreview: _layer.imagePreview,
        hidden: _layer.hidden
      };
    }));
  };

  LayerManager.prototype.showLayer = function (arg) {
    var layer = this.layerStack.find(function (_layer) {
      return _layer.uuid === arg.uuid;
    });

    if (layer) {
      layer.hidden = false;
      layer.pixelCanvas.canvas.style.setProperty('opacity', '1');
    }

    if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
      return {
        uuid: _layer.uuid,
        imagePreview: _layer.imagePreview,
        hidden: _layer.hidden
      };
    }));
  };

  LayerManager.prototype.addLayerBefore = function (arg) {
    console.log(arg);
    var uuid = v4();
    var layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid: uuid,
      hidden: false
    };

    for (var idx = 0, length_1 = this.layerStack.length; idx < length_1; idx += 1) {
      if (this.layerStack[idx].uuid === arg.uuid) {
        this.canvasLayerWrapperElement.insertBefore(layer.pixelCanvas.canvas, this.layerStack[idx].pixelCanvas.canvas);
        this.layerStack.splice(idx, 0, layer);
        break;
      }
    }

    if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
      return {
        uuid: _layer.uuid,
        imagePreview: _layer.imagePreview,
        hidden: _layer.hidden
      };
    }));
    return layer;
  };

  LayerManager.prototype.deleteLayer = function (arg) {
    var _a = this.layerStack.filter(function (layer) {
      return layer.uuid === arg.uuid;
    }),
        selectedLayer = _a[0],
        rest = _a.slice(1);

    if (rest.length > 0) {
      throw Error('uuid matches more than one layer');
    }

    if (!selectedLayer) {
      throw Error('uuid does not match any layer');
    }

    this.canvasLayerWrapperElement.removeChild(selectedLayer.pixelCanvas.canvas);
    this.layerStack = this.layerStack.filter(function (layer) {
      return layer.uuid !== selectedLayer.uuid;
    });
    if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
      return {
        uuid: _layer.uuid,
        imagePreview: _layer.imagePreview,
        hidden: _layer.hidden
      };
    }));
    this.setActiveLayer(null);
  };

  LayerManager.prototype.insertLayerBefore = function (arg) {
    var destinationLayer = this.layerStack.find(function (_layer) {
      return _layer.uuid === arg.destinationUuid;
    });
    var layer = this.layerStack.find(function (_layer) {
      return _layer.uuid === arg.uuid;
    });

    if (layer && destinationLayer) {
      var filteredLayerStack = this.layerStack.filter(function (_layer) {
        return _layer.uuid !== arg.uuid;
      });

      for (var idx = 0, length_2 = filteredLayerStack.length; idx < length_2; idx += 1) {
        if (filteredLayerStack[idx].uuid === arg.destinationUuid) {
          filteredLayerStack.splice(idx, 0, layer);
          this.layerStack = filteredLayerStack;
          this.canvasLayerWrapperElement.insertBefore(layer.pixelCanvas.canvas, destinationLayer.pixelCanvas.canvas);
          break;
        }
      }

      if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
        return {
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        };
      }));
    }
  };

  LayerManager.prototype.insertLayerAfter = function (arg) {
    var destinationLayer = this.layerStack.find(function (_layer) {
      return _layer.uuid === arg.destinationUuid;
    });
    var layer = this.layerStack.find(function (_layer) {
      return _layer.uuid === arg.uuid;
    });

    if (layer && destinationLayer) {
      var filteredLayerStack = this.layerStack.filter(function (_layer) {
        return _layer.uuid !== arg.uuid;
      });

      for (var idx = 0, length_3 = filteredLayerStack.length; idx < length_3; idx += 1) {
        if (filteredLayerStack[idx].uuid === arg.destinationUuid) {
          if (idx === filteredLayerStack.length - 1) {
            filteredLayerStack.push(layer);
          } else {
            filteredLayerStack.splice(idx + 1, 0, layer);
          }

          this.layerStack = filteredLayerStack;
          this.canvasLayerWrapperElement.insertBefore(layer.pixelCanvas.canvas, destinationLayer.pixelCanvas.canvas.nextSibling);
          break;
        }
      }

      if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
        return {
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        };
      }));
    }
  };

  LayerManager.prototype.execute = function (command) {
    switch (command.type) {
      case LayerCommandType.ADD_AFTER:
        {
          var generatedUuid = this.addLayerAfter({
            uuid: command.uuid
          }).uuid;
          return __assign(__assign({}, command), {
            generatedUuid: generatedUuid
          });
        }

      case LayerCommandType.ADD_BEFORE:
        {
          console.log(command);
          var generatedUuid = this.addLayerBefore({
            uuid: command.uuid
          }).uuid;
          return __assign(__assign({}, command), {
            generatedUuid: generatedUuid
          });
        }

      case LayerCommandType.DELETE:
        {
          this.deleteLayer({
            uuid: command.uuid
          });
          return command;
        }

      case LayerCommandType.HIDE:
        {
          this.hideLayer({
            uuid: command.uuid
          });
          return command;
        }

      case LayerCommandType.SHOW:
        {
          this.showLayer({
            uuid: command.uuid
          });
          return command;
        }

      case LayerCommandType.INSERT_AFTER:
        {
          this.insertLayerAfter({
            uuid: command.uuid,
            destinationUuid: command.destinationUuid
          });
          return command;
        }

      case LayerCommandType.INSERT_BEFORE:
        {
          this.insertLayerBefore({
            uuid: command.uuid,
            destinationUuid: command.destinationUuid
          });
          return command;
        }

      default:
        throw new Error('Layer command not supported');
    }
  };

  LayerManager.prototype.updateLayerPreview = function (uuid) {
    return __awaiter(this, void 0, void 0, function () {
      var layer, blob;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            layer = this.layerStack.find(function (_layer) {
              return _layer.uuid === uuid;
            });
            if (!layer) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , layer.pixelCanvas.getCanvasBlob()];

          case 1:
            blob = _a.sent();
            layer.imagePreview = URL.createObjectURL(blob);
            _a.label = 2;

          case 2:
            if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack.map(function (_layer) {
              return {
                uuid: _layer.uuid,
                imagePreview: _layer.imagePreview,
                hidden: _layer.hidden
              };
            }));
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  LayerManager.prototype.exportImage = function (name, format) {
    if (name === void 0) {
      name = 'my-project';
    }

    if (format === void 0) {
      format = 'img/png';
    }

    return __awaiter(this, void 0, void 0, function () {
      var exportCanvas, ctx, generateBlob, blob, imageUrl, a;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            exportCanvas = document.createElement('canvas');
            exportCanvas.height = this.dimension;
            exportCanvas.width = this.dimension;
            ctx = exportCanvas.getContext('2d');
            this.layerStack.forEach(function (layer) {
              ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(layer.pixelCanvas.canvas, 0, 0, _this.dimension, _this.dimension);
            });
            generateBlob = new Promise(function (resolve) {
              exportCanvas.toBlob(function (blob) {
                resolve(blob);
              }, format);
            });
            return [4
            /*yield*/
            , generateBlob];

          case 1:
            blob = _a.sent();
            imageUrl = URL.createObjectURL(blob);
            a = document.createElement('a');
            a.setAttribute('download', name);
            a.setAttribute('href', imageUrl);
            a.click();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return LayerManager;
}();

var GuideCanvas = function () {
  function GuideCanvas(canvasType, dimension, mountTarget) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas-guide');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    mountTarget.appendChild(this.canvas);
    var ctx = this.canvas.getContext('2d');

    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }

    this.drawGuideLines();
  }

  GuideCanvas.prototype.drawGuideLines = function () {
    this.ctx.strokeStyle = '#E9F1F1';
    this.ctx.lineWidth = 1;

    for (var i = this.tileDimension; i < this.canvas.width; i += this.tileDimension) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
      this.ctx.stroke();
    }

    for (var i = this.tileDimension; i < this.canvas.width; i += this.tileDimension) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.width);
      this.ctx.stroke();
    }
  };

  return GuideCanvas;
}();

var PreviewCanvas = function () {
  function PreviewCanvas(canvasType, dimension, mountTarget) {
    this.lastCommand = null;
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('preview-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    mountTarget.appendChild(this.canvas);
    var ctx = this.canvas.getContext('2d');

    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }
  }

  PreviewCanvas.prototype.preview = function (command) {
    this.refresh();
    this.lastCommand = command;

    switch (command.instrument) {
      case InstrumentType.PEN:
        this.ctx.fillStyle = command.color.replace(/[\d.]+\)$/g, '0.4)');
        this.ctx.fillRect(Math.round(command.x * this.tileDimension), Math.round(command.y * this.tileDimension), this.tileDimension, this.tileDimension);
        break;

      case InstrumentType.PIXEL_SQUARE:
        this.ctx.fillStyle = command.color.replace(/[\d.]+\)$/g, '0.4)');
        this.ctx.fillRect(Math.round(command.x * this.tileDimension - 16), Math.round(command.y * this.tileDimension - 16), this.tileDimension * 5, this.tileDimension * 5);
        break;

      case InstrumentType.ERASER:
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(Math.round(command.x * this.tileDimension), Math.round(command.y * this.tileDimension), this.tileDimension, this.tileDimension);
        break;
    }
  };

  PreviewCanvas.prototype.refresh = function () {
    var _a;

    switch ((_a = this.lastCommand) === null || _a === void 0 ? void 0 : _a.instrument) {
      case InstrumentType.PEN:
        this.ctx.clearRect(Math.round(this.lastCommand.x * this.tileDimension), Math.round(this.lastCommand.y * this.tileDimension), this.tileDimension, this.tileDimension);
        break;

      case InstrumentType.PIXEL_SQUARE:
        this.ctx.clearRect(Math.round(this.lastCommand.x * this.tileDimension - 16), Math.round(this.lastCommand.y * this.tileDimension - 16), this.tileDimension * 5, this.tileDimension * 5);
        break;

      case InstrumentType.ERASER:
        this.ctx.clearRect(Math.round(this.lastCommand.x * this.tileDimension), Math.round(this.lastCommand.y * this.tileDimension), this.tileDimension, this.tileDimension);
        break;
    }
  };

  return PreviewCanvas;
}();

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".pixel-dust-stage {\n  background-color: #444444;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.pixel-dust-canvas-container {\n  position: relative;\n  background-color: #ffffff;\n  --stage-scale: 1;\n  --stage-pos-x: 0;\n  --stage-pos-y: 0;\n  transform: translateX(calc(var(--stage-pos-x) * 1px)) translateY(calc(var(--stage-pos-y) * 1px))\n    scale(var(--stage-scale));\n  will-change: transform;\n}\n\n.pixel-canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.canvas-guide,\n.preview-canvas {\n  pointer-events: none;\n  position: absolute;\n}\n";
styleInject(css_248z);

var PixelDustEngine = function () {
  function PixelDustEngine(_a) {
    var _this = this;

    var mountTarget = _a.mountTarget,
        dimension = _a.dimension,
        canvasType = _a.canvasType;
    this.subscriptions = [];
    this.containerPosition = {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      height: 0,
      width: 0
    };
    this.computationCache = {
      containerX: 0,
      containerY: 0
    };
    this.mountTarget = mountTarget; // Create stage (area with gray background)

    this.stage = document.createElement('div');
    this.stage.classList.add('pixel-dust-stage'); // Create canvas container (the white area also responsible for dealing with interaction events)

    this.pixelDustCanvasContainer = document.createElement('div');
    this.pixelDustCanvasContainer.classList.add('pixel-dust-canvas-container');
    this.pixelDustCanvasContainer.style.setProperty('height', dimension + "px");
    this.pixelDustCanvasContainer.style.setProperty('width', dimension + "px"); // Add canvas container to stage

    this.stage.appendChild(this.pixelDustCanvasContainer); // Add stage to mount point

    this.mountTarget.appendChild(this.stage); // Initialize event manager for getting interaction streams

    this.eventManager = new EventManager({
      canvasContainerElement: this.pixelDustCanvasContainer,
      stage: this.stage
    }); // Initialize layer manager for handling canvas layers and active layer

    this.layerManager = new LayerManager({
      canvasType: canvasType,
      dimension: dimension,
      canvasContainerElement: this.pixelDustCanvasContainer
    }); // Initialize command generator

    this.commandGenerator = new CommandGenerator({
      dimension: dimension,
      canvasType: canvasType,
      drawStream: this.eventManager.canvasDraw$,
      previewStream: this.eventManager.canvasPreview$
    });
    this.guideCanvas = new GuideCanvas(canvasType, dimension, this.pixelDustCanvasContainer);
    this.previewCanvas = new PreviewCanvas(canvasType, dimension, this.pixelDustCanvasContainer); // Initialize execution pipeline

    this.executionPipeline = new ExecutionPipeline({
      layerManager: this.layerManager,
      commandGenerator: this.commandGenerator,
      previewCanvas: this.previewCanvas
    }); // use event manager move stream to deal with canvas move

    this.subscriptions.push(this.eventManager.canvasMove$.pipe(repeat()).subscribe({
      next: function (arg) {
        var _a, _b;

        var x = arg.x,
            y = arg.y;
        (_a = _this.pixelDustCanvasContainer) === null || _a === void 0 ? void 0 : _a.style.setProperty('--stage-pos-x', String(x));
        (_b = _this.pixelDustCanvasContainer) === null || _b === void 0 ? void 0 : _b.style.setProperty('--stage-pos-y', String(y));
      },
      complete: function () {},
      error: function (error) {
        return console.error(error);
      }
    })); // use event manager scroll stream to deal with canvas scale

    this.subscriptions.push(this.eventManager.canvasScale$.subscribe({
      next: function (arg) {
        var _a;

        (_a = _this.pixelDustCanvasContainer) === null || _a === void 0 ? void 0 : _a.style.setProperty('--stage-scale', String(arg.scale));
      },
      complete: function () {},
      error: function (error) {
        return console.error(error);
      }
    })); // use event manager undo stream to deal with undo commands

    this.subscriptions.push(this.eventManager.undoStream$.subscribe({
      next: function () {
        _this.executionPipeline.undo();
      },
      complete: function () {},
      error: function (error) {
        return console.error(error);
      }
    }));
  }

  PixelDustEngine.prototype.cleanUp = function () {
    var _a, _b, _c, _d;

    (_a = this.layerManager) === null || _a === void 0 ? void 0 : _a.cleanUp();
    (_b = this.commandGenerator) === null || _b === void 0 ? void 0 : _b.cleanUp();
    (_c = this.executionPipeline) === null || _c === void 0 ? void 0 : _c.cleanUp();
    (_d = this.eventManager) === null || _d === void 0 ? void 0 : _d.cleanUp();
    this.subscriptions.forEach(function (subscription) {
      subscription.unsubscribe();
    });
    this.mountTarget.innerHTML = '';
  };

  return PixelDustEngine;
}();

var PixelDustApi = function () {
  function PixelDustApi(_a) {
    var mountTarget = _a.mountTarget,
        _b = _a.dimension,
        dimension = _b === void 0 ? 800 : _b,
        layerStackUpdateCB = _a.layerStackUpdateCB,
        activeLayerUpdateCB = _a.activeLayerUpdateCB,
        _c = _a.canvasType,
        canvasType = _c === void 0 ? CanvasType.X100 : _c,
        _d = _a.initializeWithLayer,
        initializeWithLayer = _d === void 0 ? true : _d;
    this.pixelDustEngine = new PixelDustEngine({
      mountTarget: mountTarget,
      dimension: dimension,
      canvasType: canvasType
    });

    if (this.pixelDustEngine.layerManager) {
      this.pixelDustEngine.layerManager.layerStackUpdateCB = layerStackUpdateCB;
      this.pixelDustEngine.layerManager.activeLayerUpdateCB = activeLayerUpdateCB;
    } else {
      throw Error('Could not set layer manager callbacks');
    }

    if (initializeWithLayer) {
      this.addLayerAfter();
      this.pixelDustEngine.layerManager.setActiveLayer({
        uuid: this.pixelDustEngine.layerManager.layerStack[0].uuid
      });
    }
  }

  PixelDustApi.prototype.cleanUp = function () {
    this.pixelDustEngine.cleanUp();
  };

  PixelDustApi.prototype.setForegroundColor = function (color) {
    if (this.pixelDustEngine.commandGenerator.drawingState.foregroundColor) this.pixelDustEngine.commandGenerator.drawingState.foregroundColor = color;
  };

  PixelDustApi.prototype.setBackgroundColor = function (color) {
    if (this.pixelDustEngine.commandGenerator.drawingState.backgroundColor) this.pixelDustEngine.commandGenerator.drawingState.backgroundColor = color;
  };

  PixelDustApi.prototype.setInstrumentType = function (instrument) {
    if (this.pixelDustEngine.commandGenerator.drawingState.instrument) this.pixelDustEngine.commandGenerator.drawingState.instrument = instrument;
  };

  PixelDustApi.prototype.addLayerAfter = function (arg) {
    this.pixelDustEngine.commandGenerator.layerCommand$.next(__assign({
      type: LayerCommandType.ADD_AFTER
    }, arg));
  };

  PixelDustApi.prototype.addLayerBefore = function (arg) {
    this.pixelDustEngine.commandGenerator.layerCommand$.next(__assign({
      type: LayerCommandType.ADD_BEFORE
    }, arg));
  };

  PixelDustApi.prototype.hideLayer = function (arg) {
    this.pixelDustEngine.commandGenerator.layerCommand$.next(__assign({
      type: LayerCommandType.HIDE
    }, arg));
  };

  PixelDustApi.prototype.showLayer = function (arg) {
    this.pixelDustEngine.commandGenerator.layerCommand$.next(__assign({
      type: LayerCommandType.SHOW
    }, arg));
  };

  PixelDustApi.prototype.setActiveLayer = function (arg) {
    this.pixelDustEngine.layerManager.setActiveLayer(arg);
  };

  PixelDustApi.prototype.deleteLayer = function (arg) {
    this.pixelDustEngine.commandGenerator.layerCommand$.next(__assign({
      type: LayerCommandType.DELETE
    }, arg));
  };

  PixelDustApi.prototype.insertLayerAfter = function (arg) {
    this.pixelDustEngine.commandGenerator.layerCommand$.next(__assign({
      type: LayerCommandType.INSERT_AFTER
    }, arg));
  };

  PixelDustApi.prototype.insertLayerBefore = function (arg) {
    this.pixelDustEngine.commandGenerator.layerCommand$.next(__assign({
      type: LayerCommandType.INSERT_BEFORE
    }, arg));
  };

  PixelDustApi.prototype.export = function () {
    return this.pixelDustEngine.layerManager.exportImage();
  };

  return PixelDustApi;
}();

var PixelDust = /** @class */ (function (_super) {
    __extends(PixelDust, _super);
    function PixelDust(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    PixelDust.prototype.componentDidMount = function () {
        var _a = this.props, onActiveLayerChange = _a.onActiveLayerChange, onLayerStackChange = _a.onLayerStackChange;
        var mountTarget = document.querySelector('.pixel-dust-react-binding');
        if (mountTarget) {
            this.pixelDustApi = new PixelDustApi({
                mountTarget: mountTarget,
                activeLayerUpdateCB: onActiveLayerChange,
                layerStackUpdateCB: onLayerStackChange
            });
        }
        else {
            console.error('Mount target not found');
        }
    };
    PixelDust.prototype.shouldComponentUpdate = function (nextProps) {
        var _a, _b, _c;
        var _d = this.props, foregroundColor = _d.foregroundColor, backgroundColor = _d.backgroundColor, instrument = _d.instrument;
        if (foregroundColor !== nextProps.foregroundColor) {
            (_a = this.pixelDustApi) === null || _a === void 0 ? void 0 : _a.setForegroundColor(nextProps.foregroundColor);
        }
        if (backgroundColor !== nextProps.backgroundColor) {
            (_b = this.pixelDustApi) === null || _b === void 0 ? void 0 : _b.setBackgroundColor(nextProps.backgroundColor);
        }
        if (instrument !== nextProps.instrument) {
            (_c = this.pixelDustApi) === null || _c === void 0 ? void 0 : _c.setInstrumentType(nextProps.instrument);
        }
        return false;
    };
    PixelDust.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.pixelDustApi) === null || _a === void 0 ? void 0 : _a.cleanUp();
    };
    PixelDust.prototype.render = function () {
        return (React.createElement("div", { className: "pixel-dust-react-binding", style: {
                height: '100%',
                width: '100%'
            } }));
    };
    return PixelDust;
}(React.Component));

export { PixelDust };
//# sourceMappingURL=index.js.map
