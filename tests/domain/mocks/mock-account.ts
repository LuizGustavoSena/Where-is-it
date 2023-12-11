
import * as faker from 'faker'
import { ResponseLoginAccount } from '../usecases'

export const mockAccountModel = (): ResponseLoginAccount => ({
    token: faker.datatype.uuid(),
})