import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {ResponseContentType} from '@angular/http/src/enums';
import index from "@angular/cli/lib/cli";


export interface IMarker {
    lat: number,
    lng: number,
    title?: string,
    id?: number,
    type?: number,
    user_id?: number
}

@Injectable()
export class MapService {

    protected list: Array<IMarker> = [];
    protected onChangeFn: () => void;
    protected onAddMarkerFromMapFn: () => void;

    constructor() {
    }


    public onChange(fn: () => void) {
        this.onChangeFn = fn;
    }

    public onAddMarkerFromMap(fn: () => void) {
        this.onAddMarkerFromMapFn = fn;
    }

    public emitOnMarkerFromMapAdd() {
        if (typeof  this.onAddMarkerFromMapFn === 'function') {
            this.onAddMarkerFromMapFn();
        }
    }

    public add(marker: IMarker): this {
        this.list.push(marker);
        if (typeof this.onChangeFn === 'function') {
            this.onChangeFn();
        }
        return this;
    }

    /**
     *
     * @return {Array<IMarker>}
     */
    public getList(): Array<IMarker> {
        return this.list;
    }

    /**
     *
     * @param {number} id
     * @return {this}
     */
    public remove(id: number): this {
        let index = this.list.reduce((p, c, index) => {
            return p === -1 && c.id === id ? index : p;
        }, -1);
        if (index !== -1) {
            this.list.splice(index, 1);
            if (typeof this.onChangeFn === 'function') {
                this.onChangeFn();
            }
        }
        return this;
    }
}
