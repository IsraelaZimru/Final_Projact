import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup, Alert, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const Step4 = () => {
    useEffect(() => {
        //
        localStorage.removeItem("step1")
        localStorage.removeItem("step2")
        localStorage.removeItem("step3")
    }, [])
    const { id } = useParams();
    const history = useHistory();

    const recipePage = () => {
        history.push(`/recipe_details/${id}`)
    }

    const homePage = () => {
        history.push(`/`)
    }


    return <Container className="py-4 ">
        <Row className="justify-content-center text-center">
            <Col></Col>
            <Col md={8} >
                <Card bg={"warning"} text={"light"}>
                    <Card.Header> <strong>You Did It !</strong></Card.Header>
                    <Card.Body>
                        <Card.Title>
                        Congrats, your recipe was successfully Updated!
                            </Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Row>
                            <Col >
                                <Button variant="secondary" onClick={recipePage}>
                                    View your Recipe Page
                                </Button>
                            </Col>
                            <Col >
                                <Button variant="secondary" onClick={homePage}>
                                    Go to Home Page
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col></Col>
        </Row>
    </Container>
}

export default Step4;