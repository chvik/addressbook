import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { AddressBookState } from "./model";
import { User } from "./model";
import { fetchMore } from "./userfetcher";

const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<AddressBookState>(actionCreator);

export const moreUsers = asyncActionCreator<void, void>(
    "MoreUsers",
    async (params, dispatch, getState) => {
        await fetchMore(dispatch, getState());
    }
);

export const usersFetchedFromPrefetch = actionCreator<void>("UsersFetchedFromPrefetch");

export const usersPrefetched = actionCreator<{
    prefetchedUsers: ReadonlyArray<User>;
}>("UsersPrefetched");

export const noMoreUsers = actionCreator("NoMoreUsers");
