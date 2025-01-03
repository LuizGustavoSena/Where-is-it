import { AddAccount, RequestAddAccount } from "@/domain/usecases";

export class AddAccountSpy implements AddAccount {
    params: RequestAddAccount;
    callCounts = 0;

    async add(params: RequestAddAccount): Promise<void> {
        this.params = params;
        this.callCounts++;
    }
}