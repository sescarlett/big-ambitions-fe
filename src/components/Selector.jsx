import {Card, ListGroup, Button, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

function Selector({ title, items, onItemSelect, buttonDisabled, onButtonClick, defaultText, deleteFunc }) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleMouseEnter = (itemId) => {
        setHoveredItem(itemId);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
    const handleDelete = (id) => {
        deleteFunc(id);
    }

    // Logic to calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Card className="mb-2 select card-design">
            <Card.Body>
                <Card.Title className="subtitle">
                    <Button variant="dark" className="button mr-2 large-font" onClick={onButtonClick} disabled={buttonDisabled}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {title}
                </Card.Title>
                <ListGroup defaultActiveKey="#link1" className="mb-2">
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
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
                { items.length > 6 &&
                    <Pagination className="custom-pagination" size="sm">
                    {Array.from({length: Math.ceil(items.length / itemsPerPage)}, (_, i) => (
                        <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
                }
            </Card.Body>
        </Card>
    );
}

export default Selector;
