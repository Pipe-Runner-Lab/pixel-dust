import React from 'react';
import PixelDustApi from '@pixel-dust/base';

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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
