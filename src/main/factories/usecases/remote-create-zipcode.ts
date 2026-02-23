import { RemoteCreateZipcode } from "@/data/usecases/remote-create-zipcode";
import { makeAuthorizeHttpClient } from "../decorators/authorize-http-client";

export const makeRemoteCreateZipcode = (): RemoteCreateZipcode => new RemoteCreateZipcode(
    makeAuthorizeHttpClient()
);