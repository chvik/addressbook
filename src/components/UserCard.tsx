import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { User } from "../model";

export function UserCard({ user }: { user: User }) {
    return (
        <Card role="cell" border="info">
            <Card.Title className="m-2">
                {user.first} {user.last}
            </Card.Title>
            <Card.Img variant="top" src={user.thumbnail} />
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        Username: <span>{user.username}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Email: <span>{user.email}</span>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
