import { useState, useEffect } from "react";
import { Button, Card, Form, Collapse, InputGroup, Alert, Spinner } from "react-bootstrap";
import { checkLoginAccess } from "../../../DAL/api";

function Login({ showLogin, onClose, setConnected, setUser }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [validated, setValidated] = useState(false);
    const [details, setDetails] = useState({
        email: { isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: [], value: "", isInVaild: false },
        password: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
    })

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!showLogin) {
            setError(false);
            setDetails(prevDetails => ({
                ...prevDetails,
                email: { ...prevDetails["email"], value: "", isInVaild: false },
                password: { ...prevDetails["password"], value: "", isInVaild: false }
            }))

        }
    }, [showLogin])

    // const handleSubmit = async (event) => {
    //     const checkErrors = [];
    //     for (const key in details) {
    //         if (Object.hasOwnProperty.call(details, key)) {
    //             checkErrors.push(validation({ name: key, value: details[key].value }))

    //         }
    //     }

    //     for (const error of checkErrors) { //if there is error msg ->submit don't happens!
    //         if (error) {
    //             setValidated(false)
    //             event.preventDefault();
    //             event.stopPropagation();
    //             return;
    //         }
    //     }
    //     setLoading(true)
    //     setValidated(true);
    //     event.preventDefault();
    //     const info = { email: details.email.value, password: details.password.value }
    //     const chekingDetails = await checkLoginAccess(info)
    //     console.log("chekingDetails", chekingDetails);
    //     const res = await checkingMatch(chekingDetails);
    //     setLoading(false)
    //     if (res) {
    //         setConnected(true);
    //         setUser(prev => chekingDetails);
    //         localStorage.setItem("user", JSON.stringify(chekingDetails))
    //         setError(false)
    //         // const initialization = {
    //         //     ...details,
    //         //     password: { ...details["password"], value: "", isInVaild: false },
    //         //     email: { ...details["email"], value: " ", isInVaild: false },
    //         // }
    //         // setDetails(prevDetails => initialization)
    //         onClose()

    //     } else {
    //         setLoading(true)
    //         setValidated(false);
    //         console.log("error changed to true-", error);
    //         setError(true)
    //     }
    // };

    // const checkingMatch = isData => {
    //     if (isData.error) {
    //         console.log('no match');
    //         return false;
    //     }
    //     setConnected(true);
    //     onClose()
    //     return true;
    // }


    const handleSubmit = async (event) => {
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
        setLoading(true)
        setValidated(true);
        event.preventDefault();
        const info = { email: details.email.value, password: details.password.value }
        const chekingDetails = await checkLoginAccess(info)
        const res = await checkingMatch(chekingDetails);
        setLoading(false)
        if (res) {
            setConnected(true);
            setUser(prev => chekingDetails);
            localStorage.setItem("user", JSON.stringify(chekingDetails))
            setError(false)
            // const initialization = {
            //     ...details,
            //     password: { ...details["password"], value: "", isInVaild: false },
            //     email: { ...details["email"], value: " ", isInVaild: false },
            // }
            // setDetails(prevDetails => initialization)
            onClose()

        } else {
            setLoading(false)
            setValidated(false);
            console.log("error changed to true-", error);
            setError(true)
        }
    };

    const checkingMatch = isData => {
        // console.log("isData", isData);
        if (!isData) {
            console.log('no match');
            return false;
        }
        setConnected(true);
        onClose()
        return true;
    }


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
        console.log(name, "value", value, "isMsgShowing", isMsgShowing, "errorMsg", errorMsg);
        setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))
        return errorMsg[0] //importent for sumbit form!!!
    }

    return <Collapse in={showLogin}>
        <Card
            id="loginCard">
            <Alert show={error} variant="secondary" onClose={() => setError(false)}>
                Worng email or password ! try again.
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
                            onChange={e => validation(e.target)}
                            value={details.email.value}
                            placeholder="Enter email..."
                            isInvalid={details.email.isInVaild}
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
                            onChange={e => validation(e.target)}
                            value={details.password.value}
                            placeholder="Enter password..."
                            isInvalid={details.password.isInVaild}
                        />
                        <Form.Control.Feedback type="invalid" className="feedback">
                            {details.password.msg}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button variant="outline-dark" onClick={onClose} className="mx-2">
                    close </Button>
                <Button variant="outline-dark" type="submit">
                    {loading && <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />}
                    {loading ? <span>Loading...</span> : <span>Submit</span>}
                </Button>
            </Form>
        </Card>
    </Collapse >
}

export default Login;