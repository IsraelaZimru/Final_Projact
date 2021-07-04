import { Navbar, Nav, NavDropdown, Container, Col, Row } from "react-bootstrap"

export default function Aaa() {
    return <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Container>
            <Row>
                <Col sm={false}>sm=false</Col>
                <Col sm={false}>sm=false</Col>
                <Col sm={false}>sm=false</Col>
            </Row>
            <Row>
                <Col sm={false}>sm=true</Col>
                <Col sm={false}>sm=true</Col>
                <Col sm={false}>sm=true</Col>
            </Row>
        </Container>
    </>
}





























// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// export default function Aaa() {
//     return <Formik
//         initialValues={{ firstName: '', lastName: '', email: '' }}
//         validationSchema={Yup.object({
//             firstName: Yup.string()
//                 .max(15, 'Must be 15 characters or less')
//                 .required('Required'),
//             lastName: Yup.string()
//                 .max(20, 'Must be 20 characters or less')
//                 .required('Required'),
//             email: Yup.string().email('Invalid email address').required('Required'),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//                 alert(JSON.stringify(values, null, 2));
//                 setSubmitting(false);
//             }, 400);
//         }}
//     >
//         <Form>
//             <label htmlFor="firstName">First Name</label>
//             <Field name="firstName" type="text" />
//             <ErrorMessage name="firstName" />

//             <label htmlFor="lastName">Last Name</label>
//             <Field name="lastName" type="text" />
//             <ErrorMessage name="lastName" />

//             <label htmlFor="email">Email Address</label>
//             <Field name="email" type="email" />
//             <ErrorMessage name="email" />

//             <button type="submit">Submit</button>
//         </Form>
//     </Formik>
// }
