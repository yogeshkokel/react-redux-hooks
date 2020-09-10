import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, addUser } from '../store/users/userActions';
import { Card, ListGroup, Spinner, Alert, Form, Button } from 'react-bootstrap';

function HomeContainer(props) {
    const [name, setName] = useState('');

    const users = useSelector(state => state.user);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(name));
        setName('');
    }

    return (
        <div>
            {
                users.loading ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner> :
                    users.error ?
                        <Alert variant="danger">
                            {users.error}
                        </Alert>
                        : <Card>
                            <ListGroup variant="flush">
                                {users.data.map((user, index) => (
                                    <ListGroup.Item key={index}>{user.name}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
            }

            <h4>Submit Form</h4>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        </div>
    );
}

export default HomeContainer;