import React from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { User } from "../model";

export const DetailsModal: React.FunctionComponent<{
    user: User;
    onClose: () => void;
}> = ({ user, onClose }) => {
    const location = user.location;
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {user.firstName} {user.lastName}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col className="align-self-center flex-grow-0">
                            <Image src={user.largePicture} rounded />
                        </Col>
                        <Col xs={6} sm={6} className="m-2">
                            <Row>
                                <Col className="text-info">Username:</Col>
                                <Col>{user.username}</Col>
                            </Row>
                            <Row>
                                <Col className="text-info">Email:</Col>
                                <Col>{user.email}</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Row>
                                <Col sm={2} className="text-info">
                                    Street:
                                </Col>
                                <Col>
                                    {location.streetNumber}{" "}
                                    {location.streetName}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2} className="text-info">
                                    City:
                                </Col>
                                <Col>{location.city}</Col>
                            </Row>
                            <Row>
                                <Col sm={2} className="text-info">
                                    State:
                                </Col>
                                <Col>{location.state}</Col>
                            </Row>
                            <Row>
                                <Col sm={2} className="text-info">
                                    Postcode:
                                </Col>
                                <Col>{location.postcode}</Col>
                            </Row>
                            <Row>
                                <Col sm={2} className="text-info">
                                    Phone:
                                </Col>
                                <Col>{user.phone}</Col>
                            </Row>
                            <Row>
                                <Col sm={2} className="text-info">
                                    Cell:
                                </Col>
                                <Col>{user.cell}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};
