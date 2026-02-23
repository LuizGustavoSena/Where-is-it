import { RouteProps } from "./get-zipcodes";

export type TrackingZipcode = {
    code: string;
    routes: RouteProps[];
}

export type TrackingZipcodeProps = {
    trackingRoute: TrackingZipcode;
}

export type getRoutesParams = {
    code: string;
    index: number;
}