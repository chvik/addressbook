import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/utils";
import { App } from "../components/App";
import { fetchUsers } from "../randomuserclient";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AddressBookState } from "../store";
import { AnyAction } from "redux";

const middlewares = [thunk];
const mockStore = configureMockStore<
    AddressBookState,
    ThunkDispatch<AddressBookState, void, AnyAction>
>(middlewares);

jest.mock("../randomuserclient");

describe("App component", () => {
    it("renders", () => {
        const store = mockStore({
            phase: "test phase",
            users: [],
        });
        render(
            <Provider store={store}>
                x
                <App />
            </Provider>
        );
    });

    it("fetches a batch of users on start", () => {
        const store = mockStore({
            phase: "test phase",
            users: [],
        });

        const fetchUsersMock = mocked(fetchUsers);

        render(
            <Provider store={store}>
                x
                <App />
            </Provider>
        );

        expect(fetchUsersMock.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
});
