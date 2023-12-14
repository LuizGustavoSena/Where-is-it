import { RemoteLoginAccount } from "@/data/usecases/remote-login-account";
import { makeAxiosHttpClient } from "../http";

export const makeRemoteLoginAccount = (): RemoteLoginAccount => new RemoteLoginAccount(makeAxiosHttpClient());