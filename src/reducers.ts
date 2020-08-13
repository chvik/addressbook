import { Action } from "redux";
import { isType } from "typescript-fsa";
import { AddressBookState, initialState } from "./model";
import * as actions from "./actions";

export const addressBookReducer = (
    state: AddressBookState = initialState,
    action: Action
): AddressBookState => {
    if (isType(action, actions.usersPrefetched)) {
        return {
            ...state,
            prefetchedUsers: action.payload.prefetchedUsers,
        };
    }

    if (isType(action, actions.usersFetchedFromPrefetch)) {
        return {
            ...state,
            users: [...state.users, ...state.prefetchedUsers],
            prefetchedUsers: [],
        };
    }

    if (isType(action, actions.noMoreUsers)) {
        return {
            ...state,
            hasMore: false,
        };
    }

    return state;
};
