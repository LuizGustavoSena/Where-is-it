import { RouteProps } from "./get-zipcodes";

export type TrackingZipcode = {
    code: string;
    routes: RouteProps[];
}

export type TrackingZipcodeProps = {
    trackingRoute: TrackingZipcode;
}