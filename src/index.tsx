import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { addressBookStore } from "./store";
import { App } from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./less/addressbook.less";

ReactDOM.render(
    <Provider store={addressBookStore}>
        <App />
    </Provider>,
    document.getElementById("root")
);
