export class GetZipcodesError extends Error {
    constructor(message?: string) {
        super(message || 'Erro ao consultar rastreamentos');
        this.name = 'GetZipcodesError';
    };
}