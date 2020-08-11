import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../App";

const mockStore = configureMockStore([]);

describe("App component", () => {
    it("greets you", () => {
        const store = mockStore({
            phase: "test phase",
        });
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.getByRole("banner")).toHaveTextContent(
            "Hello, this is a react app"
        );
        expect(screen.getByRole("status")).toHaveTextContent(
            "The state of the async action: test phase"
        );
    });
});
