import { AuthorizeHttpClientDecorator } from "@/main/decorators";
import { makeLocalStorageAdapter } from "../cache/local-storage-cache";
import { makeAxiosHttpClient } from "../http";

export const makeAuthorizeHttpClient = (): AuthorizeHttpClientDecorator => new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
);