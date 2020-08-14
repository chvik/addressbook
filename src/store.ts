import { createStore, applyMiddleware, AnyAction } from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import { createRootReducer } from "./reducers";
import { AddressBookState } from "./model";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const addressBookStore = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware as ThunkMiddleware<AddressBookState, AnyAction>,
            routerMiddleware(history)
        )
    )
);
