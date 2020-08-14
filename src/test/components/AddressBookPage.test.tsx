import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, screen, waitFor } from "@testing-library/react";
import { isType } from "typescript-fsa";
import "@testing-library/jest-dom";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AddressBookPage } from "../../components/AddressBookPage";
import { initialAddressBookState, RootState } from "../../model";
import * as actions from "../../actions";
import { getRandomTestUser } from "../testutils";
import { BrowserRouter as Router } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureMockStore<
    RootState,
    ThunkDispatch<RootState, void, AnyAction>
>(middlewares);

jest.mock("../../randomuserclient");

describe("AddressBookPage component", () => {
    it("fetches a batch of users on start", async () => {
        const store = mockStore({
            addressBook: initialAddressBookState,
            router: null,
        });

        render(
            <Provider store={store}>
                <Router>
                    <AddressBookPage />
                </Router>
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
            addressBook: initialAddressBookState,
            router: null,
        });

        render(
            <Provider store={store}>
                <Router>
                    <AddressBookPage />
                </Router>
            </Provider>
        );

        store.dispatch(actions.moreUsers());

        expect(screen.getAllByRole("status")[1]).toHaveTextContent("Loading");
    });

    it("activating a user card opens a modal", () => {
        const store = mockStore({
            addressBook: {
                ...initialAddressBookState,
                modalState: {
                    kind: "details-modal",
                    user: getRandomTestUser(),
                },
            },
            router: null,
        });

        render(
            <Provider store={store}>
                <Router>
                    <AddressBookPage />
                </Router>
            </Provider>
        );

        expect(screen.queryByRole("dialog")).toBeVisible();
    });
});
