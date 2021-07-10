import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Card, Form, InputGroup, Alert, ListGroup, Container, Col, Row } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup'
import { MyInput, MyRadios, MySelect, MyFile } from '../Forms/Inputs'
import LstInput from '../Forms/namesForms/parentApp'
import axios from "axios";



const NewRecipe = ({ connected, hasPageAaccess }) => {
    let history = useHistory();

    useEffect(() => {
        hasPageAaccess(connected, history)
        //eslint-disable-next-line
    }, [connected])


    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState();
    const [details, setDetails] = useState({
        recipeName: { isRequired: true, pattern: /\w{3,}/, msg: [], value: "", isInVaild: false },
        description: { isRequired: true, pattern: /[\s\S]{5,110}/, msg: [], value: "", isInVaild: false },
        servings: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
        cookingTime: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
        prepTimeMins: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
        level: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
        // image: { isRequired: true, pattern: /\.(gif|jpg|jpeg|jfif|tiff|png)$/i, msg: [], value: null, isInVaild: false },
        // passwordVerification: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
    })


    const send = event => {
        const data = new FormData();
        data.append("file", file)
        // console.log(data);

        axios.post("https://httpbin.org/anything", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

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
                console.log("err", error);
                return;
            }
        }

        console.log("input whitout errors!!!");
        setValidated(true);
        event.preventDefault();


        const allRelevantData = {
            id: JSON.parse(localStorage.getItem("user")).id,
            recipeName: details.recipeName.value,
            description: details.description.value,
            Servings: details.servings.value,
            CookingTime: details.cookingTime.value,
            prepTimeMins: details.prepTimeMins.value,
            level: details.level.value,
            // image: details.image.value,
        }
        alert(JSON.stringify(allRelevantData))
        // checkingSignUp(setValidated, setShow, allRelevantData)
    }

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


    const fileValidation = (target) => {
        const File = target.files[0]
        setFile(File)
        // console.log(file);

    }

    return <Container fluid>
        <h1 className="display-2 text-center"> Add A New Recipe</h1>
        {/* <Row className="phase-top">
            <Col className="active">1</Col>
            <Col>2</Col>

        </Row> */}
        <Alert show={show} variant="secondary" onClose={() => setShow(false)}>
            User recipe name already exist. Please try with another name.
        </Alert>
        <Row className="justify-content-center">
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-75 text-center">
                {/* <h1 className="display-4 text-center">Sign up</h1> */}

                <Form.Group >
                    <Form.Label>Recipe name:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="recipeName"
                            onBlur={e => validation(e.target)}
                            onChange={(e) => validation(e.target)}
                            value={details.recipeName.value}
                            placeholder="Enter recipe name..."
                            isInvalid={details.recipeName.isInVaild}
                            required
                        />
                        <Form.Control.Feedback type="invalid" className="feedback">
                            {details.recipeName.msg}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} className="text-center">
                        <Form.Label >Servings:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                name="servings"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.servings.value}
                                isInvalid={details.servings.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.servings.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} className="text-center">
                        <Form.Label>Cooking time in minutes:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                name="cookingTime"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.cookingTime.value}
                                isInvalid={details.cookingTime.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.cookingTime.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group as={Col} className="text-center">
                        <Form.Label>Prep time in minutes:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                name="prepTimeMins"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.prepTimeMins.value}
                                isInvalid={details.prepTimeMins.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.prepTimeMins.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group as={Col} className="text-center">
                        <Form.Label>Difficulty:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                as="select"
                                // type="number"
                                name="level"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.level.value}
                                isInvalid={details.level.isInVaild}
                                required>
                                <option value={""}>Select level...</option>
                                <option value={1}>easy</option>
                                <option value={2}>medium</option>
                                <option value={3}>Hard</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.level.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                </Form.Row>

                <Form.Group >
                    <Form.Label>Description:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="textarea"
                            name="description"
                            onBlur={e => validation(e.target)}
                            onChange={(e) => validation(e.target)}
                            value={details.description.value}
                            placeholder="Enter description..."
                            isInvalid={details.description.isInVaild}
                            required
                        />
                        <Form.Control.Feedback type="invalid" className="feedback">
                            {details.description.msg}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <InputGroup hasValidation>
                        <Form.File label="Image: "
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


                <Button variant="outline-dark" type="submit">Submit</Button>
                <Button variant="outline-dark" onClick={send}>only file</Button>
            </Form>
        </Row>
    </Container >
}

export default NewRecipe;


// {/* <Formik
//             initialValues={{
    //                 name: '',
    //                 source: '',
    //                 sourceLink: '',
    //                 jobType: '', // added for our select
    //                 isPrivate: '',
//                 description: ''
//             }}
//             validationSchema={Yup.object({
//                 name: Yup.string()
//                     .required('Required'),
//                 lastName: Yup.string()
//                     .required('Required'),
//                 email: Yup.string()
//                     .email('Invalid email address')
//                     .required('Required'),
//                 isPrivate: Yup.string().required('Required'),
//                 jobType: Yup.string()
//                     .oneOf(
//                         ['designer', 'development', 'product', 'other'],
//                         'Invalid Job Type'
//                     )
//                     .required('Required'),
//                 description: Yup.string().required('Required'),
//             })}
//             onSubmit={(values, { setSubmitting }) => {
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                     setSubmitting(false);
//                 }, 400);
//             }}
//         >
//             <Form hasValidation>
//                 <MyInput
//                     label="Recipe Name:"
//                     name="name"
//                     type="text"
//                     placeholder="Enter a name..."
//                 />

//                 {/* <MyInput
//                     label="Source Name:"
//                     name="SourceName"
//                     type="text"
//                     placeholder="Doe"
//                 /> */}
//                 <MyInput
//                     label="Source Website:"
//                     name="sourceLink"
//                     type="url"
//                     placeholder="Enter a url if exists..."
//                 />

//                 <MySelect label="Job Type" name="jobType">
//                     <option value="">Select a job type</option>
//                     <option value="designer">Designer</option>
//                     <option value="development">Developer</option>
//                     <option value="product">Product Manager</option>
//                     <option value="other">Other</option>
//                 </MySelect>

//                 <MyRadios
//                     name="isPrivate"
//                     label="Who will be able to watch the recipe:"
//                     options={[["everyone", 0], ["only me", 1]]}>
//                 </MyRadios>


//                 <MyFile
//                     name="file"
//                     label="File">
//                 </MyFile>

//                 <MyInput
//                     label="Description - Will be displayed below the title:"
//                     name="description"
//                     as="textarea"
//                     className="form-textarea"
//                     placeholder="Add a description of the dish..."
//                 />
//                 <hr ></hr>
//                 <LstInput />
//                 <Button type="submit">Submit</Button>
//             </Form>
//         </Formik> //