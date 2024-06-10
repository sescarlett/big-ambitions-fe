import {useState} from "react";
import {Button, Card, Col, Form, FormControl, Modal, Row} from "react-bootstrap";

function GameModal({show, submitFunc, cancelFunc}) {
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
                <Modal.Title>Add a Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Label>Game Name</Form.Label>
                        <FormControl
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={edit?.name || ""}
                            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
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
export default GameModal;