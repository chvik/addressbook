import { AnyAction } from "redux";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import * as actions from "../actions";
import { AddressBookState } from "../store";

const middlewares = [thunk];
const mockStore = configureMockStore<
    AddressBookState,
    ThunkDispatch<AddressBookState, void, AnyAction>
>(middlewares);

describe("async actions", () => {
    it("creates exampleAstyncAction.started and done when dispatching exampleAsyncAction", () => {
        const store = mockStore({
            phase: "start",
            users: [],
        });
        const expectedActions = [
            actions.exampleAsyncAction.async.started(undefined),
            actions.exampleAsyncAction.async.done({
                params: undefined,
                result: 123,
            }),
        ];
        const act = actions.exampleAsyncAction();

        return store.dispatch(actions.exampleAsyncAction()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
