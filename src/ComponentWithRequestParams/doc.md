## Description
This module provides abstractions for Angular components managing HTTP request parameters.

## Samples

Implementing a request param for searching.

~~~typescript
import { IRequestParams, AbstractRequestParams } from 'slant-utils';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

export interface ISearchRequestParams extends IRequestParams {
    'search.term'?: string;
}

export class SearchRequestParams extends AbstractRequestParams<ISearchRequestParams> {

    params: ISearchRequestParams;    

    subject: Subject<ISearchRequestParams>;

    constructor() {
        super();
        this.params = {};
        this.subject = new Subject<ISearchRequestParams>();
        this.getPipedParamsObservable()
            .subscribe(
                (value: ISearchRequestParams) => {
                    this.params = value;
                }
            );
    }
    
    getPipedParamsObservable(): Observable<ISearchRequestParams> {
        return this.subject.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
    }

    resetParams(): void {
        this.params = {};
    }

    onSearch(term: string): void {
        this.subject.next({'search.term': term !== '' ? term : undefined});
    }

}
~~~

Component that implements `AbstractComponentWithRequestParams` and uses the `SearchRequestParams`.
~~~typescript
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';

import { AbstractComponentWithRequestParams, IRequestParams, AbstractRequestParams } from 'slant-utils';
import { SearchRequestParams } from './request-params/search-request-params';

@Component({
  ...
})
export class InheritanceComponent implements OnInit, AbstractComponentWithRequestParams {

  globalParams: IRequestParams;

  requestParams: AbstractRequestParams<any>[];

  paramsObserver: Observer<IRequestParams>;

  constructor() { }

  ngOnInit() {
    this.globalParams = {};
    this.requestParams = [];
    this.paramsObserver = {
      next: (value: IRequestParams) => {
        this.globalParams = Object.assign(this.globalParams, value);
        console.log(this.globalParams);
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => { }
    };

    const searchParams = new SearchRequestParams();

    this.registerRequestParams([
      searchParams
    ]);

    this.subscribeToRegisteredParams(this.paramsObserver);
  }

  registerRequestParams(requestParamsForRegistering: AbstractRequestParams<any>[]): void {
    requestParamsForRegistering.forEach(requestParam => this.requestParams.push(requestParam));
  }

  subscribeToRegisteredParams(observer: Observer<IRequestParams>): void {
    this.requestParams.forEach(requestParam => requestParam.getPipedParamsObservable().subscribe(observer));
  }

  getRegisteredRequestParams<T>(concreteRequestParams: (new () => T)): AbstractRequestParams<any> {
    return this.requestParams.filter(requestParam => requestParam instanceof concreteRequestParams)[0];
  }

  clearGlobalParams(): void {
    this.globalParams = {};
    this.requestParams.forEach(rp => rp.resetParams());
  }

  // implemented by the developer to for use with the UI  
  onSearch(term: string) {
    const searchRequestParams = this.getRegisteredRequestParams(SearchRequestParams); 
    (<SearchRequestParams>searchRequestParams).onSearch(term);
  }
}
~~~