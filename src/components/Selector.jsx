import {Card, ListGroup, Button, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

function Selector({ title, items, onItemSelect, buttonDisabled, onButtonClick, defaultText, deleteFunc }) {

    const handleDelete = (id) => {
        deleteFunc(id);
    }
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>
                    <Button variant="dark" className="button mr-2 large-font" onClick={onButtonClick} disabled={buttonDisabled}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {title}
                </Card.Title>
                <ListGroup defaultActiveKey="#link1" className="mb-2">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between align-items-center">
                                <ListGroup.Item action onClick={() => onItemSelect(item.id)} className="d-flex justify-content-between align-items-center">
                                    <Row>
                                        <Col>
                                            <Row>
                                                {item.name}
                                            </Row>
                                            <Row>
                                                {item.extraInfo}
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Button className="ml-2" onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTimes}/></Button>
                                </ListGroup.Item>

                            </div>
                        ))
                    ) : (
                        <p>{defaultText}</p>
                    )}
                </ListGroup>
                {/*<Button variant="dark" className="button" onClick={onButtonClick} disabled={buttonDisabled}>{buttonText}</Button>*/}
            </Card.Body>
        </Card>
    );
}

export default Selector;
