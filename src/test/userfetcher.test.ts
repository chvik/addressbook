import configureMockStore from "redux-mock-store";
import { isType } from "typescript-fsa";
import { mocked } from "ts-jest/utils";
import { fetchUsers } from "../randomuserclient";
import thunk, { ThunkDispatch } from "redux-thunk";
import { initialAddressBookState, RootState } from "../model";
import { AnyAction } from "redux";
import { getSomeRandomTestUsers } from "./testutils";
import * as actions from "../actions";

const middlewares = [thunk];
const mockStore = configureMockStore<
    RootState,
    ThunkDispatch<RootState, void, AnyAction>
>(middlewares);

jest.mock("../randomuserclient");
const fetchUsersMock = mocked(fetchUsers);

describe("userfetcher", () => {
    beforeEach(() => {
        fetchUsersMock.mockClear();
    });

    it("doesn't fetch more than 1000 users", async () => {
        const store = mockStore({
            addressBook: {
                ...initialAddressBookState,
                users: getSomeRandomTestUsers(1000),
            },
            router: null,
        });

        await store.dispatch(actions.moreUsers());
        expect(fetchUsersMock.mock.calls).toEqual([]);
    });

    it("prefetches a batch of users", async () => {
        const store = mockStore({
            addressBook: initialAddressBookState,
            router: null,
        });

        await store.dispatch(actions.moreUsers());

        const triggeredActions = store.getActions();
        expect(
            triggeredActions.some((act) =>
                isType(act, actions.usersFetchedFromPrefetch)
            )
        ).toBeTruthy();
        expect(
            triggeredActions.some((act) => isType(act, actions.usersPrefetched))
        ).toBeTruthy();
    });

    it("triggers hasNoMore action when fetched users reach 1000", async () => {
        const store = mockStore({
            addressBook: {
                ...initialAddressBookState,
                users: getSomeRandomTestUsers(950),
            },
            router: null,
        });

        await store.dispatch(actions.moreUsers());
        expect(
            store.getActions().some((act) => isType(act, actions.noMoreUsers))
        );
    });
});
