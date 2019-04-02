import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { IHttpOptions } from '../common/i-http-options.interface';
import { IHttpResponse } from '../common/i-http-response.interface';

export class BaseHttpClient<T> {


    /**
     * Will provide basic CRUD functionality for back-end resources
     * T will be the front-end model expected by the application
     * D will be the DTO (data transfer object) expected by the back-end
     */

    /**
     *
     */
    protected baseUrl: string;

    /**
     * Hold the headers in memory. By default the headers are set to `{ 'Content-Type': 'application/json' }`.
     *
     */
    protected headers: HttpHeaders;


    constructor(
        protected http: HttpClient,
        _baseUrl: string,
        _headers?: HttpHeaders
    ) {
        this.baseUrl = _baseUrl;
        this.headers = _headers || new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }


    /**
     *
     */
    public createOne(body: T, params?: Params): Observable<T> {
        const httpOptions = this.buildHttpOptions(params, body);
        return this.http.post<T>(this.baseUrl, httpOptions);
    }


    /**
     *
     */
    public readAllStructured(params?: Params): Observable<IHttpResponse<T>> {
        const httpOptions = this.buildHttpOptions(params);
        return this.http.get<IHttpResponse<T>>(this.baseUrl, httpOptions);
    }

    /**
     *
     */
    public readAllList(params?: Params): Observable<Array<T>> {
        const httpOptions = this.buildHttpOptions(params);
        return this.http.get<Array<T>>(this.baseUrl, httpOptions);
    }

    /**
     *
     */
    public readOne(id: number | string, params?: Params): Observable<T> {
        const httpOptions = this.buildHttpOptions(params);
        return this.http.get<T>(`${this.baseUrl}/${id}`, httpOptions);
    }

    /**
     *
     */
    public updateOne(id: number | string, body: T, params?: Params): Observable<T> {
        const httpOptions = this.buildHttpOptions(params, body);
        return this.http.put<T>(`${this.baseUrl}/${id}`, httpOptions);
    }

    /**
     *
     */
    public deleteOne(id: number | string, params?: Params): Observable<any> {
        const httpOptions = this.buildHttpOptions(params);
        return this.http.delete<any>(this.baseUrl, httpOptions);
    }


    /**
     * prepares the request options on every request made
     *
     */
    private buildHttpOptions(params?: Params, body?: any): IHttpOptions {

        let options = {};

        if (typeof params !== 'undefined' && params !== undefined) {

            options = Object.assign(options, { params: new HttpParams({ fromObject: params }) });
        }

        if (typeof body !== 'undefined' && body !== undefined) {

            options = Object.assign(options, { body });
        }

        options = Object.assign(options, { headers: this.headers });

        return options;
    }
}
