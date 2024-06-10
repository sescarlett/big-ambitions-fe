import {Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../contexts/AppContextProvider.jsx";

function Import ({ info, submitFunc, refresh}) {
    const { appState: { id } } = useContext(AppContext);
    const importRefresh = {
        gameId: id,
        importId: 1,
        dayPerOrderId: 3
    }
    const [importSelect, setImportSelect] = useState({importRefresh});

    const handleUpdate = () => {
        submitFunc(importSelect);
    }

    useEffect(() => {
        setImportSelect(importRefresh);
    }, [refresh]);

    useEffect(() => {
        handleUpdate();
    }, [importSelect]);

    console.log(info);
    return(
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Imports</Card.Title>
                    <Row>
                        <Col>
                        <Form className="mb-2">
                            <Form.Select
                                size="lg"
                                value={importSelect?.importId}
                                onChange={(e) => setImportSelect({...importSelect, importId: e.target.value})}
                            >
                                <option value={1}>JetCargo Imports</option>
                                <option value={2}>SeaSide Internationals</option>
                                <option value={3}>United Ocean Imports</option>
                                <option value={4}>BlueStone Imports</option>
                            </Form.Select>
                            <Form.Select
                                size="lg"
                                value={importSelect?.dayPerOrderId}
                                onChange={(e) => setImportSelect({...importSelect, dayPerOrderId: e.target.value})}
                            >
                                <option value={3}>Seven</option>
                                <option value={2}>Three</option>
                                <option value={1}>One</option>
                            </Form.Select>
                        </Form>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {info.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.productName}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
export  default Import;
