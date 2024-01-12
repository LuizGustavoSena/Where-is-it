import { ZipcodeProps } from "@/domain/models/get-zipcodes"
import Tracking from "@/presentation/components/tracking"
import { render } from "@testing-library/react"
import moment from "moment"
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

    it('Should zipcodes', () => {
        const zipcodes = mockItemZipcodes();
        const { getByTestId } = makeSut(zipcodes);

        const name = getByTestId("name").textContent;
        const date = getByTestId("date").textContent;
        const route = getByTestId("route").textContent;

        expect(name).toBe(zipcodes[0].name);
        expect(date).toBe(moment.utc(zipcodes[0].routes[0].date).format('DD/MM HH:mm'));
        expect(route).toBe(zipcodes[0].routes[0].start ? `${zipcodes[0].routes[0].start} para ${zipcodes[0].routes[0].end}`
            : `${zipcodes[0].routes[0].description}`);
    });
});