import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useApi} from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";

function BusinessInfo ({info, productList}) {
    const [selected, setSelected] = useState([]);
    const apiAddr = useApi();

    useEffect( () => {
        setSelected(info.productList.map((product) => product.productId));
    }, [info.businessId]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        console.log(apiUrls.businessProdsUpdate + info?.businessId);
        console.log(selected);
        await apiAddr.patch(apiUrls.businessProdsUpdate + info?.businessId, selected)
    }

    const calculateTotalCost = () => {
        let total = 0;
            info.displayList.forEach(display => {
                total += display.quantity * display.cost;
            });
        return total;
    };

    const handleCheck = (id) => {
        const isSelected = selected.includes(id);
        if (isSelected) {
            const updatedSelected = selected.filter(itemId => itemId !== id);
            setSelected(updatedSelected);
        } else {
            setSelected([...selected, id]);
        }
    };

    console.log(info)
    return(
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>{info?.businessName} | Capacity: {info.businessCap}</Card.Title>
                <Row>
                    <Col>
                        <Card.Subtitle>Products</Card.Subtitle>
                        <Form onSubmit={handleUpdate}>
                            {productList.map((product) => (
                                <Form.Check
                                    key={product.productId}
                                    type="checkbox"
                                    label={product.name}
                                    checked={selected.includes(product.productId)}
                                    onChange={() => handleCheck(product.productId)}
                                />
                            ))}
                            <Button variant="dark" type="submit" className="mt-2">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <Row>
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
                                    <td>{calculateTotalCost()}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Card.Subtitle>Minimum Inventory</Card.Subtitle>
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
                                        <td>{product.value}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2}>Total Cost</td>
                                    <td>{calculateTotalCost()}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default BusinessInfo;
