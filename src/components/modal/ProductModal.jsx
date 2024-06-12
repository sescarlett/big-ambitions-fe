import {Button, Card, Col, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useApi} from "../../hooks/useApi.js";
import apiUrls from "../../enums/apiUrls.js";

function ProductModal ({show, info, submitFunc, cancelFunc}) {
    const [edit, setEdit] = useState({});
    const [selected, setSelected] = useState([]);
    const [primaryDisplay, setPrimaryDisplay] = useState({});
    const [secondaryDisplay, setSecondaryDisplay] = useState({});
    const [tertiaryDisplay, setTertiaryDisplay] = useState({});
    const [displayList, setDisplayList] =useState([]);
    const apiAddr = useApi();

    const handleSubmit = () => {
        // Create a new object to hold the updated values
        const updatedEdit = { ...edit };

        const val = (edit?.volume && edit?.sumCap) ? edit.volume / ((edit.sumCap / 5) * 7) : edit?.quantity;

        // Update product info
        updatedEdit.name = edit?.name; // Update with appropriate form field values
        updatedEdit.cost = edit?.cost; // Update with appropriate form field values
        updatedEdit.value = val; // Update with appropriate form field values

        // Update primary display
        if (primaryDisplay.id) {
            updatedEdit.displays = [primaryDisplay];
        }

        // Update secondary display if it exists
        if (secondaryDisplay.id) {
            updatedEdit.displays.push(secondaryDisplay);
        }

        // Update third display if it exists
        if (tertiaryDisplay.id) {
            updatedEdit.displays.push(tertiaryDisplay);
        }

        // Update importers
        updatedEdit.importers = selected;

        submitFunc(updatedEdit);
        handleClose();
    };

    const handleClose = () => {
        setSelected([]);
        setPrimaryDisplay({});
        setSecondaryDisplay({});
        setTertiaryDisplay({});
        cancelFunc();
    }

    const handleCheck = (id) => {
        const intId = parseInt(id, 10);
        const isSelected = selected.includes(intId);
        if (isSelected) {
            const updatedSelected = selected.filter(itemId => itemId !== intId);
            setSelected(updatedSelected);
        } else {
            setSelected([...selected, intId]);
        }
    };

    const handleDisplayUpdate = (event, setDisplay, displayState) => {
        const { name, value } = event.target;
        setDisplay({ ...displayState, [name]: value });
    };

    useEffect(() => {
        setEdit(info);
    }, [info]);

    useEffect(() => {
        apiAddr.get(apiUrls.displayList)
            .then((response) => setDisplayList(response.data));
    }, []);

    useEffect(() => {
        if(edit?.productId) {
            apiAddr.get(apiUrls.importXProduct + edit?.productId)
                .then((response) => setSelected(response.data));
            apiAddr.get(apiUrls.displayProducts + edit?.productId)
                .then((response) => {
                    if(response.data.length > 0) {
                        setPrimaryDisplay(response.data[0]);
                    }
                    if(response.data.length > 1) {
                        setSecondaryDisplay(response.data[1]);
                    }
                    if(response.data.length > 2) {
                        setTertiaryDisplay(response.data[2]);
                    }
                });
        }
    }, [edit]);

    console.log(edit)
    return(
        <Modal show={show}
               onHide={handleClose}
               size="lg"
               backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add/Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Card.Subtitle>Product Info</Card.Subtitle>
                        <Row>
                            <Col>
                                <Form.Label>Name</Form.Label>
                                <FormControl
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    value={edit?.name || ""}
                                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Cost/Unit</Form.Label>
                                <FormControl
                                    type="text"
                                    name="cost"
                                    placeholder="Enter cost"
                                    value={edit?.cost || ""}
                                    onChange={(e) => setEdit({ ...edit, cost: e.target.value })}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Total sold per week | Total Capacity</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        name="value"
                                        placeholder="ex. 450"
                                        value={edit?.volume || ""}
                                        onChange={(e) => setEdit({ ...edit, volume: e.target.value })}
                                    />
                                    <FormControl
                                        type="text"
                                        name="value"
                                        placeholder="ex. 60"
                                        value={edit?.sumCap || ""}
                                        onChange={(e) => setEdit({ ...edit, sumCap: e.target.value })}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Row className="pt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle>Display #1</Card.Subtitle>
                                <Form.Group controlId="displaySelection">
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Select display</Form.Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Select
                                                        size="lg"
                                                        name="id"
                                                        placeholder="Select Display"
                                                        value={primaryDisplay?.id}
                                                        defaultValue={0}
                                                        onChange={(e) => handleDisplayUpdate(e, setPrimaryDisplay, primaryDisplay)}
                                                    >
                                                        <option>Select...</option>
                                                        {displayList.map((display) => (
                                                            <option key={display.displayId} value={display.displayId}>{display.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Form.Label>Inventory Capacity</Form.Label>
                                            <FormControl
                                                type="text"
                                                name="primaryDisplayValue"
                                                placeholder="Enter inventory cap"
                                                value={primaryDisplay?.value || ""}
                                                onChange={(e) => setPrimaryDisplay({ ...primaryDisplay, value: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle>Display #2 (Opt)</Card.Subtitle>
                                <Form.Group controlId="displaySelection">
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Select display</Form.Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Select
                                                        name="id"
                                                        placeholder="Select Display"
                                                        value={secondaryDisplay?.id}
                                                        defaultValue={0}
                                                        onChange={(e) => handleDisplayUpdate(e, setSecondaryDisplay, secondaryDisplay)}
                                                    >
                                                        <option>Select...</option>
                                                        {displayList.map((display) => (
                                                            <option key={display.displayId} value={display.displayId}>{display.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Form.Label>Inventory Capacity</Form.Label>
                                            <FormControl
                                                type="text"
                                                name="primaryDisplayValue"
                                                placeholder="Enter inventory cap"
                                                value={secondaryDisplay?.value || ""}
                                                onChange={(e) => setSecondaryDisplay({ ...secondaryDisplay, value: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle>Display #3 (Opt.)</Card.Subtitle>
                                <Form.Group controlId="displaySelection">
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Select display</Form.Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Select
                                                        name="id"
                                                        placeholder="Select Display"
                                                        value={tertiaryDisplay?.id}
                                                        defaultValue={0}
                                                        onChange={(e) => handleDisplayUpdate(e, setTertiaryDisplay, tertiaryDisplay)}
                                                    >
                                                        <option>Select...</option>
                                                        {displayList.map((display) => (
                                                            <option key={display.displayId} value={display.displayId}>{display.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Form.Label>Inventory Capacity</Form.Label>
                                            <FormControl
                                                type="text"
                                                name="primaryDisplayValue"
                                                placeholder="Enter inventory cap"
                                                value={tertiaryDisplay?.value || ""}
                                                onChange={(e) => setTertiaryDisplay({ ...tertiaryDisplay, value: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle>Check Importer(s)</Card.Subtitle>
                                <Form.Group controlId="importSelect">
                                    <Form.Check
                                        inline
                                        label="JetCargo Imports"
                                        value={1}
                                        name="i1"
                                        checked={selected.includes(1 || '1')}
                                        onChange={(e) => handleCheck(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="SeaSide Internationals"
                                        value={2}
                                        name="i2"
                                        checked={selected.includes(2 || '2')}
                                        onChange={(e) => handleCheck(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="United Ocean Imports"
                                        value={3}
                                        name="i3"
                                        checked={selected.includes(3 || '3')}
                                        onChange={(e) => handleCheck(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="BlueStone Imports"
                                        value={4}
                                        name="i4"
                                        checked={selected.includes(4 || '4')}
                                        onChange={(e) => handleCheck(e.target.value)}
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
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
export default ProductModal;