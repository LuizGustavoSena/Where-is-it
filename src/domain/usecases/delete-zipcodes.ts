export interface DeleteZipcode {
    execute(code: string): Promise<void>;
}