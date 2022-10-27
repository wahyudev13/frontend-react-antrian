import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';

function Navbartop() {
  return (
    <Navbar sticky="top" className='navbar-app'>
      <Container className='container-nav'>
        <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logonavbar.png"
              width="60"
              height="60"
              className="d-inline-block"
            />{' '}
        <strong className='title-app'>Antrian Poliklinik RS PKU Muhammadiyah Sekapuk</strong>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default Navbartop;