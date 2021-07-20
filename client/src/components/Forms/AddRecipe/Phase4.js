import 'bootstrap/dist/css/bootstrap.min.css'
import bkgd from '../../../imgs/youdidit.jpg'
import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup, Alert, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const Phase4 = () => {
    useEffect(() => {
        //
        localStorage.removeItem("step1")
        localStorage.removeItem("step2")
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
                    The recipe was successfully uploaded and is now available for public view on our site.
                </p>
            </Col>
        </Row>
        <Row className="justify-content-around text-center py-2">
            <Col md={4}>
                <Button size="lg" className="sizeBt" variant="warning" onClick={recipePage} >Go to your Recipe Page</Button>
            </Col>
            <Col md={4}>
                <Button size="lg" className="sizeBt" variant="warning" onClick={homePage} >Go to Home Page</Button>
            </Col>
        </Row>
    </Container >
}

export default Phase4;