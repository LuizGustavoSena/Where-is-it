import CreateAccount from "@/presentation/pages/create-account";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AddAccountSpy } from "../../domain/mocks/add-accountSpy";

type Props = {

}
const makeSut = () => {
    const addAcountSpy = new AddAccountSpy();
    const sut = render(<CreateAccount addAccount={addAcountSpy} />);

    return {
        sut,
        addAcountSpy
    }
};

describe('CreateAccount', () => {
    it('Should correct loading if show is true', () => {
        const { sut } = makeSut();

        expect(sut).toBeTruthy();
    });
})