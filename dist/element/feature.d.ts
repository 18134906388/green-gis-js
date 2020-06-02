import { Bound } from "../util/bound";
import { Geometry } from "../geometry/geometry";
import { Symbol, SimpleTextSymbol } from "../symbol/symbol";
import { Projection } from "../projection/projection";
import { Field } from "../data/field";
import { Subject } from "../util/subject";
export declare class Feature extends Subject {
    private _geometry;
    private _properties;
    private _contained;
    visible: boolean;
    get geometry(): Geometry;
    get properties(): any;
    get bound(): Bound;
    constructor(geometry: any, properties: any);
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): void;
    label(field: Field, ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: SimpleTextSymbol): void;
    intersect(projection?: Projection, extent?: Bound): boolean;
    contain(screenX: number, screenY: number, event?: string): boolean;
}
