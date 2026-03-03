import { RemoteGetTrackingZipcode } from "@/data/usecases/remote-get-tracking-zipcodes";
import { GetTrackingZipcode } from "@/domain/usecases/get-tracking-zipcode";
import { makeRefreshTokenHttpClient } from "../decorators/refresh-token-http-client";

export const makeRemoteGetTrackingZipcode = (): GetTrackingZipcode => new RemoteGetTrackingZipcode(
    makeRefreshTokenHttpClient()
);