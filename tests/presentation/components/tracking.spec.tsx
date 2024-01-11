import { ZipcodeProps } from "@/domain/models/get-zipcodes"
import Tracking from "@/presentation/components/tracking"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { mockItemZipcodes } from "../../domain/mocks/mock-zipcode"

const makeSut = (zipcodes: ZipcodeProps[] = mockItemZipcodes()) => {
    return render(<Tracking data={zipcodes} />)
}

describe('Tracking', () => {
    it('Should render component', () => {
        const component = makeSut();

        expect(component).toBeTruthy();
    });

    it('Should no content zipcodes', () => {
        const { getByTestId } = makeSut([]);

        const text = getByTestId("labelNoContent").textContent;

        expect(text).toBe('Você não possui rastreamentos');
    });
})