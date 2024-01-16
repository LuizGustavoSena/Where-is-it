import Loading from "@/presentation/components/loading";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const makeSut = (show: boolean = false) => {
    return render(<Loading show={show} />);
};

describe('Loading', () => {
    it('Should correct loading if show is true', () => {
        const { getByTestId } = makeSut(true);

        const message = getByTestId('messageLoad').textContent;

        expect(message).toBe('Carregando...');
    });

    it('Should correct loading if show is false', () => {
        const { getByTestId } = makeSut();
        let message: string;

        try {
            message = getByTestId('messageLoad').textContent;
        } catch (error) {
            message = null;
        }

        expect(message).toBeNull();
    });
})