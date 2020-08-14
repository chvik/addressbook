import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { nationalityOptions, RootState } from "../model";
import * as actions from "../actions";

export const SettingsPage: React.FunctionComponent = () => {
    const nationality = useSelector(
        (state: RootState) => state.addressBook.settings.nationality
    );
    const dispatch = useDispatch();
    const onNationalityChange = useCallback((event) => {
        dispatch(
            actions.nationalitySettingChanged({
                nationality: event.target.value,
            })
        );
    }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg" className="justify-content-between">
                <Col>
                    <Navbar.Brand className="my-4">Address Book</Navbar.Brand>
                    <Link to="/" className="mr-4">
                        Home
                    </Link>
                    <span>Settings</span>
                </Col>
            </Navbar>

            <Form className="col-6 m-2">
                <Form.Group controlId="formNationality">
                    <Form.Label>Nationality of the users</Form.Label>
                    <Form.Control
                        as="select"
                        value={nationality}
                        onChange={onNationalityChange}
                        role="listbox"
                    >
                        {nationalityOptions.map(([value, label]) => (
                            <option value={value} key={value}>
                                {label}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
};
