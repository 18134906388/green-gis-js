import { Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { SimpleLineSymbol } from "../symbol/symbol";
import { WebMecator } from "../projection/web-mecator";
//线
export class Polyline extends Geometry {
    constructor(lnglats) {
        super();
        this._tolerance = 4; //TOLERANCE + symbol.lineWidth
        this._lnglats = lnglats;
    }
    ;
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((point) => this._projection.project(point));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(point => {
            xmin = Math.min(xmin, point[0]);
            ymin = Math.min(ymin, point[1]);
            xmax = Math.max(xmax, point[0]);
            ymax = Math.max(ymax, point[1]);
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
    }
    draw(ctx, projection = new WebMecator(), extent = projection.bound, symbol = new SimpleLineSymbol()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        ctx.save();
        ctx.strokeStyle = symbol.strokeStyle;
        ctx.lineWidth = symbol.lineWidth;
        this._tolerance = Polyline.TOLERANCE + symbol.lineWidth;
        ctx.beginPath();
        const matrix = ctx.getTransform();
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        this._screen = [];
        this._coordinates.forEach((point, index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            }
            else {
                ctx.lineTo(screenX, screenY);
            }
            this._screen.push([screenX, screenY]);
        });
        ctx.stroke();
        ctx.restore();
    }
    contain(screenX, screenY) {
        let p2;
        const distance = this._screen.reduce((acc, cur) => {
            if (p2) {
                const p1 = p2;
                p2 = cur;
                return Math.min(acc, this._distanceToSegment([screenX, screenY], p1, p2));
            }
            else {
                p2 = cur;
                return acc;
            }
        }, Number.MAX_VALUE);
        return distance <= this._tolerance;
    }
    //from Leaflet
    _distanceToSegment(p, p1, p2) {
        let x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y, dot = dx * dx + dy * dy, t;
        if (dot > 0) {
            t = ((p[0] - x) * dx + (p[1] - y) * dy) / dot;
            if (t > 1) {
                x = p2[0];
                y = p2[1];
            }
            else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }
        dx = p[0] - x;
        dy = p[1] - y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
//interaction: hover && identify
Polyline.TOLERANCE = 4; //screen pixel