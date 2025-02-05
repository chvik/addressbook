import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { RootState } from "./model";
import { User } from "./model";
import { fetchMore } from "./userfetcher";

const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<RootState>(actionCreator);

export const moreUsers = asyncActionCreator<void, void>(
    "MoreUsers",
    async (params, dispatch, getState) => {
        await fetchMore(dispatch, getState());
    }
);

export const usersFetchedFromPrefetch = actionCreator<void>(
    "UsersFetchedFromPrefetch"
);

export const usersPrefetched = actionCreator<{
    prefetchedUsers: ReadonlyArray<User>;
}>("UsersPrefetched");

export const noMoreUsers = actionCreator("NoMoreUsers");

export const userActivated = actionCreator<User>("UserActivated");

export const detailsToClose = actionCreator("DetailsToClose");

export const filterBy = actionCreator<{
    filterString: string;
}>("FilterBy");

export const nationalitySettingChanged = actionCreator<{
    nationality: string;
}>("NationalitySettingChanged");
