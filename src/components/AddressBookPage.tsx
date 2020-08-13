import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserGrid } from "./UserGrid";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

    const loadMore = useCallback(() => {
        dispatch(actions.moreUsers());
    }, []);

    const onCloseDetails = useCallback(() => {
        dispatch(actions.detailsToClose());
    }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Address Book</Navbar.Brand>
            </Navbar>
            <InfiniteScroll
                dataLength={users.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<LoadingMessage />}
                endMessage={<EndMessage />}
            >
                <UserGrid />
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
