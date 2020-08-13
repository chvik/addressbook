import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { User, AddressBookState } from "../model";
import * as actions from "../actions";
import { UserCard } from "./UserCard";

const N_COLS = 6;

export const UserGrid: React.FunctionComponent = () => {
    const users = useSelector<AddressBookState, ReadonlyArray<User>>(
        (state) => state.users
    );
    const slicedUsers = sliceArray(users, N_COLS);
    const dispatch = useDispatch();

    return (
        <Container>
            {slicedUsers.map((row, i) => (
                <Row key={i} xl={3} md={2} xs={1}>
                    {row.map((user) => {
                        const onActivated = () => {
                            dispatch(actions.userActivated(user));
                        };
                        return (
                            <Col key={user.username} className="mb-4">
                                <UserCard
                                    user={user}
                                    onActivated={onActivated}
                                />
                            </Col>
                        );
                    })}
                </Row>
            ))}
        </Container>
    );
};

function sliceArray<T>(
    array: ReadonlyArray<T>,
    chunk: number
): Array<Array<T>> {
    const slices: Array<Array<T>> = [];
    for (let i = 0; i < array.length; i += chunk) {
        slices.push(array.slice(i, i + chunk));
    }
    return slices;
}
