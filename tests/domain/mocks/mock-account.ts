
import * as faker from 'faker';
import { RequestAddAccount, RequestLoginAccount, ResponseLoginAccount } from '../usecases';

export const mockAccountModel = (): ResponseLoginAccount => ({
    token: faker.datatype.uuid(),
});

export const mockRequestAddAccount = (): RequestAddAccount => {
    return {
        email: faker.internet.email(),
        password: faker.random.words(),
        username: faker.name.firstName()
    };
};

export const mockRequestLoginAccount = (): RequestLoginAccount => {
    return {
        email: faker.internet.email(),
        password: faker.random.words()
    };
};

export const mockResponseLoginAccount = (): ResponseLoginAccount => {
    return {
        token: faker.random.words()
    };
};