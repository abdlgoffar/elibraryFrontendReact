
import { Accordion, Button, Col, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react';


const BookBox = () => {

    let [books, setBooks] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectValue, setSelectValue] = useState([]);

    useEffect( () => {
        async function getAllBook() {
            try {
                const requestGetAllBook = await fetch("http://127.0.0.1:8000/api/books", {method: "GET", headers: {'Content-Type': 'application/json',}});
    
                if (requestGetAllBook.status === 200) {
                    const responseGetAllBook = await requestGetAllBook.json();
                    setBooks(responseGetAllBook.data);
                }
               
            } catch (error) {
                //console.log(error);
            }
        }
        
        getAllBook();
        getAllCategory();
    }, [])


    async function getAllCategory() {
        try {
            const requestGetAllCategory = await fetch("http://127.0.0.1:8000/api/categories", {method: "GET", headers: {'Content-Type': 'application/json'},});
            if (requestGetAllCategory.status === 200) {
                const responseGetAllCAtegory = await requestGetAllCategory.json();
                setCategory(responseGetAllCAtegory.data);
            }              
           
        } catch (error) {
           //console.log(error);
        }
       
    }

    async function getBookByCategoryId(selectValue) {
      try {
          const getBookByCategoryId = await fetch(selectValue, {method: "GET", headers: {'Content-Type': 'application/json',}});

          if (getBookByCategoryId.status === 200) {
              const responseGetBookByCategoryId = await getBookByCategoryId.json();
              setBooks(responseGetBookByCategoryId.data);
          }
         
      } catch (error) {
          //console.log(error);
      }
    }

    const categoryChange = (event) => {
      const value = event.target.value;
      setSelectValue(value);
    };

    const filter = (e) => {
    
      e.preventDefault();
      getBookByCategoryId(selectValue);
    };


    return (
        <Row className='mt-3'>
            <Col>
                <Card className='rounded-0'>
                    <Card.Header>
                        <Row className="justify-content-md-start">
                            <Col sm={3}>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header><p>Filter By Category</p></Accordion.Header>
                                        <Accordion.Body>
                                        <Form onSubmit={filter}>
                                            <Form.Select onChange={categoryChange} aria-label="Default select example" >
                                                {category.map((c, index) => {
                                                return (
                                                <option value={"http://127.0.0.1:8000/api/books/categories/" + c.id} key={index}>{c.name}</option>
                                                )
                                            })}
                                            </Form.Select>
                                            <Button variant="outline-primary" className='mt-1' type='submit'>filter book</Button>
                                        </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>LIST BOOK</Card.Title>
                        <Row xs={1} md={4} className="g-4 my-3">
                            {books.map((value, index) => (
                                <Col key={index}>
                                <Card className='rounded-end'>
                                    <Card.Body className="text-start px-2">
                                    <Card.Title className='text-info border-bottom'>{value.title}</Card.Title>
                                    <Card.Text>
                                        <span>Description: {value.description}</span>
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default BookBox;