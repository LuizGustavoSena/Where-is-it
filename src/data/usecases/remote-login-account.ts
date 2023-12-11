import { LoginAccountError } from "@/domain/error/login-account-error";
import { LoginAccount, RequestLoginAccount, ResponseLoginAccount } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http";

export class RemoteLoginAccount implements LoginAccount {
    constructor(
        private httpClient: HttpClient
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
            throw new LoginAccountError();

        return response.body;
    };
}