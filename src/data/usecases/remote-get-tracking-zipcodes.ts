import { GetZipcodesError } from "@/domain/error/get-zipcodes-error";
import { UnauthorizedError } from "@/domain/error/unauthorized-error";
import { TrackingZipcode, TrackingZipcodeProps } from "@/domain/models/get-tracking-zipcodes";
import { GetTrackingZipcode } from "@/domain/usecases/get-tracking-zipcode";
import { HttpClient, HttpStatusCode } from "../protocols/http";

export class RemoteGetTrackingZipcode implements GetTrackingZipcode {
    constructor(
        private httpClient: HttpClient
    ) { };

    async execute(code: string): Promise<TrackingZipcode> {
        const response = await this.httpClient.request<TrackingZipcodeProps>({
            method: 'get',
            url: `${import.meta.env.VITE_URL_API_ZIPCODE}/zipcode/${code}`,
        });

        if (response.statusCode === HttpStatusCode.Unauthorized)
            throw new UnauthorizedError();

        if (response.statusCode === HttpStatusCode.NOCONTENT)
            return null;

        if (!response || response.statusCode !== HttpStatusCode.Ok)
            throw new GetZipcodesError(JSON.stringify(response?.body));

        return response.body.trackingRoute;
    }
}