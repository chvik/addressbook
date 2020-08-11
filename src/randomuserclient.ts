import { User } from "./model";

const SEED = "veryfineseed";

export async function fetchUsers(
    page: number,
    results: number
): Promise<ReadonlyArray<User>> {
    const url = `https://randomuser.me/api/?page=${page}&results=${results}&seed=${SEED}`;
    const response = await fetch(url);
    if (response.ok) {
        const json = await response.json();
        return json["results"].map(createUserFromApiData);
    }
    throw new Error(`HTTP error ${response.status} in retrieving ${url}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createUserFromApiData(data: any): User {
    return {
        first: data["name"]["first"],
        last: data["name"]["last"],
        username: data["login"]["username"],
        email: data["email"],
        thumbnail: data["picture"]["thumbnail"],
    };
}
