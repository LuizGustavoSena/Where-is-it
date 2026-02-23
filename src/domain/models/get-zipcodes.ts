export type Zipcodes = {
    zipcodes: ZipcodeProps[];
}

export type ZipcodeProps = {
    id: string;
    name: string;
    code: string;
}

export type RouteProps = {
    start: string;
    end: string;
    date: string;
    description: string;
}