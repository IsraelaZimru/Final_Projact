import { useEffect } from "react";
import { useHistory } from "react-router";
import { Button, ListGroup, Container, Col, Row, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup'
import { MyInput, MyRadios, MySelect, MyFile } from '../Forms/Inputs'
import LstInput from '../Forms/namesForms/parentApp'



const NewRecipe = ({ connected, hasPageAaccess }) => {
    let history = useHistory();

    useEffect(() => {
        hasPageAaccess(connected, history)
        //eslint-disable-next-line
    }, [connected])



    return <Container>
        <h1 className="display-2"> Add A New Recipe</h1>
        <Row className="phase-top">
            <Col className="active">1</Col>
            <Col>2</Col>

        </Row>
        <Formik
            initialValues={{
                name: '',
                source: '',
                sourceLink: '',
                jobType: '', // added for our select
                isPrivate: '',
                description: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Required'),
                lastName: Yup.string()
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                isPrivate: Yup.string().required('Required'),
                jobType: Yup.string()
                    .oneOf(
                        ['designer', 'development', 'product', 'other'],
                        'Invalid Job Type'
                    )
                    .required('Required'),
                description: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            <Form hasValidation>
                <MyInput
                    label="Recipe Name:"
                    name="name"
                    type="text"
                    placeholder="Enter a name..."
                />

                {/* <MyInput
                    label="Source Name:"
                    name="SourceName"
                    type="text"
                    placeholder="Doe"
                /> */}
                <MyInput
                    label="Source Website:"
                    name="sourceLink"
                    type="url"
                    placeholder="Enter a url if exists..."
                />

                <MySelect label="Job Type" name="jobType">
                    <option value="">Select a job type</option>
                    <option value="designer">Designer</option>
                    <option value="development">Developer</option>
                    <option value="product">Product Manager</option>
                    <option value="other">Other</option>
                </MySelect>

                <MyRadios
                    name="isPrivate"
                    label="Who will be able to watch the recipe:"
                    options={[["everyone", 0], ["only me", 1]]}>
                </MyRadios>


                <MyFile
                    name="file"
                    label="File">
                </MyFile>

                <MyInput
                    label="Description - Will be displayed below the title:"
                    name="description"
                    as="textarea"
                    className="form-textarea"
                    placeholder="Add a description of the dish..."
                />
                <hr ></hr>
                <LstInput />
                <Button type="submit">Submit</Button>
            </Form>
        </Formik>
    </Container >
}

export default NewRecipe;