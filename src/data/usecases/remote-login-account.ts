import { EnumCache } from "@/domain/enums";
import { LoginAccountError } from "@/domain/error/login-account-error";
import { LoginAccount, RequestLoginAccount, ResponseLoginAccount } from "@/domain/usecases";
import { SetStorage } from "../protocols/cache";
import { HttpClient, HttpStatusCode } from "../protocols/http";

export class RemoteLoginAccount implements LoginAccount {
    constructor(
        private httpClient: HttpClient,
        private readonly setStorage: SetStorage,
    ) { };

    async auth(params: RequestLoginAccount): Promise<ResponseLoginAccount> {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${import.meta.env.VITE_URL_API_AUTHENTICATION}/login_account`,
            body: {
                email: params.email,
                password: params.password
            }
        });

        if (response.statusCode !== HttpStatusCode.Created)
            throw new LoginAccountError(response.body);

        this.setStorage.set(EnumCache.AUTH_CACHE, response.body.token);
        this.setStorage.set(EnumCache.REFRESH_CACHE, response.body.refreshtoken);

        return response.body;
    };
}