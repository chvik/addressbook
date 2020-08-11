import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { App } from "../App";

describe("App component", () => {
    it("greets you", () => {
        render(<App />);
        expect(screen.getByRole("banner")).toHaveTextContent('Hello, this is a react app');
    });
});
