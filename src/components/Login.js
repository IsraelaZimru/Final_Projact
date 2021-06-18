import { Button, Card, Form, Collapse } from "react-bootstrap";

function Login({ showLogin, onClose, onConnect }) {

    const toConnect = (e) => {
        e.preventDefault()
        onConnect()
        onClose()
    }

    return <Collapse in={showLogin}>
        <Card
            id="loginCard">
            <Form onSubmit={toConnect}>
                <h1 className="display-4 text-center">Login</h1>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        defaultValue="wawa@wawa.com" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        defaultValue="12345" />
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