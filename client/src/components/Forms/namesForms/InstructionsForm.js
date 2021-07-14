import { Formik } from 'formik';
import * as Yup from 'yup'
import { MyInput, MySelect } from '../Inputs';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Col, Container } from 'react-bootstrap';


function InstructionsForm({ onCatchInput, onAddInstruction }) {
    return <Container className="mt-3 text-center">
        <Formik
            initialValues={{
                Quantity: 0,
                ingredient: '',
                measure: '',
                comment: '', // added for our select
            }}
            validationSchema={Yup.object({
                Quantity: Yup.number()
                    .required('Required'),
                ingredient: Yup.string()
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {//not working!
                setSubmitting(false);
                // setTimeout(() => {
                //     alert(JSON.stringify(values, null, 2));
                // }, 400);
                resetForm()
                onAddInstruction(values)
            }}>
            <Form>
                <Form.Row>
                    <Col>
                        <MyInput
                            label="Quantity"
                            name="Quantity"
                            type="number"
                        />
                    </Col>
                    <Col>
                        <MySelect
                            label="ingredient "
                            name="ingredient">
                            <option value="">Select an ingredient</option>
                            <option value="designer">Designer</option>
                            <option value="development">Developer</option>
                            <option value="product">Product Manager</option>
                            <option value="other">Other</option>
                        </MySelect>
                    </Col>

                    <Col>
                        <MySelect
                            label="Unit of measure"
                            name="measure">
                            <option value="">Select one...</option>
                            <option value="designer">Designer</option>
                            <option value="development">Developer</option>
                            <option value="product">Product Manager</option>
                            <option value="other">Other</option>
                        </MySelect>
                    </Col>

                    <Col>
                        <MyInput
                            label="Optional comment"
                            name="comment"
                            type="text"
                        />
                    </Col>
                </Form.Row>
            </Form>
        </Formik>
        <form>


            <h5><em> Add New Name:</em></h5>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => onCatchInput(e.target)}
                    id="nameInput"></input>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
            // onClick={(e) => { e.preventDefault(); onaddName(e.target) }}
            >
                Submit1234
            </button>
        </form>
    </Container>
}

export default InstructionsForm;