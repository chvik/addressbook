import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { AddressBookState } from "./store";
import { fetchUsers } from "./randomuserclient";
import { User } from "./model";

const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<AddressBookState>(actionCreator);

export const exampleAsyncAction = asyncActionCreator<{}, number>(
    "ExampleAsync",
    async () => {
        return Promise.resolve(123);
    }
);

export const moreUsers = asyncActionCreator<{}, ReadonlyArray<User>>(
    "MoreUsers",
    async () => {
        return fetchUsers(1, 50);
    }
);
