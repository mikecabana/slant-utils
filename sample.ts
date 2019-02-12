// import { IRequestParams } from './src/ComponentWithRequestParams/i-request-params';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
let params = {};
// const paramsList: Array<BehaviorSubject<any>> = [];

const paramsObs: Subject<any> = new Subject<any>();
paramsObs.subscribe(_ => {
    // this.params = Object.assign(this.params, _);
    console.log(_);
});

const sortSubject: Subject<{ 'sort.dir'?: string, 'sort.field'?: string }> = new Subject<{ 'sort.dir'?: string, 'sort.field'?: string }>();
sortSubject.subscribe(_ => updateParams(_));
const pageSubject: Subject<{ 'page.index'?: number, 'page.size'?: number }> = new Subject<{ 'page.index'?: number, 'page.size'?: number }>();
pageSubject.subscribe(_ => updateParams(_));
const searchSubject: Subject<{ 'search.term': string }> = new Subject<{ 'search.term': string }>();
searchSubject
    .pipe(
        debounceTime(250),
        distinctUntilChanged()
    )
    .subscribe(_ => updateParams(_));

const updateParams = (values: object): void => {
    params = Object.assign(params, values);
    paramsObs.next(params);
}

const search = (term: string) => {
    searchSubject.next({ 'search.term': term });
}

const pageUp = () => {
    pageSubject.next({ 'page.index': 1, 'page.size': 10 });
}

const pageDown = () => {
    pageSubject.next({ 'page.index': 0, 'page.size': 10 });
}

const sort = () => {
    sortSubject.next({ 'sort.dir': 'asc', 'sort.field': 'test' });
}

search('test term');
pageUp();
pageDown();
sort();
