import {useEffect, useState} from "react";
import {useApi} from "../hooks/useApi.js";
import {Button, Card, Container, Table} from "react-bootstrap";
import DisplayModal from "../components/modal/DisplayModal.jsx";
import apiUrls from "../enums/apiUrls.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

function DisplayPage () {
    const [itemList, setItemList] = useState([]);
    const [itemDetail, setItemDetail] = useState({});
    const emptyItem = {displayId: '', name: '', cost: '', customerCap: ''}
    const [showModal, setShowModal] = useState(false);
    const apiAddr = useApi();

    const handleSubmit = (displayOut) => {
        if(displayOut.displayId) {
            apiAddr.patch(apiUrls.displayUpdate, displayOut)
                .then(() => selectDisplayList())
        } else {
            apiAddr.post(apiUrls.displayNew, displayOut)
                .then(() => selectDisplayList())
        }
        setShowModal(false);
    }

    const newDisplay = () => {
        setItemDetail(emptyItem);
        setShowModal(true);
    }

    const editDisplay = (itemIn) => {
        setItemDetail(emptyItem);
        setItemDetail(itemIn);
        setShowModal(true);
    }

    const selectDisplayList = () => {
        apiAddr.get(apiUrls.displayList)
            .then((res) => setItemList(res.data));
    }

    useEffect(() => {
        selectDisplayList();
    }, []);

    return(
        <Container>
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mb-0">Displays</Card.Title>
                        <Button className="ml-auto mb-2 button" onClick={newDisplay}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                    <Table striped bordered size="sm">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Customer Capacity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemList.map((item) => (
                            <tr key={item.displayId}>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td>{item.customerCap}</td>
                                <td>
                                    <Button variant="dark" size="sm" onClick={() => editDisplay(item)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <DisplayModal
                show={showModal}
                info={itemDetail}
                submitFunc={handleSubmit}
                cancelFunc={() => setShowModal(false)}
            />
        </Container>
    )
}
export default DisplayPage;
