import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserGrid } from "../components/UserGrid";
import { getSomeRandomTestUsers } from "./testutils";

const mockStore = configureMockStore([]);

describe("UserGrid component", () => {
    it("renders user cards in a grid", () => {
        const users = getSomeRandomTestUsers(10);
        const store = mockStore({
            phase: "",
            users,
        });
        render(
            <Provider store={store}>
                <UserGrid />
            </Provider>
        );
        expect(screen.getAllByRole("cell").length).toEqual(users.length);
    });
});
