import axios from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): any => ({
    data: faker.random.objectElement(),
    status: faker.datatype.number()
})

export const mockAxios = () => {
    const mockedAxios = axios as any;
    mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
    return mockedAxios
}
