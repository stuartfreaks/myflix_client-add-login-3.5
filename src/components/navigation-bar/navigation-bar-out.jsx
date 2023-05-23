import { Navbar, Container, Nav } from 'react-bootstrap';

import './navigation-bar.scss';

export const NavigationBarOut = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="me-auto">
          CINEMA FELLINI
        </Navbar.Brand>
        <Nav className="menu-items">
          <Nav.Link href={`/register`}>Sign Up</Nav.Link>
          <Nav.Link href={`/login`}>Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBarOut;
