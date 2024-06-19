import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import ProductSelect from "./modal/ProductSelect.jsx";

function BusinessInfo ({info, productList, submitFunc}) {
    const [showModal, setShowModal] = useState(false);

    const handleUpdate = (obj) => {
        setShowModal(false);
        submitFunc(obj);
    }

    const calculateTotalCost = (list) => {
        let total = 0;
        list.forEach(display => {
            total += display.quantity * display.cost;
        });
        return parseInt(total);
    };

    useEffect( () => {
    }, [info]);

    return(
            <Card className="mb-2">
                <Card.Body>
                    <Card.Title>
                        <Button variant="dark" onClick={() => setShowModal(true)} className="button mr-2">Edit</Button>
                        {info?.businessName} | Capacity: {info.businessCap}
                    </Card.Title>
                    <Row>
                        <Col>
                            <Card.Subtitle>Products & Minimum Inventory</Card.Subtitle>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Cost</th>
                                </tr>
                                </thead>
                                <tbody>
                                {info.productList.map((product) => (
                                    <tr key={product.displayId}>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.cost}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2}>Total Cost</td>
                                    <td>{calculateTotalCost(info.productList)}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Card.Subtitle>Displays</Card.Subtitle>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Cost</th>
                                </tr>
                                </thead>
                                <tbody>
                                {info.displayList.map((display) => (
                                    <tr key={display.displayId}>
                                        <td>{display.name}</td>
                                        <td>{display.quantity}</td>
                                        <td>{display.cost}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2}>Total Cost</td>
                                    <td>{calculateTotalCost(info.displayList)}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
                <ProductSelect
                    show={showModal}
                    productList={productList}
                    submitFunc={handleUpdate}
                    info={info}
                    closeFunc={() => setShowModal(false)}/>
            </Card>
    )
}

export default BusinessInfo;
