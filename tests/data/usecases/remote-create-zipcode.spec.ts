import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteCreateZipcode } from "@/data/usecases/remote-create-zipcode";
import { CreateZipcodeError } from "@/domain/error/create-zipcode-error";
import { describe, expect, it } from "vitest";
import { mockRequestCreateZipcode } from "../../domain/mocks/mock-zipcode";
import { HttpClientSpy } from "../mocks";

type Props = {
    sut: RemoteCreateZipcode;
    httpClientSpy: HttpClientSpy;
};

const makeSut = (): Props => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteCreateZipcode(httpClientSpy);

    return {
        sut,
        httpClientSpy
    }
};

describe('RemoteCreateZipcode', () => {
    it('Should correct values', () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response.statusCode = HttpStatusCode.Created;

        const request = mockRequestCreateZipcode();

        sut.execute(request);

        expect(httpClientSpy.body).toEqual(request);
        expect(httpClientSpy.method).toBe('post');
        expect(httpClientSpy.url).toBe(`${import.meta.env.VITE_URL_API_ZIPCODE}/create_zipcode`);
    });

    it('Should throw error if statusCode different 201', () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response.statusCode = HttpStatusCode.BadRequest;

        const request = mockRequestCreateZipcode();

        expect(sut.execute(request)).rejects.toThrow(CreateZipcodeError);
    });
})