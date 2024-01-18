import { HttpRequest } from '@/data/protocols/http';
import { EnumCache } from '@/domain/enums';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import * as faker from 'faker';
import { describe, expect, test } from 'vitest';
import { GetStorageSpy, HttpClientSpy, mockRequest } from '../../data/mocks';
import { mockAccountModel } from '../../domain/mocks/mock-account';

type SutTypes = {
    sut: AuthorizeHttpClientDecorator
    getStorageSpy: GetStorageSpy
    httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const httpClientSpy = new HttpClientSpy()
    const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)
    return {
        sut,
        getStorageSpy,
        httpClientSpy
    }
}

describe('AuthorizeHttpGetClientDecorator', () => {
    test('Should call GetStorage with correct value', async () => {
        const { sut, getStorageSpy } = makeSut()

        await sut.request(mockRequest())

        expect(getStorageSpy.key).toBe(EnumCache.AUTH_CACHE)
    })

    test('Should not add headers if GetStorage is invalid', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpRequest: HttpRequest = {
            url: faker.internet.url(),
            method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
            headers: {
                field: faker.random.words()
            }
        }

        await sut.request(httpRequest)

        expect(httpClientSpy.url).toBe(httpRequest.url)
        expect(httpClientSpy.method).toBe(httpRequest.method)
        expect(httpClientSpy.headers).toEqual(httpRequest.headers)
    })

    test('Should add headers to HttpClient', async () => {
        const { sut, getStorageSpy, httpClientSpy } = makeSut()
        getStorageSpy.value = mockAccountModel()
        const httpRequest: HttpRequest = {
            url: faker.internet.url(),
            method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
        }

        await sut.request(httpRequest)

        expect(httpClientSpy.url).toBe(httpRequest.url)
        expect(httpClientSpy.method).toBe(httpRequest.method)
        expect(httpClientSpy.headers).toEqual({
            'Authorization': getStorageSpy.value.token
        })
    })

    test('Should merge headers to HttpClient', async () => {
        const { sut, getStorageSpy, httpClientSpy } = makeSut()
        getStorageSpy.value = mockAccountModel()
        const field = faker.random.words()
        const httpRequest: HttpRequest = {
            url: faker.internet.url(),
            method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
            headers: {
                field
            }
        }

        await sut.request(httpRequest)

        expect(httpClientSpy.url).toBe(httpRequest.url)
        expect(httpClientSpy.method).toBe(httpRequest.method)
        expect(httpClientSpy.headers).toEqual({
            field,
            'Authorization': getStorageSpy.value.token
        })
    })

    test('Should return the same result as HttpClient', async () => {
        const { sut, httpClientSpy } = makeSut()

        const httpResponse = await sut.request(mockRequest())

        expect(httpResponse).toEqual(httpClientSpy.response)
    })
})