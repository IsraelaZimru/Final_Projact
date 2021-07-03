import { useEffect } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const AboutMe = ({ connected, hasPageAaccess, onConnect }) => {
    let history = useHistory();

    useEffect(() => {
        hasPageAaccess(connected, history)
    }, [connected])

    const toConnect = (e) => {
        e.preventDefault()
        onConnect()
    }

    return <Container fluid className="aboutmeBkgd p-3">
        <h1 className="display-2 mb-5 bolder"> About me </h1>
        <Col>
            <Form onSubmit={toConnect} className="w-25 styleForm">
                <Form.Group>
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        defaultValue="Mark Otto" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        defaultValue="wawa@wawa.com" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        defaultValue="12345" />
                </Form.Group>
                <p>Recipes I want to see: (add checkbox...)</p>
                <Button variant="outline-dark" type="submit" className="mr-2"> update </Button>
                <Button variant="outline-dark" type="submit"> Home Page </Button>

            </Form>
        </Col>
    </Container>
}

export default AboutMe;