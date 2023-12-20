import { Zipcodes } from "../models/get-zipcodes";

export interface GetZipcodes {
    getZipcode(): Promise<Zipcodes>;
}