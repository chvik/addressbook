import { Action } from "redux";
import { isType } from "typescript-fsa";
import { AddressBookState, initialState } from "./store";
import * as actions from "./actions";

export const addressBookReducer = (
    state: AddressBookState = initialState,
    action: Action
): AddressBookState => {
    if (isType(action, actions.usersFetched)) {
        return {
            ...state,
            users: [...state.users, ...action.payload.users],
        };
    }

    return state;
};
