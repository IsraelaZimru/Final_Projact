import { Button, Container, Form, Row, Col } from "react-bootstrap";
import logo2 from "../imgs/logo2.png"


function SearchForm({ connected }) {

    return <Container fluid id="bkgdStyle">
        <div id="bkgdStyle2">
            <Row>
                <Col className="pt-1 text-center">
                    <hr className="hrMain"></hr>
                </Col>
            </Row>
            <Row className="justify-content-md-center text-center" >
                <Form className=" w-50 pt-4 form">
                    {!connected && <h1 className="display-4"> Recipes:</h1>}
                    {connected && <h1 className="display-4"> Hi User! find a Recipe:</h1>}
                    {connected && <div ><Form.Label >The recipes are filtered according to the user's choice:</Form.Label>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check inline type="checkbox" label="XYZ" />
                            <Form.Check inline type="checkbox" label="XYZ" />
                            <Form.Check inline type="checkbox" label="XYZ" />
                            <Form.Check inline type="checkbox" label="XYZ" />
                        </Form.Group></div>}
                    <div>
                        {/* <Form.Label > Show me the recipes:</Form.Label> */}
                        <Form.Group inline controlId="formBasicCheckbox" >
                            <Form.Label > Find:</Form.Label>
                            <Form.Check className="ml-2" inline type="checkbox" label="Most popular" />
                            <Form.Check inline type="checkbox" label="The newest" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" name="name" placeholder="Search for a recipe..." />
                        </Form.Group>
                    </div>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="text" name="ingredients" placeholder="Search by ingredients..." />
                    </Form.Group>
                    <Button variant="primary" type="submit" id="btnForm">
                        Search
                    </Button>
                </Form>
            </Row>
            <Row className="p-2 py-5" >
                <Col className="p-2 pt-3 text-center">
                    {/* <img src={logo2} style={{ height: '250px', width: '300px', borderRadius: "50%" }} alt="logo"></img> */}
                    {/* <h1 id="slogen">Here all Recipes are - easy, quick and delicious</h1> */}
                    <hr className="hrMain"></hr>
                </Col>
            </Row>
        </div>
    </Container>
}

export default SearchForm;