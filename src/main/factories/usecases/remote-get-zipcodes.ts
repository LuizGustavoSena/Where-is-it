import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { makeAxiosHttpClient } from "../http";

export const makeRemoteGetZipcodes = (): RemoteGetZipcodes => new RemoteGetZipcodes(
    makeAxiosHttpClient()
);