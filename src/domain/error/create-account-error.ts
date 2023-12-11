export class CreateAccountError extends Error {
    constructor() {
        super('Erro ao criar usuário');
        this.name = 'CreateAccountError';
    };
}