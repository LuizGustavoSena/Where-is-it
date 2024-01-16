import Loading from "@/presentation/components/loading";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const makeSut = (show: boolean = false) => {
    return render(<Loading show={show} />);
};

describe('Loading', () => {
    it('Should correct loading if show is true', () => {
        const component = makeSut(true);

        expect(component).toBeTruthy();
    });
})