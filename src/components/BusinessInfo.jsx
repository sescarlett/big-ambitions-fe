import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";

function BusinessInfo ({info, productList, submitFunc}) {
    const [selected, setSelected] = useState([]);

    const handleUpdate = (event) => {
        event.preventDefault();
        submitFunc(selected);
    }

    const calculateTotalCost = (list) => {
        let total = 0;
            list.forEach(display => {
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

    useEffect( () => {
        setSelected(info.productList.map((product) => product.productId));
    }, [info]);

    return(
        <Container>
            <Card>
                <Card.Body>
                        <Card.Title>
                            <Button variant="dark" onClick={handleUpdate} className="button mr-2">Update</Button>
                            {info?.businessName} | Capacity: {info.businessCap}
                        </Card.Title>
                    <Row>
                        <Col>
                            <Card.Subtitle>Products</Card.Subtitle>
                            <Form>
                                {productList.map((product) => (
                                    <Form.Check
                                        key={product.productId}
                                        type="checkbox"
                                        label={product.name}
                                        checked={selected.includes(product.productId)}
                                        onChange={() => handleCheck(product.productId)}
                                    />
                                ))}
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
                                        <td>{calculateTotalCost(info.displayList)}</td>
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
                                            <td>{product.cost}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={2}>Total Cost</td>
                                        <td>{calculateTotalCost(info.productList)}</td>
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
