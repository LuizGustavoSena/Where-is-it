import { RemoteGetTrackingZipcode } from "@/data/usecases/remote-get-tracking-zipcodes";
import { GetTrackingZipcode } from "@/domain/usecases/get-tracking-zipcode";
import { makeAuthorizeHttpClient } from "../decorators/authorize-http-client";

export const makeRemoteGetTrackingZipcode = (): GetTrackingZipcode => new RemoteGetTrackingZipcode(
    makeAuthorizeHttpClient()
);