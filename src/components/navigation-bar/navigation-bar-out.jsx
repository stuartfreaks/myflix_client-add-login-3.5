import { Navbar, Container, Nav } from 'react-bootstrap';

import './navigation-bar.scss';

export const NavigationBarOut = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="me-auto">
          CINEMA FELLINI
        </Navbar.Brand>
        <Nav className="menu-items">
          <Nav.Link href={`/register`}>Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBarOut;
