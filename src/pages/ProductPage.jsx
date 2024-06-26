import {useContext, useEffect, useState} from "react";
import {useApi} from "../hooks/useApi.js";
import {Button, Card, Container, Table} from "react-bootstrap";
import apiUrls from "../enums/apiUrls.js";
import ProductModal from "../components/modal/ProductModal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import routingUrls from "../enums/routingUrls.js";
import {AppContext} from "../contexts/AppContextProvider.jsx";

function ProductPage () {
    const [itemList, setItemList] = useState([]);
    const [itemDetail, setItemDetail] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { appState: {isLoggedIn} } = useContext(AppContext);
    const apiAddr = useApi();
    const navigate = useNavigate();
    const emptyItem = {
        productId: '',
        name: '',
        cost: '',
        quantity: ''
    }

    const handleSubmit = (ProductOut) => {
        if(ProductOut.productId) {
            apiAddr.patch(apiUrls.productUpdate, ProductOut)
                .then(() => selectProductList())
        } else {
            apiAddr.post(apiUrls.productNew, ProductOut)
                .then(() => selectProductList())
        }
    }

    const newProduct = () => {
        setItemDetail(emptyItem);
        setShowModal(true);
    }

    const editProduct = (itemIn) => {
        setItemDetail(emptyItem);
        setItemDetail(itemIn);
        setShowModal(true);
    }

    const selectProductList = () => {
        apiAddr.get(apiUrls.productList)
            .then((res) => setItemList(res.data));
    }

    useEffect(() => {
        selectProductList();
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
                        <Card.Title className="mb-0 subtitle">Products</Card.Title>
                        <Button className="ml-auto mb-2 button" onClick={() => newProduct(emptyItem)}>
                            <FontAwesomeIcon icon={faPlus} /> New Product
                        </Button>
                    </div>
                    <Table striped bordered size="sm" variant="secondary">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cost</th>
                            <th className="d-none d-sm-table-cell">Importer(s)</th>
                            <th className="d-none d-sm-table-cell">Display(s)</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemList.map((item) => (
                            <tr key={item.productId}>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td className="d-none d-sm-table-cell">{item.importerNames}</td>
                                <td className="d-none d-sm-table-cell">{item.displayNames}</td>
                                <td>
                                    <Button variant="dark" size="sm" onClick={() => editProduct(item)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <ProductModal
                show={showModal}
                info={itemDetail}
                submitFunc={handleSubmit}
                cancelFunc={() => setShowModal(false)}
            />
        </Container>
    )
}
export default ProductPage;
