import { IconFileTypePdf, IconPhoto } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const TableBook = () => {

    const [books, setBooks] = useState([]);


    useEffect( () => {
        if (localStorage.getItem("token") !== null) {
            const token = localStorage.getItem("token");
           
            async function getBookByUserId() {
                try {
                   
                    const requestGetUser = await fetch("http://127.0.0.1:8000/api/users", {method: "GET", headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},});
                    const responseGetUser = await requestGetUser.json();
                 
                    const requestGetBookByUserId = await fetch("http://127.0.0.1:8000/api/books/users/" + responseGetUser.id, {method: "GET", headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},});
                    const responseGetBookByUserId = await requestGetBookByUserId.json();
                    setBooks(responseGetBookByUserId.data);
                } catch (error) {
                    //console.log(error);
                }
               
            }
            getBookByUserId();
        }
       
   }, [])

    async function deleted(id) {
        try {
            const token  = localStorage.getItem("token")

            const requestBookDelete = await fetch("http://127.0.0.1:8000/api/books/" + id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},});

            if (requestBookDelete.status === 200) {
                await requestBookDelete.json();
                window.location.href = "/books/manage";
            }
        } catch (error) {
            //console.log(error);
        }

    }

    const navigate = useNavigate();
    
    function updated(id) {
        navigate(`/books/update/${id}`);
    }

    return (
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Document</th>
                <th>Edit</th>
                </tr>
            </thead>
            <tbody>
            {
                books.map((value, index) => (
                <tr key={index}>
                <td>{value.title}</td>
                <td>{value.amount}</td>
                <td>{value.description}</td>
                <td><p>Download</p><span><IconFileTypePdf color="red"/> </span> <span><IconPhoto color="green"/></span></td>
                <td><Button size="sm" onClick={() => updated(value.id)}>Update</Button> <Button size="sm" onClick={() => deleted(value.id)}>Delete</Button></td>
                </tr>
                ))
            }
            </tbody>
        </Table>

    )
}
export default TableBook;