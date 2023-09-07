

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { IconSearch } from '@tabler/icons-react';

const Navigation = () => {


  async function logOut() {
    try {
            let token = localStorage.getItem("token");
            await fetch("http://127.0.0.1:8000/api/users/logout", {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            });
            localStorage.removeItem("token");
            window.location.href = "/";
    } catch (error) {
        //console.log(error);
    }
   
}
    return (
        <>
        {['sm'].map((expand) => (
          <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 border-bottom">
            <Container fluid>
              <Navbar.Brand href="#"><img alt="" src="https://w7.pngwing.com/pngs/190/293/png-transparent-red-book-book-red-book-free-rectangle-orange-material-thumbnail.png" width="30"height="30" className="d-inline-block align-top"/> E-LIBRARY</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/register" className='border-end text-success'>Sign Up</Nav.Link>
                    <Nav.Link href="/login" className='border-end text-success'>Sign In</Nav.Link>
                    <Nav.Link onClick={logOut} className='border-end text-danger'>Log Out</Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      className="me-2 mx-1 my-1"
                      aria-label="Search"
                    />
                    <Button className='rounded-0 border border-white' variant="outline-primary"><IconSearch/></Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
        </>
    )
}

export default Navigation;