import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserCard } from "../components/UserCard";
import { getRandomTestUser } from "./testutils";

describe("UserCard component", () => {
    it("displays the data of the user", () => {
        const testUser = getRandomTestUser();
        render(<UserCard user={testUser} />);
        expect(
            screen.getByText(`${testUser.first} ${testUser.last}`)
        ).toBeInTheDocument();
        expect(screen.getByText(testUser.username)).toBeInTheDocument();
        expect(screen.getByText(testUser.email)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute(
            "src",
            testUser.thumbnail
        );
    });
});
