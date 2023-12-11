export interface AddAccount {
    add: (params: RequestAddAccount) => Promise<void>;
};

export type RequestAddAccount = {
    username: string;
    email: string;
    password: string;
};