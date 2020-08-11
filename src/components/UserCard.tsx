import React from "react";
import { User } from "../model";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

export function UserCard({ user }: { user: User }) {
    return (
        <Container className="border" role="cell">
            <Row>
                <Col className="align-self-center flex-grow-0">
                    <Image src={user.thumbnail} rounded />
                </Col>
                <Col xs={6} sm={8} className="m-2">
                    <Row>
                        <strong>
                            {user.first} {user.last}
                        </strong>
                    </Row>
                    <Row className="text-muted">{user.username}</Row>
                    <Row>{user.email}</Row>
                </Col>
            </Row>
        </Container>
    );
}
