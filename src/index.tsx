import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { addressBookStore } from "./store";
import * as actions from "./actions";
import { App } from "./App";

ReactDOM.render(
    <Provider store={addressBookStore}>
        <App />
    </Provider>,
    document.getElementById("root")
);

addressBookStore.dispatch(actions.exampleAsyncAction());
