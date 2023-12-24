export class CreateZipcodeError extends Error {
    constructor(message?: string) {
        super(message || 'Erro ao criar rastreamento');
        this.name = 'CreateZipcodeError';
    };
}