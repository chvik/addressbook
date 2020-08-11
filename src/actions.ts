import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { AddressBookState } from "./store";

const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<AddressBookState>(actionCreator);

export const exampleAsyncAction = asyncActionCreator<{}, number>(
    "ExampleAsync",
    async () => {
        return Promise.resolve(123);
    }
);
