import { CreateAccountError } from "@/domain/error/create-account-error";
import { AddAccount, RequestAddAccount } from "@/domain/usecases";
import { HttpClient } from "../protocols/http";

export class RemoteAddAccount implements AddAccount {
    constructor(
        private httpClient: HttpClient
    ) { };

    async add(params: RequestAddAccount): Promise<void> {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${import.meta.env.VITE_URL_API_AUTHENTICATION}/create_account`,
            body: {
                username: params.username,
                email: params.email,
                password: params.password,
            }
        });

        if (!response)
            throw new CreateAccountError();
    };

}