import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
    <Container>
        <Navbar.Brand href ="#home">ElectricHQ</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#community">Community</Nav.Link>
            <Nav.Link href="#community">Contact Us</Nav.Link>
        </Nav>
    </Container>
    <CartWidget/>
   </Navbar>
    );
}
export default NavBar;