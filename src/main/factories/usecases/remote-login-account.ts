import { RemoteLoginAccount } from "@/data/usecases/remote-login-account";
import { makeLocalStorageAdapter } from "../cache/local-storage-cache";
import { makeAxiosHttpClient } from "../http";

export const makeRemoteLoginAccount = (): RemoteLoginAccount => new RemoteLoginAccount(
    makeAxiosHttpClient(),
    makeLocalStorageAdapter()
);