
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut }) => {
  // fixed="top" instead of sticky?
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            myFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {!user && (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup">
                      Register
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link> 
                    <Nav.Link as={Link} to={`/users/${user.Username}`}>
                      myProfile
                    </Nav.Link>
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                  </>
                )}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};