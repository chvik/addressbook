import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, waitFor } from "@testing-library/react";
import { isType } from "typescript-fsa";
import "@testing-library/jest-dom";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { App } from "../components/App";
import { AddressBookState, initialState } from "../model";
import * as actions from "../actions";

const middlewares = [thunk];
const mockStore = configureMockStore<
    AddressBookState,
    ThunkDispatch<AddressBookState, void, AnyAction>
>(middlewares);

jest.mock("../randomuserclient");

describe("App component", () => {
    it("fetches a batch of users on start", async () => {
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        await waitFor(() =>
            expect(
                store
                    .getActions()
                    .some((act) => isType(act, actions.moreUsers.async.started))
            ).toBeTruthy()
        );
    });
});
