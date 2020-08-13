export interface User {
    thumbnail: string;
    first: string;
    last: string;
    username: string;
    email: string;
}

export interface AddressBookState {
    users: ReadonlyArray<User>;
    prefetchedUsers: ReadonlyArray<User>;
    hasMore: boolean;
}

export const initialState: AddressBookState = {
    users: [],
    prefetchedUsers: [],
    hasMore: true,
};
