import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { AddressBookState } from "./store";
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

export const usersFetched = actionCreator<{
    users: ReadonlyArray<User>;
}>("UsersFetched");
