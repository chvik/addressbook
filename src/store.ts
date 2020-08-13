import { createStore, applyMiddleware, AnyAction } from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addressBookReducer } from "./reducers";
import { AddressBookState } from "./model";

export const addressBookStore = createStore(
    addressBookReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware as ThunkMiddleware<AddressBookState, AnyAction>
        )
    )
);
