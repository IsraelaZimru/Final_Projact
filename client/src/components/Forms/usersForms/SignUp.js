import { Button, Card, Form, InputGroup, Alert, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import logo from '../../../imgs/logo6.png'
import { addNewUser } from "../../../DAL/api";


function SignUp({ hasPageAaccess, connected }) {
    let history = useHistory();
    useEffect(() => {
        window.scrollTo(0, 0);
        hasPageAaccess(!connected, history)
    }, [connected])

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({
        email: { isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: [], value: "", isInVaild: false },
        firstName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
        lastName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
        password: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
        passwordVerification: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
    })

    const handleSubmit = async (event) => {
        console.log("enetr sumbit");
        const checkErrors = [];
        for (const key in details) {
            if (Object.hasOwnProperty.call(details, key)) {
                checkErrors.push(validation({ name: key, value: details[key].value }))

            }
        }

        for (const error of checkErrors) { //if there is error msg ->submit don't happens!
            if (error) {
                setValidated(false)
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }

        console.log("input whitout errors");
        setValidated(true);
        event.preventDefault();

        const allRelevantData = {
            email: details.email.value,
            firstName: details.firstName.value,
            lastName: details.lastName.value,
            password: details.password.value
        }

        const result = await addNewUser(allRelevantData);
        console.log("result", result);

        if (!result) {
            window.scrollTo(0, 0);
            setValidated(false);
            setShow(true)
        } else {
            alert(`You have successfully registered. You can login to the site!!!😍🥰`)
            history.push('/')
        }
    };

    function validation({ name, value }) {
        const errorMsg = [];
        let isMsgShowing = false;
        if (value === "") {
            isMsgShowing = true
            errorMsg.push(`This Field is Required`)
        } else if (name === "passwordVerification" && value !== details.password.value) {
            isMsgShowing = true
            errorMsg.push(`The passwords do not match`)
        } else if (details[name].isRequired && (details[name].pattern).test(value)) {
            isMsgShowing = false
        } else {
            errorMsg.push(`Not Valid.`)
            isMsgShowing = true
        }
        setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))
        return errorMsg[0] //importent for sumbit form!!!
    }


    return <Container id="bkgdImge">
        <Row className="justify-content-center">
            <Card className="m-5 w-50 p-0" style={{ borderRadius: "10%" }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit} id="bkgdStyleForm">
                    <Alert show={show} variant="warning" onClose={() => setShow(false)}>
                        <strong> User email already exist. Please try with another email.</strong>
                    </Alert>
                    <div className="text-center">
                        <img src={logo} alt="logo" style={{ width: "9em", height: "4em", borderRadius: "50%" }} />
                    </div>
                    <h1 className="display-4 text-center">Sign up</h1>
                    <div id="textStyle">

                        <Form.Group >
                            <Form.Label>First name:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    onBlur={e => validation(e.target)}
                                    onChange={(e) => validation(e.target)}
                                    value={details.firstName.value}
                                    placeholder="Enter first name..."
                                    isInvalid={details.firstName.isInVaild} />
                                <Form.Control.Feedback type="invalid" className="feedback">
                                    {details.firstName.msg}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Last name:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    onBlur={e => validation(e.target)}
                                    onChange={(e) => validation(e.target)}
                                    value={details.lastName.value}
                                    placeholder="Enter last name..."
                                    isInvalid={details.lastName.isInVaild} />
                                <Form.Control.Feedback type="invalid" className="feedback">
                                    {details.lastName.msg}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Email address:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onBlur={e => validation(e.target)}
                                    onChange={(e) => validation(e.target)}
                                    value={details.email.value}
                                    placeholder="Enter email..."
                                    isInvalid={details.email.isInVaild} />
                                <Form.Control.Feedback type="invalid" className="feedback">
                                    {details.email.msg}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onBlur={e => validation(e.target)}
                                    onChange={(e) => validation(e.target)}
                                    value={details.password.value}
                                    placeholder="Enter password..."
                                    isInvalid={details.password.isInVaild} />
                                <Form.Control.Feedback type="invalid" className="feedback">
                                    {details.password.msg}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>


                        <Form.Group >
                            <Form.Label>Confirm Password:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="password"
                                    name="passwordVerification"
                                    onBlur={e => validation(e.target)}
                                    onChange={(e) => validation(e.target)}
                                    value={details.passwordVerification.value}
                                    placeholder="Enter password..."
                                    isInvalid={details.passwordVerification.isInVaild} />
                                <Form.Control.Feedback type="invalid" className="feedback">
                                    {details.passwordVerification.msg}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                    </div>
                    <div className="text-center my-3 py-3">
                        <Button variant="outline-dark" type="submit" style={{ width: "40%" }}>Submit</Button>
                    </div>
                </Form>
            </Card>
        </Row>
    </Container>
}

export default SignUp;