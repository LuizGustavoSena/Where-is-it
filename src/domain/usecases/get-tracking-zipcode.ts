import { TrackingZipcode } from "../models/get-tracking-zipcodes";

export interface GetTrackingZipcode {
    execute(code: string): Promise<TrackingZipcode>;
}