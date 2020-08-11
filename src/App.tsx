import React from "react";
import { useSelector } from "react-redux";
import { State } from "./store";

export function App() {
    const phase = useSelector<State>((state) => state.phase);
    return (
        <div>
            <div role="banner">Hello, this is a react app</div>
            <div role="status">The state of the async action: {phase}</div>
        </div>
    );
}
