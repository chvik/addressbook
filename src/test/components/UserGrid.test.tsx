import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserGrid } from "../../components/UserGrid";
import { getSomeRandomTestUsers } from "../testutils";
import { initialState } from "../../model";

const mockStore = configureMockStore([]);

describe("UserGrid component", () => {
    it("renders user cards in a grid", () => {
        const users = getSomeRandomTestUsers(10);
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <UserGrid users={users} />
            </Provider>
        );
        expect(screen.getAllByRole("cell").length).toEqual(users.length);
    });
});
