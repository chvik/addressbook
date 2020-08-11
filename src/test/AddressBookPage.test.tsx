import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, screen, waitFor } from "@testing-library/react";
import { isType } from "typescript-fsa";
import "@testing-library/jest-dom";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AddressBookPage } from "../components/AddressBookPage";
import { AddressBookState } from "../store";
import * as actions from "../actions";

const middlewares = [thunk];
const mockStore = configureMockStore<
    AddressBookState,
    ThunkDispatch<AddressBookState, void, AnyAction>
>(middlewares);

jest.mock("../randomuserclient");

describe("AddressBookPage component", () => {
    it("fetches a batch of users on start", async () => {
        const store = mockStore({
            users: [],
        });

        render(
            <Provider store={store}>
                <AddressBookPage />
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

    it("when loading more users a loading spinner is displayed", async () => {
        const store = mockStore({
            users: [],
        });

        render(
            <Provider store={store}>
                <AddressBookPage />
            </Provider>
        );

        store.dispatch(actions.moreUsers());

        expect(screen.getAllByRole("status")[1]).toHaveTextContent("Loading");
    });
});
