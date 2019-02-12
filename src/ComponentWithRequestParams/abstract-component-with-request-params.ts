import { AbstractRequestParams } from './abstract-request-params';
import { Observer } from 'rxjs';
import { RequestParams } from './request-params';

export abstract class AbstractComponentWithRequestParams {
    /**
     * Global record of the combined request params.
     * This is what should get passed to Angulars HttpParams.
     *
     * @abstract
     * @type {GlobalParams}
     * @memberof AbstractComponentWithRequestParams
     */
    abstract globalParams: RequestParams;

    /**
     * Global record of the request params for this component.
     * Populated via `registerRequestParams`.
     * An observer will be registered to each of these via `subscribeToRegisteredParams` 
     * so when the param changes, an update can occur.
     *
     * @abstract
     * @type {Array<AbstractRequestParams<any>>}
     * @memberof AbstractComponentWithRequestParams
     */
    abstract requestParams: Array<AbstractRequestParams<any>>;

    /**
     * Iterate through `requestParams` and attach an observer by subscribing to each `AbstractRequestParam<T>`.
     *
     * @abstract
     * @param {Observer<RequestParams>} observer
     * @memberof AbstractComponentWithRequestParams
     */
    abstract subscribeToRegisteredParams(observer: Observer<RequestParams>): void;

    /**
     * Add an `AbstractRequestParam<T>` to the global list of params `requestParams`.
     *
     * @abstract
     * @param {Array<AbstractRequestParams<any>>} requestParams
     * @memberof AbstractComponentWithRequestParams
     */
    abstract registerRequestParams(requestParams: Array<AbstractRequestParams<any>>): void
}