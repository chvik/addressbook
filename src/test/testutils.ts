import {
    uniqueNamesGenerator,
    Config,
    names,
    adjectives,
} from "unique-names-generator";
import { User } from "../model";

const uniqueNamesGeneratorConfig: Config = {
    dictionaries: [names, adjectives],
    length: 2,
    separator: " ",
    style: "capital",
};

export function getRandomTestUser(): User {
    const name = uniqueNamesGenerator(uniqueNamesGeneratorConfig);
    const [first, last] = name.split(" ");
    return {
        first: first,
        last: last,
        username: first.toLowerCase(),
        email: `${first.toLowerCase()}@${last.toLowerCase()}.com`,
        thumbnail: "https://picsum.photos/200",
    };
}

export function getSomeRandomTestUsers(n: number): ReadonlyArray<User> {
    return new Array(n).fill(null).map(() => getRandomTestUser());
}
