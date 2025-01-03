import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteAddAccount } from "@/data/usecases/remote-add-account";
import { CreateAccountError } from "@/domain/error/create-account-error";
import { describe, expect, it } from "vitest";
import { mockRequestAddAccount } from "../../domain/mocks/mock-account";
import { HttpClientSpy } from "../mocks";

type Props = {
    sut: RemoteAddAccount;
    httpClientSpy: HttpClientSpy;
}
const makeSut = (): Props => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAddAccount(httpClientSpy);

    return {
        sut,
        httpClientSpy
    }
};

describe('RemoteAddAccount', () => {
    it('Should correct values', () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response.statusCode = HttpStatusCode.Created;

        const request = mockRequestAddAccount();

        sut.add(request);

        expect(httpClientSpy.body).toEqual(request);
        expect(httpClientSpy.method).toBe('post');
        expect(httpClientSpy.url).toBe(`${import.meta.env.VITE_URL_API_AUTHENTICATION}/create_account`);
    });

    it('Should throw error if statusCode different 201', () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response.statusCode = HttpStatusCode.BadRequest;

        const request = mockRequestAddAccount();

        expect(sut.add(request)).rejects.toThrow(CreateAccountError);
    });
})