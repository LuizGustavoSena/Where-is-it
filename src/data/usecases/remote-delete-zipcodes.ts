import { DeleteZipcode } from "@/domain/usecases/delete-zipcodes";
import { HttpClient } from "../protocols/http";

export class RemoteDeleteZipcode implements DeleteZipcode {
    constructor(
        private httpClient: HttpClient
    ) { };

    async execute(code: string): Promise<void> {
        await this.httpClient.request({
            method: 'delete',
            url: `${import.meta.env.VITE_URL_API_ZIPCODE}/zipcode/${code}`,
        });
    }
}