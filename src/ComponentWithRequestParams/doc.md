# Description
This module provides abstractions for Angular components managing HTTP request parameters.

# Samples
### AbstractComponentWithRequestParams usage sample [class]
Angular components that manage HTTP parameters will implement the helpers in this abstract class.
~~~typescript
@Component(...)
export class AComponent implements AbstractComponentWithRequestParams{
...
}
~~~

### AbstractRequestParams<T> usage sample [class]
The `AbstractComponentWithRequestParams` manages parameters implementing `AbstractRequestParams<T>`
~~~typescript
export class SortParams implements AbstractRequestParams<ISortParams>{
...
}

export interface ISortParams {
    'sort.dir': string;
    'sort.field': string;
}
~~~

### RequestParam [type]
~~~typescript
type RequestParams = { [name: string]: string };
~~~