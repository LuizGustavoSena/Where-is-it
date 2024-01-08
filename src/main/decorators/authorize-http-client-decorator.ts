import { GetStorage } from '@/data/protocols/cache';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import { EnumCache } from '@/domain/enums';

export class AuthorizeHttpClientDecorator implements HttpClient {
    constructor(
        private readonly getStorage: GetStorage,
        private readonly httpClient: HttpClient
    ) { }

    async request(data: HttpRequest): Promise<HttpResponse<any>> {
        const accessToken = this.getStorage.get(EnumCache.AUTH_CACHE);

        if (accessToken) {
            Object.assign(data, {
                headers: Object.assign(data.headers || {}, {
                    'Authorization': accessToken.token
                })
            })
        }

        const httpResponse = await this.httpClient.request(data);

        return httpResponse;
    }
}