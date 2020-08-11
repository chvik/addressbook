import configureMockStore from "redux-mock-store";
import { isType } from "typescript-fsa";
import { mocked } from "ts-jest/utils";
import { fetchUsers } from "../randomuserclient";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AddressBookState } from "../store";
import { AnyAction } from "redux";
import { getSomeRandomTestUsers } from "./testutils";
import * as actions from "../actions";

const middlewares = [thunk];
const mockStore = configureMockStore<
    AddressBookState,
    ThunkDispatch<AddressBookState, void, AnyAction>
>(middlewares);

jest.mock("../randomuserclient");
const fetchUsersMock = mocked(fetchUsers);

describe("userfetcher", () => {
    beforeEach(() => {
        fetchUsersMock.mockClear();
    });

    it("fetches another batch of users when it's needed", async () => {
        const store = mockStore({
            users: getSomeRandomTestUsers(50),
        });

        await store.dispatch(actions.moreUsers());

        expect(fetchUsersMock.mock.calls).toEqual([[2, 50]]);
        const triggeredActions = store.getActions();
        expect(
            triggeredActions.some((act) => isType(act, actions.usersFetched))
        ).toBeTruthy();
    });

    it("doesn't fetch more than 1000 users", async () => {
        const store = mockStore({
            users: getSomeRandomTestUsers(1000),
        });

        await store.dispatch(actions.moreUsers());
        expect(fetchUsersMock.mock.calls).toEqual([]);
    });
});
