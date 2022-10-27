import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
function Footer() {
  return (
    <Navbar  className='footer' bg="light">
      <Container className='container-footer'>
        <strong>Antrian Poliklinik RS PKU Muhammadiyah Sekapuk</strong>
      </Container>
    </Navbar>
  );
}

export default Footer;