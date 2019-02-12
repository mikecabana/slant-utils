"use strict";
exports.__esModule = true;
// import { IRequestParams } from './src/ComponentWithRequestParams/i-request-params';
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// interface ISortParams {
//     'sort.dir'?: 'asc' | 'desc' | '';
//     'sort.field'?: string;
// }
// class SortParams implements IRequestParams<ISortParams> {
//     params: ISortParams;
//     paramsSubject: Subject<ISortParams>;
//     constructor() {
//         this.params = {};
//         this.paramsSubject = new Subject<ISortParams>();
//     }
//     consumeData(data: ISortParams): void {
//         this.paramsSubject.next(data);
//     }
//     getParamsObservable(): Observable<ISortParams> {
//         return this.paramsSubject
//             .pipe();
//     }
// }
// const sortParams = new SortParams();
// from notes
var params = {};
// const paramsList: Array<BehaviorSubject<any>> = [];
var paramsObs = new rxjs_1.Subject();
paramsObs.subscribe(function (_) {
    // this.params = Object.assign(this.params, _);
    console.log(_);
});
var sortSubject = new rxjs_1.Subject();
sortSubject.subscribe(function (_) { return updateParams(_); });
var pageSubject = new rxjs_1.Subject();
pageSubject.subscribe(function (_) { return updateParams(_); });
var searchSubject = new rxjs_1.Subject();
searchSubject
    .pipe(operators_1.debounceTime(250), operators_1.distinctUntilChanged())
    .subscribe(function (_) { return updateParams(_); });
var updateParams = function (values) {
    params = Object.assign(params, values);
    paramsObs.next(params);
};
var search = function (term) {
    searchSubject.next({ 'search.term': term });
};
var pageUp = function () {
    pageSubject.next({ 'page.index': 1, 'page.size': 10 });
};
var pageDown = function () {
    pageSubject.next({ 'page.index': 0, 'page.size': 10 });
};
var sort = function () {
    sortSubject.next({ 'sort.dir': 'asc', 'sort.field': 'test' });
};
search('test term');
pageUp();
pageDown();
sort();
