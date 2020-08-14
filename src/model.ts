import { RouterState } from "connected-react-router";

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

export interface Settings {
    nationality: string;
}

export interface AddressBookState {
    users: ReadonlyArray<User>;
    prefetchedUsers: ReadonlyArray<User>;
    hasMore: boolean;
    modalState: ModalState;
    filterBy: string;
    settings: Settings;
}

export interface RootState {
    addressBook: AddressBookState;
    router: RouterState;
}

export const initialAddressBookState: AddressBookState = {
    users: [],
    prefetchedUsers: [],
    hasMore: true,
    modalState: {
        kind: "no-modal",
    },
    filterBy: "",
    settings: {
        nationality: "GB",
    },
};

export const nationalityOptions = [
    ["CH", "Swiss"],
    ["ES", "Spanish"],
    ["FR", "French"],
    ["GB", "British"],
];
