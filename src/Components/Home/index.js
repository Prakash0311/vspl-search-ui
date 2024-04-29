import React from 'react';
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();

                setEmployees(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchEmployees();

    }, []);

    return (
        <>
          <Container className="mt-5">
            <Form>
                <InputGroup className='my-3'>
                    <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder=' Search Name....' />
                </InputGroup>
            </Form>
            <Row>
                <Col>
                  <h1 className="text-center">All Records</h1>
                  <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>Mobile</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.filter((item) => {
                            return search.toLowerCase() === '' 
                            ? item 
                            : item.name.toLowerCase().includes(search)
                        }).map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.age}</td>
                                <td>{employee.country}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))}
                    </tbody>
                  </Table>
                </Col>
            </Row>
          </Container>
        </>
    )
}

export default Home;