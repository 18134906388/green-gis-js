import { SimplePointSymbol, SimpleTextSymbol, ClusterSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
import { Subject } from "../util/subject";
export class Feature extends Subject {
    /*private _animation: Animation;
    get animation(): Animation {
        return this._animation;
    }
    set animation(value: Animation) {
        this._animation = value;
    }*/
    constructor(geometry, properties, symbol) {
        super(["click", "dblclick", "mouseover", "mouseout"]);
        this.visible = true;
        this._geometry = geometry;
        this._properties = properties;
        this._symbol = symbol;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get geometry() {
        return this._geometry;
    }
    get properties() {
        return this._properties;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    get edited() {
        return this._edited;
    }
    set edited(value) {
        this._edited = value;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, symbol instanceof ClusterSymbol ? symbol : (this._symbol || symbol));
    }
    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, animation: Animation = new Animation()) {
        if (this.visible) this._geometry.animate(elapsed, ctx, projection, extent, this._animation || animation);
    }*/
    label(field, ctx, projection = new WebMercator(), symbol = new SimpleTextSymbol()) {
        if (this.visible)
            this._geometry.label(this._properties[field.name], ctx, projection, this._text || symbol);
    }
    intersect(projection = new WebMercator(), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    //this._handlers["mouseover"].forEach(handler => handler({feature: this, screenX: screenX, screenY: screenY}));
                    this.emit("mouseover", { feature: this, screenX: screenX, screenY: screenY });
                }
                else if (this._contained && !flag) {
                    //this._handlers["mouseout"].forEach(handler => handler({feature: this, screenX: screenX, screenY: screenY}));
                    this.emit("mouseout", { feature: this, screenX: screenX, screenY: screenY });
                }
            }
            this._contained = flag;
            return flag;
        }
    }
}
