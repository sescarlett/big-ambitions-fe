import { Card, ListGroup, Button } from "react-bootstrap";

function Selector({ title, items, onItemSelect, buttonText, buttonDisabled, onButtonClick, defaultText }) {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <ListGroup defaultActiveKey="#link1" className="mb-2">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <ListGroup.Item action onClick={() => onItemSelect(item.id)} key={item.id}>
                                {item.name} {item.extraInfo}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <p>{defaultText}</p>
                    )}
                </ListGroup>
                <Button variant="dark" onClick={onButtonClick} disabled={buttonDisabled}>{buttonText}</Button>
            </Card.Body>
        </Card>
    );
}

export default Selector;
