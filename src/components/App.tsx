import React from "react";
import { useSelector } from "react-redux";
import { AddressBookState } from "../store";
import { UserGrid } from "./UserGrid";
import Navbar from "react-bootstrap/Navbar";

export function App() {
    const phase = useSelector<AddressBookState>((state) => state.phase);
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Address Book</Navbar.Brand>
            </Navbar>
            <UserGrid />
        </div>
    );
}
