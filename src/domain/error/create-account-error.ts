export class CreateAccountError extends Error {
    constructor(message?: string) {
        super(message || 'Erro ao criar usuário');
        this.name = 'CreateAccountError';
    };
}