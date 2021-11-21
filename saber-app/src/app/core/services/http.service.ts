import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {

    private static readonly _apiUrl = environment.apiUrl;

    public static getEndpoint(uri): string {
        return this._apiUrl.replace(/\/?$/, '/') + uri.replace(/^\/|\/$/g, '');
    }
}
