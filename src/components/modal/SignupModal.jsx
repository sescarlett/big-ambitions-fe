import {Button, Card, Col, Form, FormControl, Modal, Row} from "react-bootstrap";
import {useState} from "react";

function SignupModal ({show, submitFunc, cancelFunc}) {
    const [edit, setEdit] = useState({});

    const handleClose = () => {
        cancelFunc();
    }

    const handleSubmit = () => {
        cancelFunc();
        submitFunc(edit);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEdit()
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign up to start!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <FormControl
                                    type="text"
                                    name="name"
                                    placeholder="Enter first name"
                                    value={edit?.firstName || ""}
                                    onChange={(e) => setEdit({ ...edit, firstName: e.target.value })}
                                />
                                <Form.Label>Last Name</Form.Label>
                                <FormControl
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={edit?.lastName || ""}
                                    onChange={(e) => setEdit({ ...edit, lastName: e.target.value })}
                                />
                                <Form.Label>Email</Form.Label>
                                <FormControl
                                    type="text"
                                    name="email"
                                    placeholder="Enter email"
                                    value={edit?.email || ""}
                                    onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                                />
                                <Form.Label>Password</Form.Label>
                                <FormControl
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={edit?.password || ""}
                                    onChange={(e) => setEdit({ ...edit, password: e.target.value })}
                                    autoComplete="new-password"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="dark" onClick={handleSubmit} className="button">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default SignupModal