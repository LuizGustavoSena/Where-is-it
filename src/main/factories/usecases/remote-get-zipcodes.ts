import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { makeAuthorizeHttpClient } from "../decorators/authorize-http-client";

export const makeRemoteGetZipcodes = (): RemoteGetZipcodes => new RemoteGetZipcodes(
    makeAuthorizeHttpClient()
);