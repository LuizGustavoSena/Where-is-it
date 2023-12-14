export class LoginAccountError extends Error {
    constructor(message?: string) {
        super(message || 'Erro ao efetuar login');
        this.name = 'LoginAccountError';
    };
};