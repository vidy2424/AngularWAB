import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class HelperService {

    private _userData: object = {};
    private _token: string;

    get userData(): object {
        return this._userData;
    }

    set userData(data: object) {
        this._userData = data;
    }

    get token(): string {
        const token = this._token ? this._token : localStorage.getItem('token');
        return token;
    }

    set token(data: string) {
        if (data) {
            localStorage.setItem ('token', `${data}`);
        }
        const token = data ? data : localStorage.getItem('token');
        this._token = data;
    }
}
