import Loading from "@/presentation/components/loading";
import { render } from "@testing-library/react";
import faker from "faker";
import { describe, expect, it } from "vitest";

type Props = {
    show?: boolean;
    message?: string;
}
const makeSut = (params?: Props) => {
    console.log({ params })
    return render(<Loading
        show={params?.show}
        message={params?.message}
    />);
};

describe('Loading', () => {
    it('Should correct loading if show is true', () => {
        const { getByTestId } = makeSut({ show: true });

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

    it('Should correct message loading if message parans exist', () => {
        const message = faker.random.words();
        const { getByTestId } = makeSut({ show: true, message });

        const messageTitle = getByTestId('messageLoad').textContent;

        expect(messageTitle).toBe(message);
    });
})