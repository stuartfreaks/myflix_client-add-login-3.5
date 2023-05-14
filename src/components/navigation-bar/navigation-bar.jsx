import { Navbar, Container, Nav } from 'react-bootstrap';

import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="me-auto">
          CINEMA FELLINI
        </Navbar.Brand>
        <Nav className="menu-items">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href={`/profile`}>Profile</Nav.Link>
          <Nav.Link
            onClick={() => {
              onLoggedOut();
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
