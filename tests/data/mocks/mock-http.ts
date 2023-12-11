import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import faker from "faker";

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

export class HttpClientSpy<T = any> implements HttpClient {
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    response: HttpResponse<T> = {
        statusCode: HttpStatusCode.Ok
    }

    async request(params: HttpRequest): Promise<{ statusCode: HttpStatusCode; body?: any; }> {
        const { method, url, body, headers } = params;

        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;

        return this.response;
    }
}

