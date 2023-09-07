
import Nav from 'react-bootstrap/Nav';


const Head = () => {
    return (
        <Nav className="justify-content-end">
            <Nav.Item>
                <Nav.Link eventKey="link-1" style={{fontSize: "0.7rem"}} href="/books/manage" className='border border-primary'>Manage Book Data</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" style={{fontSize: "0.7rem"}} href="/books/create" className='border border-primary mx-1'>create Book Data</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
export default Head;