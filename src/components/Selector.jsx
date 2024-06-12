import {Card, ListGroup, Button } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

function Selector({ title, items, onItemSelect, buttonDisabled, onButtonClick, defaultText, deleteFunc }) {
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (itemId) => {
        setHoveredItem(itemId);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
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
                            <div
                                key={item.id}
                                className="box-div"
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="box" onClick={() => onItemSelect(item.id)}>
                                    <div>
                                        <div>{item.name}</div>
                                        <div>{item.extraInfo}</div>
                                    </div>
                                    {hoveredItem === item.id && (
                                        <Button className="button-danger" variant="dark" onClick={() => handleDelete(item.id)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    )}
                                </div>
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
