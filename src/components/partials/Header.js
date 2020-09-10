import React from 'react';
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';

function Header() {
    return (
        <div>
            <Nav variant="pills" className="justify-content-center" defaultActiveKey="link-1">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={Link} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey="link-2" as={Link} to="/todos">Todos</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Header;