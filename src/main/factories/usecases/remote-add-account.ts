import { RemoteAddAccount } from "@/data/usecases/remote-add-account";
import { makeAxiosHttpClient } from "../http";

export const makeRemoteAddAccount = () => new RemoteAddAccount(makeAxiosHttpClient());