import { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";


const EditBook = () => {
    const [listCategory, setListCategory] = useState([]); 
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [imageForm, setImageForm] = useState();
    const [pdfForm, setPdfForm] = useState();

    const [validated, setValidated] = useState(false);


    const {id} = useParams();

    useEffect( () => {
        getAllCategory();
    }, [])


    const ok = (e) => {
       
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        setValidated(true);


        putBook(localStorage.getItem("token"));

    };

    async function putBook(token) {
 
        try {
            const bookImageFile = new FormData();
            bookImageFile.append("img", imageForm);
            const requestUploadBookImg = await fetch("http://127.0.0.1:8000/api/books/img/upload",  {method: "POST", headers: {'Authorization': `Bearer ${token}`}, body: bookImageFile});
            const responseUploadBookimg = await requestUploadBookImg.json();

            const bookPdfFile = new FormData();
            bookPdfFile.append("pdf", pdfForm);
            const requestUploadBookPdf = await fetch("http://127.0.0.1:8000/api/books/pdf/upload",  {method: "POST", headers: {'Authorization': `Bearer ${token}`}, body: bookPdfFile});           
            const responseUploadBookPdf = await requestUploadBookPdf.json();

            const requestGetUser = await fetch("http://127.0.0.1:8000/api/users",  {method: "GET", headers: {'Authorization': `Bearer ${token}`}});           
            const responseGetUser = await requestGetUser.json();

            const book = {
                "title": title,
                "description": description,
                "category": category,
                "bookImage": responseUploadBookimg.id,
                "user": responseGetUser.id,
                "bookPortableDocFormat": responseUploadBookPdf.id,
                "amount": amount
            }
            const requestUpdateBook = await fetch("http://127.0.0.1:8000/api/books/" + id,  {method: "PUT", headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}, body:  JSON.stringify(book)});                         

           if (requestUpdateBook.status === 200) {
                alert("Update Data Buku Berhasil")
                window.location.href = "/books/manage";
           } else {
                const responseUpdateBook = await requestUpdateBook.json();
                alert("PESAN ERROR: " + responseUpdateBook.message);
           }
           
        } catch (error) {
            //console.log();
        }
    }
    






    async function getAllCategory() {
        try {
            const requestGetAllCategory = await fetch("http://127.0.0.1:8000/api/categories", {method: "GET", headers: {'Content-Type': 'application/json'},});
            if (requestGetAllCategory.status === 200) {
                const responseGetAllCategory = await requestGetAllCategory.json();
                setListCategory(responseGetAllCategory.data);
            }              
           
        } catch (error) {
            //console.log(error);
        }
       
    }
    

    return (
        //
        <Row>
            <Col>
              <CardGroup>
                    <Card style={{height: "100vh`"}}>
                        <Card.Body style={{height: "100vh`"}}>
                            <Card style={{height: "100vh`"}}>
                                <Card.Body style={{height: "100vh`"}}>
                                    <Form onSubmit={ok} validated={validated}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Judul</Form.Label>
                                            <Form.Control required size="sm" onChange={(e) => setTitle(e.target.value)} type="text"/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Jumlah</Form.Label>
                                            <Form.Control required size="sm" onChange={(e) => setAmount(e.target.value)} type="number"/>
                                        </Form.Group>
                                        <Form.Group className='mb-1'>
                                        <Form.Label>Pilih Category</Form.Label>
                                          <Form.Select size="sm" onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                                <option>One</option>  
                                            {listCategory.map((lc) => (
                                                <option key={lc.id} value={lc.id}>{lc.name}</option>
                                            ))}                                          
                                          </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                      <Form.Label>IMG</Form.Label>
                                                      <Form.Control name='img' onChange={(e) => setImageForm(e.target.files[0])} size="sm" type="file" />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                <Form.Group controlId="formFile" className="mb-3">
                                                      <Form.Label>PDF </Form.Label>
                                                      <Form.Control name='pdf' onChange={(e) => setPdfForm(e.target.files[0])} size="sm" type="file" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control required size="sm" onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
                                        </Form.Group>
                                        <Button className='mt-1' type='submit' variant="primary">OK</Button>
                                    </Form>
                                    
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://images.pexels.com/photos/1730560/pexels-photo-1730560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    </Card>
              </CardGroup>
            </Col>
        </Row>
        //
    )
}

export default EditBook;