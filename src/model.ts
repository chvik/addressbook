export interface Location {
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    postcode: string;
}

export interface User {
    thumbnailPicture: string;
    largePicture: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    location: Location;
    phone: string;
    cell: string;
}

export type ModalState =
    | {
          kind: "no-modal";
      }
    | {
          kind: "details-modal";
          user: User;
      };

export interface AddressBookState {
    users: ReadonlyArray<User>;
    prefetchedUsers: ReadonlyArray<User>;
    hasMore: boolean;
    modalState: ModalState;
    filterBy: string;
}

export const initialState: AddressBookState = {
    users: [],
    prefetchedUsers: [],
    hasMore: true,
    modalState: {
        kind: "no-modal",
    },
    filterBy: "",
};
