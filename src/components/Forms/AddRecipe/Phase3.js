import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { setNewRecipe } from '../../../DAL/api'
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup, Alert, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";



function Phase3() {
    const history = useHistory()
    const [file, setFile] = useState();
    const [errMsg, setErrMsg] = useState("");
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [combineData, setCombineData] = useState([]);
    const [details, setDetails] = useState({
        instruction: { isRequired: true, msg: [], pattern: /[\s\S]{5,}/, value: "", isInVaild: false },
    })


    useEffect(() => {
        // if (localStorage.getItem("step3")) {
        //     const inputsPage3ocal = JSON.parse(localStorage.getItem("step3"))
        //     setCombineData(prev => inputsPage3ocal)
        // }

    }, [])


    const finshRecipe = async () => {
        let isOK = false;
        let msg = "";
        if (combineData.length < 2) {
            isOK = true;
            msg = "Please enter at least 2 instructions";
        } else if (file === undefined) {
            isOK = true;
            msg = "Please upload an image";
        }
        setShow(isOK);
        setErrMsg(msg)
        window.scrollTo(0, 0);

        if (!isOK) {
            const data = {
                recipe: JSON.parse(localStorage.getItem("step1")),
                ingredients: JSON.parse(localStorage.getItem("step2")),
                instructions: combineData
            }
            const image = new FormData()
            image.append("image", file)

            const respone = await setNewRecipe(data, image)
            if (respone) {
                console.log(respone, "respone")
                history.push(`/Phase4/${respone}`)
            } else {
                setShow(true);
                setErrMsg("oops...There was a problem with the recipe, please try again")
                window.scrollTo(0, 0);
            }
        }
    }


    const fileValidation = (target) => {
        const File = target.files[0]
        setFile(File)
    }

    const findInstruction = (data) => {
        setCombineData(prev => prev.filter(item => item !== data))
    }

    const handleSubmit = (event) => {
        let status = false;
        const checkErrors = [];
        for (const key in details) {
            checkErrors.push(validation({ name: key, value: details[key].value }));
        }

        for (const error of checkErrors) { //if there is error msg ->submit don't happens!
            if (error) {
                setValidated(status)
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
        setValidated(!status);
        event.preventDefault();
        const data = details.instruction.value

        setCombineData(prev => [...prev, data]);
        setDetails(prevDetails => ({ ...prevDetails, instruction: { ...prevDetails.instruction, value: " " } }))
    }

    function validation({ name, value }) {
        const errorMsg = [];
        let isMsgShowing = false;
        if (value === "" || value === undefined) {
            isMsgShowing = true
            errorMsg.push(`${name} is required.`)
        } else if (details[name].isRequired && (details[name].pattern).test(value)) {
            isMsgShowing = false
        } else {
            errorMsg.push(`${name} is not valid`)
            isMsgShowing = true
        }
        setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))



        // console.log(details);
        return errorMsg[0] //importent for sumbit form!!!
    }


    return <Container>
        <h1 className="display-2 text-center"> Add A New Recipe</h1>
        <Row className="phase-top">
            <Col > <Link to="/newRecipe_step1"> 1  </Link>  </Col>
            <Col > <Link to="/newRecipe_step2"> 2  </Link>  </Col>
            <Col className="active"> 3 </Col>
        </Row>
        <Alert show={show} variant="secondary" onClose={() => setShow(false)}>
            {errMsg}
        </Alert>


        <h1 className="display-4 pb-2">Instructions:</h1>
        <Row className="align-items-center">
            <Col >
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}
                            className="px-1"
                        >
                            <InputGroup
                                hasValidation>
                                <FormControl
                                    placeholder="Enter Instructions..."
                                    as="textarea"
                                    rows={3}
                                    type="textarea"
                                    name="instruction"
                                    value={details.instruction.value}
                                    onChange={e => validation(e.target)}
                                    onblur={e => validation(e.target)}
                                    isInvalid={details.instruction.isInVaild}
                                    required
                                />
                                <Form.Control.Feedback type="invalid" className="feedback">
                                    enter at least 5 characters.
                                    {/* {details.instruction.msg} */}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Col>
                            <Button type="submit" className="my-2" variant="warning"> Add Instructions </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col md="5" className="pb-4">
                {!combineData.length && <div className="text-center justify-content-center" id="msgNoIngredient">
                    <div id="noIngredient2">
                    </div>
                    <h4>
                        No Instructions Were Written yet...
                    </h4>
                </div>}
                <div>
                    <ol className="list-group">
                        {!!combineData.length && combineData.map((data, i) => <li
                            key={i}
                            className="list-group-item">
                            <FontAwesomeIcon
                                onClick={() => findInstruction(data)}
                                icon={faTrashAlt}
                                className="mr-3"
                            />
                            | Instruction {i + 1} : {data} </li>)}
                    </ol>
                </div>

            </Col>
        </Row>
        <Row className="styleRowUp justify-content-md-center text-center p-3">
            <Card
                text='dark'
                style={{ width: '18rem' }}
                className="mb-2 text-center"
            >
                <Card.Header>
                    <h4>
                        Upload your Recipe Image here:
                    </h4>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <InputGroup hasValidation>
                                <Form.File
                                    label="Image: "
                                    // value={details.image.value}
                                    name="image"
                                    onBlur={e => fileValidation(e.target)}
                                    onChange={(e) => fileValidation(e.target)}
                                    required
                                // isInvalid={details.image.isInVaild}
                                />
                                {/* <Form.Control.Feedback type="invalid" className="feedback">
                            {details.image.msg}
                        </Form.Control.Feedback> */}
                            </InputGroup>
                        </Form.Group>
                        {/* <Button variant="outline-dark" onClick={send}>only file</Button> */}
                    </Form>

                </Card.Body>
            </Card>
        </Row>
        <hr style={{ borderStyle: "solid", borderWidth: "5px" }}></hr>
        <Row className="my-5">
            <Col>
                <Button variant="warning" size="lg" onClick={() => history.push("/newRecipe_step2")} block>
                    Previous Step
                </Button>
            </Col>
            <Col>
                <Button variant="warning" size="lg" onClick={finshRecipe} block>
                    Upload your Recipe!
                </Button>
            </Col>
        </Row>

    </Container>
}

export default Phase3;
