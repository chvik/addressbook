import { createStore, applyMiddleware, AnyAction } from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { addressBookReducer } from "./reducers";
import { User } from "./model";
import { getSomeRandomTestUsers } from "./test/testutils";

export interface AddressBookState {
    phase: string;
    users: ReadonlyArray<User>;
}

export const initialState: AddressBookState = {
    phase: "not started",
    users: getSomeRandomTestUsers(16),
};

export const addressBookStore = createStore(
    addressBookReducer,
    applyMiddleware(
        thunkMiddleware as ThunkMiddleware<AddressBookState, AnyAction>
    )
);
