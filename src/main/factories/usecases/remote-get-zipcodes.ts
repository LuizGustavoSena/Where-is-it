import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { makeAuthorizeHttpClient } from "../decorators/authorize-hhtp-client";

export const makeRemoteGetZipcodes = (): RemoteGetZipcodes => new RemoteGetZipcodes(
    makeAuthorizeHttpClient()
);