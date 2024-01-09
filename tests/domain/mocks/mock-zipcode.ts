import faker from "faker";
import { CreateZipcodeModel } from "../models/create-zipcodes";

export const mockRequestCreateZipcode = (): CreateZipcodeModel => {
    return {
        name: faker.name.firstName(),
        zipcode: faker.address.zipCode()
    }
};