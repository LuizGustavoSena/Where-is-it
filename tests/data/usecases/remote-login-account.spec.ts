import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteLoginAccount } from "@/data/usecases/remote-login-account";
import { LoginAccountError } from "@/domain/error/login-account-error";
import { describe, expect, it } from "vitest";
import { mockRequestLoginAccount, mockResponseLoginAccount } from "../../domain/mocks/mock-account";
import { HttpClientSpy } from "../mocks";

type Props = {
    sut: RemoteLoginAccount;
    httpClientSpy: HttpClientSpy;
};

const makeSut = (): Props => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteLoginAccount(httpClientSpy);

    return {
        sut,
        httpClientSpy
    }
};

describe('RemoteLoginAccount', () => {
    it('Should correct values', async () => {
        const { sut, httpClientSpy } = makeSut();

        const responseMock = mockResponseLoginAccount();

        httpClientSpy.response.statusCode = HttpStatusCode.Created;
        httpClientSpy.response.body = responseMock;

        const request = mockRequestLoginAccount();

        const response = await sut.auth(request);

        expect(httpClientSpy.body).toEqual(request);
        expect(httpClientSpy.method).toBe('post');
        expect(httpClientSpy.url).toBe(`${import.meta.env.VITE_URL_API_AUTHENTICATION}/login_account`);
        expect(response).toEqual(responseMock);
    });

    it('Should correct error if statusCode differents 201', async () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response.statusCode = HttpStatusCode.ServerError;

        const request = mockRequestLoginAccount();

        await expect(sut.auth(request)).rejects.toThrow(LoginAccountError);
    });
});