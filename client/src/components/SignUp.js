import { Button, Card, Form, InputGroup, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

function SignUp({ hasPageAaccess, connected, checkingSignUp }) {
    let history = useHistory();
    useEffect(() => {
        hasPageAaccess(!connected, history)
    }, [connected])

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({
        email: { isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: [], value: "", isInVaild: false },
        firstName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
        lastName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
        password: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
        // passwordVerification: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
    })

    const handleSubmit = (event) => {
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
        // const info = {
        //     email: details.email.value,
        //     password: details.password.value,
        //     firstName: details.firstName.value,
        //     lastName: details.lastName.value,
        // }
        // const result = fakeUsers.find(user => user.email === details.email.value);
        // if (!!result) {
        //     setValidated(false);
        //     setShow(true)
        // } else {
        //     alert("works!!!😍🥰")
        // }
        const allRelevantData = {
            email: details.email.value,
            firstName: details.firstName.value,
            lastName: details.lastName.value,
            password: details.password.value
        }
        checkingSignUp(setValidated, setShow, allRelevantData)

        // userLoginHandler(prev => info)

        // if (!connected) {
        //     setValidated(false);
        //     setShow(true)
        // }
    };

    function validation({ name, value }) {
        const errorMsg = [];
        let isMsgShowing = false;
        if (value === "") {
            isMsgShowing = true
            errorMsg.push(`This Field is Required`)
        } else if (details[name].isRequired && (details[name].pattern).test(value)) {
            isMsgShowing = false
        } else {
            errorMsg.push(`Not Valid.`)
            isMsgShowing = true
        }
        setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))
        return errorMsg[0] //importent for sumbit form!!!
    }


    return <Card className="m-5 w-75 p-3">
        <Alert show={show} variant="secondary" onClose={() => setShow(false)}>
            User email already exist. Please try with another email.
        </Alert>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1 className="display-4 text-center">Sign up</h1>

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
                        isInvalid={details.firstName.isInVaild}
                        required
                    />
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
                        isInvalid={details.lastName.isInVaild}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className="feedback">
                        {details.lastName.msg}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>


            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        type="email"
                        name="email"
                        onBlur={e => validation(e.target)}
                        onChange={(e) => validation(e.target)}
                        value={details.email.value}
                        placeholder="Enter email..."
                        isInvalid={details.email.isInVaild}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className="feedback">
                        {details.email.msg}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group >
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        type="password"
                        name="password"
                        onBlur={e => validation(e.target)}
                        onChange={(e) => validation(e.target)}
                        value={details.password.value}
                        placeholder="Enter password..."
                        isInvalid={details.password.isInVaild}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className="feedback">
                        {details.password.msg}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Button variant="outline-dark" type="submit">Submit</Button>
        </Form>
    </Card>
}

export default SignUp;