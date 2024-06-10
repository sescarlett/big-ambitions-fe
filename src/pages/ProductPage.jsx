import {useEffect, useState} from "react";
import {useApi} from "../hooks/useApi.js";
import {Button, Card, Container, Table} from "react-bootstrap";
import apiUrls from "../enums/apiUrls.js";
import ProductModal from "../components/modal/ProductModal.jsx";

function ProductPage () {
    const [itemList, setItemList] = useState([]);
    const [itemDetail, setItemDetail] = useState({});
    const [showModal, setShowModal] = useState(false);
    const apiAddr = useApi();
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

    return(
        <Container>
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mb-0">Products</Card.Title>
                        <Button className="ml-auto mb-2 button" onClick={() => newProduct(emptyItem)}>New</Button>
                    </div>
                    <Table striped bordered size="sm">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Importer(s)</th>
                            <th>Display(s)</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemList.map((item) => (
                            <tr key={item.productId}>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td>{item.importerNames}</td>
                                <td>{item.displayNames}</td>
                                <td>
                                    <Button variant="dark" size="sm" onClick={() => editProduct(item)}>
                                        EDIT
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
