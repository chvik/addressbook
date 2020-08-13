import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserCard } from "../../components/UserCard";
import { getRandomTestUser } from "../testutils";

describe("UserCard component", () => {
    it("displays the data of the user", () => {
        const testUser = getRandomTestUser();
        render(
            <UserCard
                user={testUser}
                onActivated={() => {
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
            testUser.thumbnailPicture
        );
    });

    it("opens the detail modal when clicked on", () => {
        const testUser = getRandomTestUser();
        const callback = jest.fn();
        const { getByRole } = render(
            <UserCard user={testUser} onActivated={callback} />
        );
        fireEvent.click(getByRole("img"));
        expect(callback.mock.calls).toEqual([[testUser]]);
    });
});
