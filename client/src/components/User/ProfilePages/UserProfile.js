import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Container, Row, Alert, Col, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { updateUserInfo } from "../../../DAL/api";

const UserProfile = ({ connected, hasPageAaccess, getDetaildsFromDb, userUpdateHandler }) => {
    let history = useHistory();
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState({
        email: { isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: [], value: "", isInVaild: false },
        firstName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
        lastName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
        password: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
        // passwordVerification: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
    })

    useEffect(() => {
        hasPageAaccess(connected, history)
        window.scrollTo(0, 0);
    }, [connected])

    useEffect(() => {
        window.scrollTo(0, 0);
        const user = userData()
        // console.log("user", user)
    }, [])

    const changeValues = (obj) => {
        const temp = details;
        for (let key in temp) {
            temp[key].value = obj[key]
        }
        setDetails(prev => ({ ...temp }))
    }


    const userData = async () => {
        try {
            const getDetaildsFromloaclhost = JSON.parse(localStorage.getItem("user")).id;
            const user = await getDetaildsFromDb({ id: getDetaildsFromloaclhost })
            console.log("user", user);
            await changeValues(...user)
        } catch (err) {
            console.log(err)
        }
    }


    const handleSubmit = async (event) => {
        // console.log("enetr sumbit");
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
        event.preventDefault();

        const allRelevantData = {
            id: JSON.parse(localStorage.getItem("user")).id,
            email: details.email.value,
            firstName: details.firstName.value,
            lastName: details.lastName.value,
            password: details.password.value
        }
        setLoading(true)
        const checkUpdateDb = await updateUserInfo(allRelevantData)
        setLoading(false)
        console.log("checkUpdateDb", checkUpdateDb);
        if (!checkUpdateDb) {
            setValidated(false);
            setShow(true)
            setTimeout(() => setShow(false), 3000)
        } else {
            setValidated(true);
            alert("Updated successfully")
            // const info = { email: details.email.value, password: details.password.value }
            // console.log("מה הגיע מעדכון פרטים:", checkUpdateDb, "מידע חדש מהקומפוננטה", allRelevantData)
            userUpdateHandler(checkUpdateDb)
            history.push("/")
        }
    };

    function validation({ name, value }) {
        const errorMsg = [];
        let isMsgShowing = false;
        if (value === "") {
            isMsgShowing = true
            errorMsg.push(`${name} is required.`)
        } else if (details[name].isRequired && (details[name].pattern).test(value)) {
            isMsgShowing = false
        } else {
            errorMsg.push(`${name} is not valid.`)
            isMsgShowing = true
        }
        setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))
        return errorMsg[0] //importent for sumbit form!!!
    }

    return <Container fluid className="aboutmeBkgd p-3">
        <Alert show={show} variant="danger" className="text-center" onClose={() => setShow(false)}>
            User email already exist. Please try with another email.
        </Alert>
        <h1 className="display-2 mb-5 bolder"> My Profile </h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50 mb-5">
            <Row>
                <Col md={12}>
                    <Form.Group >
                        <Form.Label>First name:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                name="firstName"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.firstName.value}
                                isInvalid={details.firstName.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.firstName.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group >
                        <Form.Label>Last name:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                name="lastName"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.lastName.value}
                                isInvalid={details.lastName.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.lastName.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="email"
                                name="email"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.email.value}
                                isInvalid={details.email.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.email.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                {/* <Col md={3}>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="password"
                                name="password"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.password.value}
                                isInvalid={details.password.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.password.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col> */}
            </Row>

            <Button variant="outline-dark" type="submit" className="mr-2">
                {loading && <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />}
                {loading ? <span>Loading...</span> : <span>update</span>}
            </Button>

        </Form>
    </Container >
}

export default UserProfile;