import { ThunkDispatch } from "redux-thunk";
import { AddressBookState } from "./store";
import { AnyAction } from "redux";
import { fetchUsers } from "./randomuserclient";
import * as actions from "./actions";

const BATCH_SIZE = 50;
const MAX_LENGTH = 1000;

export async function fetchMore(
    dispatch: ThunkDispatch<AddressBookState, void, AnyAction>,
    state: AddressBookState
): Promise<void> {
    if (state.users.length < MAX_LENGTH) {
        const nextPage = Math.floor(state.users.length / BATCH_SIZE) + 1;
        const users = await fetchUsers(nextPage, BATCH_SIZE);
        dispatch(actions.usersFetched({ users }));
    }
}
