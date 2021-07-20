import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup, Alert, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import bkgd from '../../../imgs/youdidit.jpg'



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
            <Col md={{ span: 11 }} >
                <img alt="you did it" className="Foodsimg youDidIt" variant="top" src={bkgd} />
            </Col>
        </Row>
        <Row className="justify-content-center text-center p-3 my-4">
            <Col >
                <p className="display-4">
                    Congrats, your recipe was successfully Updated!
                </p>
            </Col>
        </Row>
        <Row className="justify-content-around text-center py-4">
            <Col md={4}>
                <Button size="lg" className="sizeBt" variant="warning" onClick={recipePage} > View your Recipe Page </Button>
            </Col>
            <Col md={4}>
                <Button size="lg" className="sizeBt" variant="warning" onClick={homePage} >Go to Home Page</Button>
            </Col>
        </Row>
    </Container>
}

export default Step4;