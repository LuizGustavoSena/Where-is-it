export type Zipcodes = {
    zipcodes: ZipcodeProps[];
}

export type ZipcodeProps = {
    name: string;
    code: string;
    status: string;
}

export type RouteProps = {
    start: string;
    end: string;
    date: string;
    description: string;
}