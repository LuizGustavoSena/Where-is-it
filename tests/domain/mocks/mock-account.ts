
import * as faker from 'faker';
import { RequestAddAccount, ResponseLoginAccount } from '../usecases';

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