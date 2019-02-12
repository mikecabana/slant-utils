import { Subject, Observable, MonoTypeOperatorFunction } from 'rxjs';
import { RequestParams } from './request-params';

export abstract class AbstractRequestParams<T extends RequestParams> {
    /**
     * Global record of this request params values.
     *
     * @abstract
     * @type {T}
     * @memberof AbstractRequestParams
     */
    abstract params: T;

    /**
     * Global subject to emit this request params values.
     *
     * @abstract
     * @type {Subject<T>}
     * @memberof AbstractRequestParams
     */
    abstract subject: Subject<T>;

    /**
     * Get this request params Subject as an Observable by using the `pipe` operator.
     * The `pipe` operator will allow us to apply `MonoTypeOperatorFunction` to the Observable i.e. `distinctUntilChanged()`.
     *
     * @abstract
     * @returns {Observable<T>}
     * @memberof AbstractRequestParams
     */
    abstract getPipedParamsObservable(): Observable<T>;
}