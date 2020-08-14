import { addressBookReducer } from "../reducers";
import * as actions from "../actions";
import { getSomeRandomTestUsers } from "./testutils";
import { AddressBookState, initialAddressBookState } from "../model";

describe("Reducer", () => {
    it("stores the prefetched users", () => {
        const nextState = addressBookReducer(
            initialAddressBookState,
            actions.usersPrefetched({
                prefetchedUsers: getSomeRandomTestUsers(50),
            })
        );
        expect(nextState.prefetchedUsers.length).toEqual(50);
    });

    it("uses prefetched users when available", () => {
        const prevState: AddressBookState = {
            ...initialAddressBookState,
            prefetchedUsers: getSomeRandomTestUsers(50),
        };
        const { users, prefetchedUsers } = addressBookReducer(
            prevState,
            actions.usersFetchedFromPrefetch()
        );
        expect(users).toEqual(prevState.prefetchedUsers);
        expect(prefetchedUsers).toEqual([]);
    });

    it("sets hasMore to false when user list reaches the end", () => {
        const { hasMore } = addressBookReducer(
            initialAddressBookState,
            actions.noMoreUsers()
        );
        expect(hasMore).toBeFalsy();
    });
});
