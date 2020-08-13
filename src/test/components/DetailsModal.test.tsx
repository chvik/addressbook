import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DetailsModal } from "../../components/DetailsModal";
import { getRandomTestUser } from "../testutils";

describe("DetailsModal component", () => {
    it("displays the data of the user", () => {
        const testUser = getRandomTestUser();
        render(
            <DetailsModal
                user={testUser}
                onClose={() => {
                    /* do nothing */
                }}
            />
        );
        expect(
            screen.getByText(`${testUser.firstName} ${testUser.lastName}`)
        ).toBeInTheDocument();
        expect(screen.getByText(testUser.username)).toBeInTheDocument();
        expect(screen.getByText(testUser.email)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute(
            "src",
            testUser.largePicture
        );
        expect(screen.getByText(testUser.phone)).toBeInTheDocument();
        expect(screen.getByText(testUser.cell)).toBeInTheDocument();
        const location = testUser.location;
        expect(
            screen.getByText(`${location.streetNumber} ${location.streetName}`)
        ).toBeInTheDocument();
        expect(screen.getByText(location.city)).toBeInTheDocument();
        expect(screen.getByText(location.postcode)).toBeInTheDocument();
        expect(screen.getByText(location.state)).toBeInTheDocument();
    });

    it("calls onClose when clicked on close button", () => {
        const testUser = getRandomTestUser();
        const callback = jest.fn();
        const { getByRole } = render(
            <DetailsModal user={testUser} onClose={callback} />
        );
        fireEvent.click(getByRole("button"));
        expect(callback).toBeCalled();
    });
});
