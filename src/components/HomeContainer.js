import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import actions from user actions
import { fetchUser, addUser } from '../store/users/userActions';
//import components from react bootstrap
import { Card, ListGroup, Spinner, Alert, Form, Button } from 'react-bootstrap';

function HomeContainer(props) {
    //Define (local state) name and function using useState
    const [name, setName] = useState('');
    //Select whole user Object from user store
    const users = useSelector(state => state.user);
    //define dispatch function using useDispatch()
    const dispatch = useDispatch()
    //useEffect is called when compoent is mounted or compoenet is updated
    useEffect(() => {
        dispatch(fetchUser())
        //adding [] calls useEffect only ones
    }, [])
    
    const handleSubmit = (e) => {
        //handle form submit
        e.preventDefault();
        //dispatch add user action and pass user input name from useState
        dispatch(addUser(name));
        //call setName function to set value to empty
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