import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
        <Navbar.Brand href ="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#community">Community</Nav.Link>
            <Nav.Link href="#community">Contact Us</Nav.Link>
        </Nav>
    </Container>
   </Navbar>
    );
}
export default NavBar;