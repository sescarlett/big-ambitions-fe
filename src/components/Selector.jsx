import { Card, ListGroup, Button } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function Selector({ title, items, onItemSelect, buttonDisabled, onButtonClick, defaultText }) {
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
                            <ListGroup.Item action onClick={() => onItemSelect(item.id)} key={item.id}>
                                {item.name} {item.extraInfo}
                            </ListGroup.Item>
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
