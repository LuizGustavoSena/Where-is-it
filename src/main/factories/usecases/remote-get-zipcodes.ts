import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { makeRefreshTokenHttpClient } from "../decorators/refresh-token-http-client";

export const makeRemoteGetZipcodes = (): RemoteGetZipcodes => new RemoteGetZipcodes(
    makeRefreshTokenHttpClient()
);