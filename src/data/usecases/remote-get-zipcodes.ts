import { GetZipcodesError } from "@/domain/error/get-zipcodes-error";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { Zipcodes } from "@/domain/models/get-zipcodes";
import { GetZipcodes } from "@/domain/usecases/get-zipcodes";
import { HttpClient, HttpStatusCode } from "../protocols/http";

export class RemoteGetZipcodes implements GetZipcodes {
    constructor(
        private httpClient: HttpClient
    ) { };

    async execute(): Promise<Zipcodes> {
        const response = await this.httpClient.request({
            method: 'get',
            url: `${import.meta.env.VITE_URL_API_ZIPCODE}/zipcode`,
        });

        if (!response ||
            response.statusCode !== HttpStatusCode.Ok &&
            response.statusCode !== HttpStatusCode.NOCONTENT &&
            response.statusCode !== HttpStatusCode.Unauthorized)
            throw new GetZipcodesError(response?.body);

        if (response.statusCode === HttpStatusCode.Unauthorized)
            throw new UnauthorizedError();

        if (response.statusCode === HttpStatusCode.NOCONTENT)
            return { zipcodes: [] };

        return response.body;
    }
}