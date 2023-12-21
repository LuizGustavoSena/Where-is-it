import { Zipcodes } from "../models/get-zipcodes";

export interface GetZipcodes {
    execute(): Promise<Zipcodes>;
}