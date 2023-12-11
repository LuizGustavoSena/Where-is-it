
export interface LoginAccount {
    auth: (params: RequestLoginAccount) => Promise<ResponseLoginAccount>
}

export type RequestLoginAccount = {
    email: string
    password: string
}

export type ResponseLoginAccount = {
    token: string
}