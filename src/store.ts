import { createStore, applyMiddleware, AnyAction } from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addressBookReducer } from "./reducers";
import { User } from "./model";

export interface AddressBookState {
    users: ReadonlyArray<User>;
}

export const initialState: AddressBookState = {
    users: [],
};

export const addressBookStore = createStore(
    addressBookReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware as ThunkMiddleware<AddressBookState, AnyAction>
        )
    )
);
