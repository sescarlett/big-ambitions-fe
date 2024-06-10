import {useState} from "react";
import {Button, Col, Form, FormControl, Modal, Row} from "react-bootstrap";

function BusinessModal({show, submitFunc, cancelFunc}) {
    const [edit, setEdit] = useState({});

    const handleClose = () => {
        cancelFunc();
    }

    const handleSubmit = () => {
        cancelFunc();
        submitFunc(edit)
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Business</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Label>Business Name</Form.Label>
                        <FormControl
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                        />
                    </Col>
                    <Col xs={4}>
                        <Row>
                                <Form.Label>Store Capacity</Form.Label>
                        </Row>
                        <Row>
                        <Form.Select
                            size="lg"
                            name="id"
                            placeholder="Select Store Capacity"
                            defaultValue={0}
                            onChange={(e) => setEdit({ ...edit, size: e.target.value })}
                        >
                            <option>Select...</option>
                            <option value={1}>15</option>
                            <option value={2}>30</option>
                            <option value={3}>40</option>
                            <option value={4}>75</option>
                        </Form.Select>
                        </Row>
                    </Col>
                </Row>
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
export default BusinessModal;
