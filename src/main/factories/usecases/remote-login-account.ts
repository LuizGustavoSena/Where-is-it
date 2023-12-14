import { RemoteLoginAccount } from "@/data/usecases/remote-login-account";
import { makeAxiosHttpClient } from "../http";

const makeRemoteLoginAccount = (): RemoteLoginAccount => new RemoteLoginAccount(makeAxiosHttpClient());