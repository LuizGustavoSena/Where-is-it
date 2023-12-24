import { CreateZipcodeModel } from "../models/create-zipcodes";

export interface CreateZipcode {
    execute(params: CreateZipcodeModel): Promise<void>;
}