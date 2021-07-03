import { Button, Card, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useHistory } from "react-router";

function SignUp({ hasPageAaccess, connected }) {
    let history = useHistory();

    useEffect(() => {
        hasPageAaccess(!connected, history)
    }, [connected])

    return <Card className="m-5 w-75 p-3">
        <Form>
            <h1 className="display-3">Sign Up</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Card>
}

export default SignUp;