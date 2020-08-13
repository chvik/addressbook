import React from "react";
import { User } from "../model";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

interface UserCardProps {
    user: User;
    onActivated: (user: User) => void;
}

export const UserCard: React.FunctionComponent<UserCardProps> = ({
    user,
    onActivated,
}) => {
    return (
        <Container
            className="border user-cell btn"
            role="cell"
            onClick={() => onActivated(user)}
        >
            <Row>
                <Col className="align-self-center flex-grow-0">
                    <Image src={user.thumbnailPicture} rounded />
                </Col>
                <Col xs={6} sm={8} className="m-2">
                    <Row>
                        <strong>
                            {user.firstName} {user.lastName}
                        </strong>
                    </Row>
                    <Row className="text-muted">{user.username}</Row>
                    <Row>{user.email}</Row>
                </Col>
            </Row>
        </Container>
    );
};
