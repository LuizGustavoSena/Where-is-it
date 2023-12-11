import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import * as faker from "faker";

type RequestProps = {
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    url?: string;
    body?: any;
    headers?: any;
}
export const mockRequest = (params?: RequestProps): HttpRequest => {
    return {
        method: params?.method ?? faker.random.arrayElement(['get', 'post', 'put', 'delete', 'patch']),
        url: params?.url ?? faker.internet.url(),
        body: params?.body ?? faker.random.objectElement(),
        headers: params?.headers ?? faker.random.objectElement(),
    }
}

export class HttpClientSpy implements HttpClient {
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    response: HttpResponse<any> = {
        statusCode: HttpStatusCode.Ok
    }

    async request<T = any>(params: HttpRequest): Promise<{ statusCode: HttpStatusCode; body?: T; }> {
        const { method, url, body, headers } = params;

        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;

        return this.response;
    }
}

