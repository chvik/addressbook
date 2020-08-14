import { Action, combineReducers } from "redux";
import { isType } from "typescript-fsa";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { AddressBookState, initialAddressBookState } from "./model";
import * as actions from "./actions";

export const addressBookReducer = (
    state: AddressBookState = initialAddressBookState,
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

    if (isType(action, actions.userActivated)) {
        return {
            ...state,
            modalState: {
                kind: "details-modal",
                user: action.payload,
            },
        };
    }

    if (isType(action, actions.detailsToClose)) {
        return {
            ...state,
            modalState: {
                kind: "no-modal",
            },
        };
    }

    if (isType(action, actions.filterBy)) {
        return {
            ...state,
            filterBy: action.payload.filterString.trim(),
        };
    }

    if (isType(action, actions.nationalitySettingChanged)) {
        if (action.payload.nationality !== state.settings.nationality) {
            return {
                ...state,
                users: [],
                prefetchedUsers: [],
                settings: {
                    ...state.settings,
                    nationality: action.payload.nationality,
                },
            };
        } else {
            return state;
        }
    }

    return state;
};

export const createRootReducer = (
    history: History
): ReturnType<typeof combineReducers> =>
    combineReducers({
        router: connectRouter(history),
        addressBook: addressBookReducer,
    });
