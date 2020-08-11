import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { addressBookStore } from "./store";
import * as actions from "./actions";
import { App } from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <Provider store={addressBookStore}>
        <App />
    </Provider>,
    document.getElementById("root")
);

addressBookStore.dispatch(actions.exampleAsyncAction());
