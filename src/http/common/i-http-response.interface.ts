import { IPagination } from './i-pagination.interface';

export interface IHttpResponse<T> {
    count: number;
    items: Array<T>;
    page?: IPagination;
}