import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteAddAccount } from "@/data/usecases/remote-add-account";
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
    it('Should correct values', async () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response.statusCode = HttpStatusCode.Created;

        const request = mockRequestAddAccount();

        sut.add(request);

        expect(httpClientSpy.body).toEqual(request);
    })
})