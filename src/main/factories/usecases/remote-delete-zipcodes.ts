import { RemoteDeleteZipcode } from "@/data/usecases/remote-delete-zipcodes";
import { makeAuthorizeHttpClient } from "../decorators/authorize-http-client";

export const makeRemoteDeleteZipcode = (): RemoteDeleteZipcode => new RemoteDeleteZipcode(
    makeAuthorizeHttpClient()
);