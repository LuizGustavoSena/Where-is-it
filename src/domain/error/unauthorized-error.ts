export class UnauthorizedError extends Error {
    constructor() {
        super('Autenticação falhou');
        this.name = 'UnauthorizedError';
    };
};