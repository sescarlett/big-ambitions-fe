import {useContext, useEffect, useState} from "react";
import {useApi} from "../hooks/useApi.js";
import {Button, Card, Container, Table} from "react-bootstrap";
import DisplayModal from "../components/modal/DisplayModal.jsx";
import apiUrls from "../enums/apiUrls.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import routingUrls from "../enums/routingUrls.js";
import {AppContext} from "../contexts/AppContextProvider.jsx";

function DisplayPage () {
    const [itemList, setItemList] = useState([]);
    const [itemDetail, setItemDetail] = useState({});
    const emptyItem = {displayId: '', name: '', cost: '', customerCap: ''}
    const [showModal, setShowModal] = useState(false);
    const { appState: {isLoggedIn} } = useContext(AppContext);
    const apiAddr = useApi();
    const navigate = useNavigate();

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

    useEffect(() => {
        if(!isLoggedIn) {
            navigate(routingUrls.login);
        }
    }, []);

    return(
        <Container>
            <Card className="card-design">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mb-0 subtitle">Displays</Card.Title>
                        <Button className="ml-auto mb-2 button" onClick={newDisplay}>
                            <FontAwesomeIcon icon={faPlus} /> New Display
                        </Button>
                    </div>
                    <Table striped bordered size="sm" variant="secondary">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cost</th>
                            <th className="d-none d-sm-table-cell">Customer Capacity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemList.map((item) => (
                            <tr key={item.displayId}>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td className="d-none d-sm-table-cell">{item.customerCap}</td>
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
