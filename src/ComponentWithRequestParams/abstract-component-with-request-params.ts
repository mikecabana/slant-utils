import { AbstractRequestParams } from './abstract-request-params';
import { Observer } from 'rxjs';
import { RequestParams } from './request-params';

export abstract class AbstractComponentWithRequestParams {
  /**
   * Global record of the combined request params.
   * This is what should get passed to Angular's HttpParams.
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
   * Observer to be used to subscribe to each request param.
   * Use as the argument for `subscribeToRegisteredParams(observer: Observer<RequestParams>)`
   *
   * @abstract
   * @type {Observer<RequestParams>}
   * @memberof AbstractComponentWithRequestParams
   */
  abstract paramsObserver: Observer<RequestParams>;

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
  abstract registerRequestParams(requestParamsForRegistering: Array<AbstractRequestParams<any>>): void;

  /**
   * Find the concrete request params in the list of registered request params and return it.
   * Pass a `new ` instance to type check and find the right object i.e. `new SortRequestParams()`.
   * Possible implementation can be `return this.requestParams.filter(requestParam => requestParam instanceof concreteRequestParams)[0];`.
   *
   * @abstract
   * @template T
   * @param {(new () => T)} concreteRequestParams
   * @returns {AbstractRequestParams<any>}
   * @memberof AbstractComponentWithRequestParams
   */
  abstract getRegisteredRequestParams<T>(concreteRequestParams: (new () => T)): AbstractRequestParams<any>;
}
