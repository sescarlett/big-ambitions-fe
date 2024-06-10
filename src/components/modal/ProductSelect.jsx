import {useEffect, useState} from "react";
import {useApi} from "../../hooks/useApi.js";
import apiUrls from "../../enums/apiUrls.js";
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";

function ProductSelect ({show, productList, submitFunc, closeFunc, info}) {
    const [selected, setSelected] = useState([]);
    const [selectedDisplay, setSelectedDisplay] = useState([]);
    const [output, setOutput] = useState([]);
    const [outputSingle, setOutputSingle] = useState([]);
    const [inputMultiple, setInputMultiple] = useState([]);
    const [outputMultiple, setOutputMultiple] = useState([]);
    const [pageOne, setPageOne] = useState(true);
    const apiAddr = useApi();

    const handleClose = () => {
        pageOne ? closeFunc(): handleBack();

    }

    const handleNext = () => {
        apiAddr.post(apiUrls.businessProdsDisplays, selected)
            .then((res) => {
                setOutputSingle(res.data.singles);
                setInputMultiple(res.data.multiples);
                setPageOne(false);
            })
    }

    const handleBack = () => {
        setPageOne(true);
    }

    const handleSubmit = () => {
        if (pageOne) {
            handleNext();
        } else {
            setOutput(outputSingle);
            output.push(outputMultiple);
            submitFunc(output);
        }
    }

    const handleCheck = (id) => {
        const isSelected = selected.includes(id);
        if (isSelected) {
            const updatedSelected = selected.filter(itemId => itemId !== id);
            setSelected(updatedSelected);
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleCheckDisplays = (id1, id2) => {
        const isSelected = selectedDisplay.includes(id);
        if (isSelected) {
            const updatedSelected = selectedDisplay.filter(itemId => itemId !== id);
            setSelected(updatedSelected);
        } else {
            setSelected([...selected, id]);
        }
    }

    useEffect( () => {
        setSelected(info.productList.map((product) => product.productId));
        setSelectedDisplay(info.displayList.map((display) => display.displayId));
    }, [info]);

    console.log(inputMultiple);
    return(
        <Modal
            show={show}
            onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Select Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>{ pageOne && (
                        <div>
                            <Card.Subtitle>Check products for this business:</Card.Subtitle>
                            {productList.map((product) => (
                                <Form.Check
                                    key={product.productId}
                                    type="checkbox"
                                    label={product.name}
                                    checked={selected.includes(product.productId)}
                                    onChange={() => handleCheck(product.productId)}
                                />
                            ))}
                        </div>
                    )}
                        { !pageOne && (
                            <div>
                                <Card.Subtitle>Check chosen display for the following:</Card.Subtitle>
                                {inputMultiple.map((item) => (
                                    <Row key={item.value}>
                                        <Col>
                                            <Form.Check
                                                inline
                                                key={item.value}
                                                type="checkbox"
                                                checked={selectedDisplay.includes(item.value)}
                                                label={`${item.idName} | ${item.valueName}`}
                                                onChange={() => handleCheckDisplays(item.id, item.value)}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        )}

                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {pageOne ? 'Close' : 'Back'}
                </Button>
                <Button variant="dark" onClick={handleSubmit} className="button">
                    {pageOne ? 'Next' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    )

}
export default ProductSelect;
