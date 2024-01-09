import faker from "faker";
import { CreateZipcodeModel } from "../models/create-zipcodes";
import { Zipcodes } from "../models/get-zipcodes";

export const mockRequestCreateZipcode = (): CreateZipcodeModel => {
    return {
        name: faker.name.firstName(),
        zipcode: faker.datatype.uuid()
    }
};

export const mockResponseGetZipcodes = (): Zipcodes => {
    return {
        zipcodes: [
            {
                code: faker.datatype.uuid(),
                name: faker.random.words(),
                routes: [
                    {
                        date: faker.date.recent().toString(),
                        description: faker.datatype.string(),
                        end: faker.address.cityName(),
                        start: faker.address.cityName()
                    }
                ],
                status: faker.random.words()
            }
        ]
    }
};