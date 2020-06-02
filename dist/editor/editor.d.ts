import { FeatureLayer } from "../layer/feature-layer";
import { Map } from "../map";
import { Subject } from "../util/subject";
export declare class Editor extends Subject {
    private _canvas;
    private _ctx;
    private _map;
    private _featureLayer;
    private _editing;
    private _editingFeature;
    private _vertexLayer;
    private _drag;
    get editing(): boolean;
    constructor(map: Map);
    setFeatureLayer(layer: FeatureLayer): void;
    start(): void;
    save(): void;
    stop(): void;
    _extentChange(event: any): void;
    _switchEditing(event: any): void;
    redraw(): void;
    clear(): void;
    _onClick(event: any): void;
    _onDoubleClick(event: any): void;
    _onMouseDown(event: any): void;
    _onMouseMove(event: any): void;
    _onMouseUp(event: any): void;
    destroy(): void;
}
