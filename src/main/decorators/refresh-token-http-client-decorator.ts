import { GetStorage, SetStorage } from "@/data/protocols/cache";
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import { EnumCache } from "@/domain/enums";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { ResponseLoginAccount } from "@/domain/usecases";

export class RefreshTokenHttpClientDecorator implements HttpClient {
    constructor(
        private readonly localStorage: SetStorage & GetStorage,
        private readonly httpClient: HttpClient,
        private readonly baseHttpClient: HttpClient
    ) { }

    async request(data: HttpRequest): Promise<HttpResponse<any>> {
        const response = await this.httpClient.request(data)

        if (response.statusCode === 401) {
            console.log(401)
            const refreshToken = this.localStorage.get(EnumCache.REFRESH_CACHE);
            console.log({ refreshToken })

            const newToken = await this.baseHttpClient.request<ResponseLoginAccount>({
                method: 'post',
                url: `${import.meta.env.VITE_URL_API_AUTHENTICATION}/refresh_token`,
                headers: {
                    'refreshToken': refreshToken
                }
            });

            if (newToken.statusCode !== HttpStatusCode.Created)
                throw new UnauthorizedError();

            this.localStorage.set(EnumCache.AUTH_CACHE, newToken.body.token)
            this.localStorage.set(EnumCache.REFRESH_CACHE, newToken.body.refreshtoken)

            return this.httpClient.request(data)
        }

        return response
    }
}