import { IApi, IProductsResponse, IOrderRequest, IOrderResponse } from '../types';

export class WebLarekApi {
    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
    }

    async getProducts(): Promise<IProductsResponse> {
        return this._api.get<IProductsResponse>('/product/');
    }

    async orderProducts(data: IOrderRequest): Promise<IOrderResponse> {
        return this._api.post<IOrderResponse>('/order/', data);
    }
}