import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddressBookState } from "../store";
import * as actions from "../actions";
import { UserGrid } from "./UserGrid";
import Navbar from "react-bootstrap/Navbar";

export function App() {
    const phase = useSelector<AddressBookState>((state) => state.phase);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.moreUsers());
    }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Address Book</Navbar.Brand>
            </Navbar>
            <UserGrid />
        </div>
    );
}
