import { ThunkDispatch } from "redux-thunk";
import { AddressBookState } from "./model";
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

        if (state.prefetchedUsers.length > 0) {
            dispatch(actions.usersFetchedFromPrefetch());
        } else {
            const prefetchedUsers = await fetchUsers(nextPage, BATCH_SIZE);
            dispatch(actions.usersPrefetched({ prefetchedUsers }));
            dispatch(actions.usersFetchedFromPrefetch());
        }

        const prefetchedUsers = await fetchUsers(nextPage + 1, BATCH_SIZE);
        dispatch(actions.usersPrefetched({ prefetchedUsers }));

        if (state.users.length >= MAX_LENGTH - BATCH_SIZE) {
            dispatch(actions.noMoreUsers());
        }
    }
}
