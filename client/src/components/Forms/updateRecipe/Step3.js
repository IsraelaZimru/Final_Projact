import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { updateRecipe } from '../../../DAL/api'
import { useEffect, useState } from "react";
import { Link, useHistory, useParams, Prompt } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup, Alert, FormControl, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";



function Step3() {
    const { id } = useParams()
    const history = useHistory()
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("");
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [combineData, setCombineData] = useState([]);
    const [details, setDetails] = useState({
        instruction: { isRequired: true, msg: [], pattern: /[\s\S]{5,}/, value: "", isInVaild: false },
    })


    useEffect(() => {
        window.scrollTo(0, 0);

        if (localStorage.getItem("step3")) {
            const inputsPage3ocal = JSON.parse(localStorage.getItem("step3"))
            setCombineData(prev => inputsPage3ocal)
        }
    }, [])


    const finshRecipe = async () => {
        console.log("try");
        let isOK = false;
        let msg = "";
        if (combineData.length < 2) {
            isOK = true;
            msg = "Please enter at least 2 instructions";
        }
        setShow(isOK);
        setErrMsg(msg)
        window.scrollTo(0, 0);

        if (!isOK) {
            setLoading(true)
            console.log("sending http request");
            const data = {
                recipe: JSON.parse(localStorage.getItem("step1")),
                ingredients: JSON.parse(localStorage.getItem("step2")),
                instructions: combineData
            }

            let newImage;
            if (file !== null) {
                newImage = new FormData()
                newImage.append("image", file)
            }

            console.log("image", newImage, "file", file);

            const respone = await updateRecipe(id, data, newImage)
            setLoading(false)
            if (respone) {
                console.log(respone, "respone")
                history.push(`/Step4/${id}`)
            } else {
                console.log("problem with image!");
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

    const formIsHalfFiled = Object.values(details)
        .filter(item => item.value && item.value !== "")
        .length > 0;

    console.log("formIsHalfFiled", formIsHalfFiled);



    return <Container>
        <h1 className="display-2 text-center"> Update your Recipe</h1>
        <Row className="phase-top">
            <Col onClick={() => history.push(`/updateRecipe_step1/${id}`)} >
                1
            </Col>
            <Col onClick={() => history.push(`/updateRecipe_step2/${id}`)} >
                2
            </Col>
            <Col className="active"> 3 </Col>
        </Row>
        <Alert show={show} variant="secondary" onClose={() => setShow(false)}>
            {errMsg}
        </Alert>

        {/* <Prompt when={formIsHalfFiled} message="You have unsaved changes. Sure you want to leave?" /> */}


        <h1 className="display-4 pb-2">Instructions:</h1>
        <Row >
            {/* <Row className="align-items-center"> */}
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
                style={{ width: '28rem' }}
                className="mb-2 text-center p-auto justify-content-md-center"
            >
                <Card.Header>
                    <h4>
                        If you want to swap your recipe image, upload it here.
                    </h4>
                </Card.Header>
                <Card.Body >
                    <Form className="p-auto m-auto">
                        <Form.Group>
                            <InputGroup hasValidation>
                                <Form.File
                                    className="p-auto m-auto"
                                    name="image"
                                    onBlur={e => fileValidation(e.target)}
                                    onChange={(e) => fileValidation(e.target)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form>

                </Card.Body>
            </Card>
        </Row>
        <hr style={{ borderStyle: "solid", borderWidth: "5px" }}></hr>
        <Row className="my-5">
            <Col sx={12} md={6} className="my-2">
                <Button variant="warning" size="lg" onClick={() => history.push(`/updateRecipe_step2/${id}`)} block>
                    Previous Step
                </Button>
            </Col>
            <Col sx={12} md={6} className="my-2">
                <Button variant="warning" size="lg" onClick={finshRecipe} block>
                    {loading && <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />}
                    {loading ? <span>Loading...</span> : <span>Update your Recipe!</span>}
                </Button>
            </Col>
        </Row>

    </Container>
}

export default Step3;
