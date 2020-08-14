import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { initialAddressBookState, RootState } from "../../model";
import * as actions from "../../actions";
import { SettingsPage } from "../../components/SettingsPage";

const middlewares = [thunk];
const mockStore = configureMockStore<
    RootState,
    ThunkDispatch<RootState, void, AnyAction>
>(middlewares);

describe("SettingsPage component", () => {
    it("selects current nationality option", () => {
        const store = mockStore({
            addressBook: {
                ...initialAddressBookState,
                settings: {
                    nationality: "CH",
                }
            },
            router: null,
        });

        render(
            <Provider store={store}>
                <Router>
                    <SettingsPage />
                </Router>
            </Provider>
        );

        expect((screen.getByRole("listbox") as HTMLSelectElement).value).toEqual("CH");
    });

    it("changes nationality setting", () => {
        const store = mockStore({
            addressBook: initialAddressBookState,
            router: null,
        });

        const {getByRole} = render(
            <Provider store={store}>
                <Router>
                    <SettingsPage />
                </Router>
            </Provider>
        );

        fireEvent.change(getByRole("listbox"), { target: { value: "GB" }});

        expect(store.getActions()).toEqual([actions.nationalitySettingChanged({
            nationality: "GB",
        })]);
    })
});
