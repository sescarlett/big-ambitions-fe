import {Button, Card, Container, Form, Row} from "react-bootstrap";

function Import () {
    return(
        <Container>
            <Card>
                <Row>
                    <Form>
                        <Form.Select size="lg">
                            <option value="1">JetCargo Imports</option>
                            <option value="2">SeaSide Internationals</option>
                            <option value="3">United Ocean Imports</option>
                            <option value="4">BlueStone Imports</option>
                        </Form.Select>
                        <Form.Select size="lg">
                            <option value="3">Seven</option>
                            <option value="2">Three</option>
                            <option value="1">One</option>
                        </Form.Select>
                        <Button variant="dark" type="submit" className="mt-2 ms-auto">
                            Update
                        </Button>
                    </Form>
                </Row>
            </Card>
        </Container>
    )
}
export  default Import;
