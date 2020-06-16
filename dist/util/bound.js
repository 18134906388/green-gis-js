export class Bound {
    constructor(xmin, ymin, xmax, ymax) {
        //+1代表 x方向为自西向东，-1则反之
        this._xscale = 1;
        //+1代表 y方向为自北向南，-1则反之
        this._yscale = 1;
        this._xmin = Math.min(xmin, xmax);
        this._ymin = Math.min(ymin, ymax);
        this._xmax = Math.max(xmin, xmax);
        this._ymax = Math.max(ymin, ymax);
        this._xscale = xmin <= xmax ? 1 : -1;
        this._yscale = ymin <= ymax ? 1 : -1;
    }
    get xmin() {
        return this._xmin;
    }
    get ymin() {
        return this._ymin;
    }
    get xmax() {
        return this._xmax;
    }
    get ymax() {
        return this._ymax;
    }
    get xscale() {
        return this._xscale;
    }
    get yscale() {
        return this._yscale;
    }
    getCenter() {
        return [(this._xmin + this._xmax) / 2, (this._ymin + this._ymax) / 2];
    }
    //是否交叉叠盖
    intersect(bound) {
        return (bound.xmax >= this._xmin) && (bound.xmin <= this._xmax) && (bound.ymax >= this._ymin) && (bound.ymin <= this._ymax);
    }
    scale(s) {
        this._xmin = this._xmin - (s - 1) * (this._xmax - this._xmin) / 2;
        this._xmax = this._xmax + (s - 1) * (this._xmax - this._xmin) / 2;
        this._ymin = this._ymin - (s - 1) * (this._ymax - this._ymin) / 2;
        this._ymax = this._ymax + (s - 1) * (this._ymax - this._ymin) / 2;
    }
}
