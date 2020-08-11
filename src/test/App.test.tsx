import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../components/App";

const mockStore = configureMockStore([]);

describe("App component", () => {
    it("renders", () => {
        const store = mockStore({
            phase: "test phase",
            users: [],
        });
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });
});
