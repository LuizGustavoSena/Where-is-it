import { CreateZipcodeError } from "@/domain/error/create-zipcode-error";
import { CreateZipcodeModel } from "@/domain/models/create-zipcodes";
import { CreateZipcode } from "@/domain/usecases/create-zipcode";
import { HttpClient, HttpStatusCode } from "../protocols/http";

export class RemoteCreateZipcode implements CreateZipcode {
    constructor(
        private httpClient: HttpClient
    ) { };

    async execute(params: CreateZipcodeModel): Promise<void> {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${import.meta.env.VITE_URL_API_ZIPCODE}/create_zipcode`,
            body: params
        });

        if (response.statusCode !== HttpStatusCode.Created)
            throw new CreateZipcodeError(response.body);
    };
}