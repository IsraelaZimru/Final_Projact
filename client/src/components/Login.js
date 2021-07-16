import { useState, useEffect } from "react";
import { Button, Card, Form, Collapse, InputGroup, Alert } from "react-bootstrap";

function Login({ showLogin, onClose, connected, userLoginHandler }) {
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!showLogin) {
            setShow(false)
        }
    }, [showLogin])

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [details, setDetails] = useState({
        email: { isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: [], value: "", isInVaild: false },
        password: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
    })

    const handleSubmit = (event) => {
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

        setValidated(true);
        event.preventDefault();
        const info = { email: details.email.value, password: details.password.value }
        userLoginHandler(prev => info)


        if (connected) {
            onClose()
        } else {
            setValidated(false);
            setShow(true)
        }
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

    return <Collapse in={showLogin}>
        <Card
            id="loginCard">
            <Alert show={show} variant="secondary" onClose={() => setShow(false)}>
                worng email or password ! try again.
            </Alert>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h1 className="display-4 text-center">Login</h1>
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

                <Button variant="outline-light" onClick={onClose} className="mx-2">
                    close </Button>
                <Button variant="outline-light" type="submit">
                    Submit  </Button>
            </Form>
        </Card>
    </Collapse >
}

export default Login;