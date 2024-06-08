import {Button, Card, Container} from "react-bootstrap";
import {useEffect, useState} from "react";

function ProductDetailModal ({info, submitFunc, cancelFunc}) {
    const [edit, setEdit] = useState({});

    const handleSubmit = () => {
        submitFunc(edit);
    };

    const handleCancel = () => {
        cancelFunc();
    }

    useEffect(() => {
        setEdit(info);
    }, [info]);

    console.log(edit)
    return(
        <Container>
            <Card>
                <Card.Title>Product details</Card.Title>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Save changes</Button>
            </Card>
        </Container>
    )
}
export default ProductDetailModal;
