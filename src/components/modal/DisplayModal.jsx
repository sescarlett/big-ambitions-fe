import {useEffect, useState} from "react";
import {Button, Col, Form, FormControl, Modal, Row} from "react-bootstrap";

function DisplayModal ({show, info, submitFunc, cancelFunc}) {
    const [edit, setEdit] = useState({});

    const handleClose = () => {
        cancelFunc();
    }

    const handleSubmit = () => {
        submitFunc(edit)
    }

    useEffect(() => {
        setEdit(info);
    }, [info]);

    return(
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add/Update Display</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={5}>
                        <Form.Label>Name</Form.Label>
                        <FormControl
                            type="text"
                            name="name"
                            placeholder="Enter first name"
                            value={edit?.name || ""}
                            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Cost</Form.Label>
                        <FormControl
                            type="text"
                            name="cost"
                            placeholder="Enter cost"
                            value={edit?.cost || ""}
                            onChange={(e) => setEdit({ ...edit, cost: e.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Customer Capacity</Form.Label>
                        <FormControl
                            type="text"
                            name="customerCap"
                            placeholder="Enter customer capacity"
                            value={edit?.customerCap || ""}
                            onChange={(e) => setEdit({ ...edit, customerCap: e.target.value })}
                        />
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
export default DisplayModal;