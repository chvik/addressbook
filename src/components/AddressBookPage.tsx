import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserGrid } from "./UserGrid";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import * as actions from "../actions";
import { AddressBookState, ModalState, User } from "../model";
import { DetailsModal } from "./DetailsModal";

export const AddressBookPage: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.moreUsers());
    }, []);

    const users = useSelector<AddressBookState, ReadonlyArray<User>>(
        (state) => state.users
    );
    const hasMore = useSelector<AddressBookState, boolean>(
        (state) => state.hasMore
    );
    const modalState = useSelector<AddressBookState, ModalState>(
        (state) => state.modalState
    );
    const filterBy = useSelector<AddressBookState, string>(
        (state) => state.filterBy
    );

    const loadMore = useCallback(() => {
        dispatch(actions.moreUsers());
    }, []);

    const onCloseDetails = useCallback(() => {
        dispatch(actions.detailsToClose());
    }, []);

    const onSearchChange = useCallback((event) => {
        dispatch(
            actions.filterBy({
                filterString: event.target.value,
            })
        );
    }, []);

    const filterOn = filterBy.length > 0;
    const filteredUsers = filterOn ? filterUsers(users, filterBy) : users;

    return (
        <div>
            <Navbar bg="light" expand="lg" className="sticky-top">
                <Navbar.Brand>Address Book</Navbar.Brand>
                <Form inline className="m-2">
                    <Form.Group controlId="search">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="m-2"
                            onChange={onSearchChange}
                        />
                    </Form.Group>
                </Form>
            </Navbar>
            <InfiniteScroll
                dataLength={filteredUsers.length}
                next={loadMore}
                hasMore={hasMore && !filterOn}
                loader={<LoadingMessage />}
                endMessage={
                    hasMore && filterOn ? <FilteredMessage /> : <EndMessage />
                }
            >
                <UserGrid users={filteredUsers} />
            </InfiniteScroll>
            {modalState.kind === "details-modal" ? (
                <DetailsModal user={modalState.user} onClose={onCloseDetails} />
            ) : null}
        </div>
    );
};

const LoadingMessage: React.FunctionComponent = () => {
    return (
        <Row className="justify-content-center mb-4">
            <Col className="flex-grow-0 pr-1">
                <Spinner animation="border" role="status"></Spinner>
            </Col>
            <Col className="m-1 pl-1 flex-grow-0">
                <div role="status">Loading…</div>
            </Col>
        </Row>
    );
};

const EndMessage: React.FunctionComponent = () => {
    return (
        <Row className="justify-content-center mb-4">
            <Col>
                <div role="status" className="text-center text-info">
                    End of users catalog
                </div>
            </Col>
        </Row>
    );
};

const FilteredMessage: React.FunctionComponent = () => {
    return (
        <Row className="justify-content-center mb-4">
            <Col>
                <div role="status" className="text-center text-warning">
                    Loading more users is not available while filtering is on
                </div>
            </Col>
        </Row>
    );
};

function filterUsers(
    users: ReadonlyArray<User>,
    filterBy: string
): ReadonlyArray<User> {
    return users.filter((u) =>
        `${u.firstName} ${u.lastName}`
            .toLocaleLowerCase()
            .includes(filterBy.toLocaleLowerCase())
    );
}
