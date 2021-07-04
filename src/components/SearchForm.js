import { useState } from "react";
import { Button, Container, Form, Row, Col, Collapse } from "react-bootstrap";


function SearchForm({ connected, userName }) {
    const [open, setOpen] = useState(false);

    return <Container fluid id="bkgdStyle">
        <div id="bkgdStyle2">
            <Row>
                <Col className="pt-3 text-center">
                    <hr className="hrMain"></hr>
                </Col>
            </Row>
            <Row className="justify-content-center text-center pt-4" >
                <Form className="pt-2 " id="formMedia">
                    {!connected && <h1 className="display-4 mb-3"> Recipes:</h1>}
                    {connected && <>
                        <h1 className="display-4 mb-3 "><span className="optional mx-1"> Hi {userName}!</span>
                            find a recipe:</h1>
                    </>}
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            {connected && <div ><Form.Label >The recipes are filtered according to the user's choices:</Form.Label>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                </Form.Group></div>}
                            <div>
                                {/* <Form.Label > Show me the recipes:</Form.Label> */}

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="text" name="ingredients" placeholder="Search by ingredients..." />
                                </Form.Group>
                            </div>
                        </div>
                    </Collapse>

                    <Form.Group >
                        <Form.Control type="text" name="name" placeholder="Search for a recipe..." />
                    </Form.Group>
                    <div id="groupBtn">
                        <Button variant="outline-light" type="submit" id="btnForm">
                            Search
                        </Button>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-Collapse-text"
                            aria-expanded={open}
                            variant="outline-light"
                            id="btnAdvenced"
                        >
                            Advanced Search
                        </Button>
                    </div>

                </Form>
            </Row>
            <Row className="p-2 py-3" >
                <Col className="p-2 pt-3 text-center">
                    {/* <img src={logo2} style={{ height: '250px', width: '300px', borderRadius: "50%" }} alt="logo"></img> */}
                    {/* <h1 id="slogen">Here all Recipes are - easy, quick and delicious</h1> */}
                </Col>
            </Row>
        </div>
        <hr className="hrMain"></hr>
    </Container>
}

export default SearchForm;