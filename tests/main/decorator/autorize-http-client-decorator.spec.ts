import { HttpRequest } from '@/data/protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { HttpClientSpy, mockRequest } from '@/tests/data/mocks';
import { GetStorageSpy } from '@/tests/data/mocks/mock-cache';
import { mockAccountModel } from '@/tests/domain/mocks/mock-account';
import * as faker from 'faker';
import { describe, expect, test } from 'vitest';

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

        expect(getStorageSpy.key).toBe('account')
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
            'x-access-token': getStorageSpy.value.accessToken
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
            'x-access-token': getStorageSpy.value.accessToken
        })
    })

    test('Should return the same result as HttpClient', async () => {
        const { sut, httpClientSpy } = makeSut()

        const httpResponse = await sut.request(mockRequest())

        expect(httpResponse).toEqual(httpClientSpy.response)
    })
})