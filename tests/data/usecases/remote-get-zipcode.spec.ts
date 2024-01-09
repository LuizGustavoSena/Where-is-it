import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteGetZipcodes } from "@/data/usecases/remote-get-zipcodes";
import { describe, expect, it } from "vitest";
import { mockResponseGetZipcodes } from "../../domain/mocks/mock-zipcode";
import { HttpClientSpy } from "../mocks";

type Props = {
    sut: RemoteGetZipcodes;
    httpClientSpy: HttpClientSpy;
};

const makeSut = (): Props => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteGetZipcodes(httpClientSpy);

    return {
        sut,
        httpClientSpy
    }
};

describe('RemoteCreateZipcode', () => {
    it('Should correct values', async () => {
        const { sut, httpClientSpy } = makeSut();

        const responseMock = mockResponseGetZipcodes();

        httpClientSpy.response.body = responseMock;

        const response = await sut.execute();

        expect(response).toEqual(responseMock);
        expect(httpClientSpy.method).toBe('get');
        expect(httpClientSpy.url).toBe(`${import.meta.env.VITE_URL_API_ZIPCODE}/zipcode`);
    });

    it('Should correct response if empty zipcodes', async () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response.statusCode = HttpStatusCode.NOCONTENT;

        const response = await sut.execute();

        expect(response).toEqual({ zipcodes: [] });
    });
});