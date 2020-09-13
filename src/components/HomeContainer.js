import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import actions from user actions
import { fetchUser, addUser } from '../store/users/userActions';
//import components from react bootstrap
import { Card, ListGroup, Spinner, Alert, Form, Button, Modal } from 'react-bootstrap';
//import customHooks
import useDocTitle from '../customHooks/useDocTitle';
// the hoc
import { withNamespaces } from 'react-i18next';


function HomeContainer({ t }) {
    //Define (local state) name and function using useState
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [userDetail, setUserDetail] = useState({});

    //Select whole user Object from user store
    const users = useSelector(state => state.user);

    //define dispatch function using useDispatch()
    const dispatch = useDispatch()

    //call customHooks and pass your value
    useDocTitle('This is home page');

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

    const handleOpen = (user) => {
        setUserDetail(user);
        setShow(true);
    }
    const handleClose = () => setShow(false);

    return (
        <div>
            <h1>{t('Welcome to React')}</h1>
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
                                    <>
                                        <ListGroup.Item key={index}>{user.name}
                                            <Button size="sm" onClick={() => handleOpen(user)}>View Detail</Button>
                                        </ListGroup.Item>
                                    </>
                                ))}
                            </ListGroup>
                        </Card>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{userDetail.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            Email: {userDetail.email}
                        </li>
                        <li>
                            Phone Number: {userDetail.phone}
                        </li>
                        <li>
                            Website: {userDetail.website}
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>

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

export default withNamespaces()(HomeContainer);