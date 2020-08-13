import {
    uniqueNamesGenerator,
    Config,
    names,
    adjectives,
} from "unique-names-generator";
import { User } from "../model";

const uniqueNamesGeneratorConfig: Config = {
    dictionaries: [names, adjectives, adjectives],
    length: 3,
    separator: " ",
    style: "capital",
};

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomTestUser(): User {
    const data = uniqueNamesGenerator(uniqueNamesGeneratorConfig);
    const [first, last, street] = data.split(" ");
    return {
        firstName: first,
        lastName: last,
        username: first.toLowerCase(),
        email: `${first.toLowerCase()}@${last.toLowerCase()}.com`,
        thumbnailPicture: "https://picsum.photos/200",
        largePicture: "https://picsum.photos/200",
        phone: "(1) 234 567890",
        cell: "(999) 1234 5678",
        location: {
            streetNumber: `${getRandomInt(100)}`,
            streetName: street,
            city: "Boston",
            postcode: `${10000 + getRandomInt(1000)}`,
            state: "Massachusetts",
        },
    };
}

export function getSomeRandomTestUsers(n: number): ReadonlyArray<User> {
    return new Array(n).fill(null).map(() => getRandomTestUser());
}
