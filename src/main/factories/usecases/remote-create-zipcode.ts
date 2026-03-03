import { RemoteCreateZipcode } from "@/data/usecases/remote-create-zipcode";
import { makeRefreshTokenHttpClient } from "../decorators/refresh-token-http-client";

export const makeRemoteCreateZipcode = (): RemoteCreateZipcode => new RemoteCreateZipcode(
    makeRefreshTokenHttpClient()
);