import { RemoteDeleteZipcode } from "@/data/usecases/remote-delete-zipcodes";
import { makeRefreshTokenHttpClient } from "../decorators/refresh-token-http-client";

export const makeRemoteDeleteZipcode = (): RemoteDeleteZipcode => new RemoteDeleteZipcode(
    makeRefreshTokenHttpClient()
);