import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserGrid } from "./UserGrid";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as actions from "../actions";
import { AddressBookState } from "../model";
import { User } from "../model";

export const AddressBookPage: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.moreUsers());
    }, []);

    const users = useSelector<AddressBookState, ReadonlyArray<User>>(state => state.users);

    const loadMore = useCallback(() => {
        dispatch(actions.moreUsers());
    }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Address Book</Navbar.Brand>
            </Navbar>
            <InfiniteScroll
                dataLength={users.length}
                next={loadMore}
                hasMore={true}
                loader={<LoadingMessage />}
            >
                <UserGrid />
            </InfiniteScroll>
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
