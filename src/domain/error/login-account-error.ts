export class LoginAccountError extends Error {
    constructor() {
        super('Erro ao efetuar login');
        this.name = 'LoginAccountError';
    };
};