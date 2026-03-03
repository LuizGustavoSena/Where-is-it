import { RefreshTokenHttpClientDecorator } from "@/main/decorators/refresh-token-http-client-decorator";
import { makeLocalStorageAdapter } from "../cache/local-storage-cache";
import { makeAxiosHttpClient } from "../http";
import { makeAuthorizeHttpClient } from "./authorize-http-client";

export const makeRefreshTokenHttpClient = (): RefreshTokenHttpClientDecorator => new RefreshTokenHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAuthorizeHttpClient(),
    makeAxiosHttpClient()
);