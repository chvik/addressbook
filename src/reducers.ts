import { Action } from "redux";
import { isType } from "typescript-fsa";
import { AddressBookState, initialState } from "./store";
import * as actions from "./actions";

export const addressBookReducer = (
    state: AddressBookState = initialState,
    action: Action
) => {
    if (isType(action, actions.exampleAsyncAction.async.started)) {
        return {
            ...state,
            phase: "started",
        };
    }

    if (isType(action, actions.exampleAsyncAction.async.done)) {
        return {
            ...state,
            phase: "done",
        };
    }

    return state;
};
