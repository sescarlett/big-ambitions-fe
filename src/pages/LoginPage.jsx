import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { useApi } from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";
import { AppContext } from "../contexts/AppContextProvider.jsx";
import routingUrls from "../enums/routingUrls.js";
import SignupModal from "../components/modal/SignupModal.jsx";

function LoginPage() {
    const [logon, setLogon] = useState({});
    const [ showModal, setShowModal] = useState(false);
    const [isUser, setIsUser] = useState(true);
    const { setAppState } = useContext(AppContext);
    const apiAddr = useApi();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogon({ ...logon, [name]: value });
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await apiAddr.post(apiUrls.login, logon);
            setAppState({ id: response.data });
            sessionStorage.setItem("userId", response.data);
            setIsUser(true);
            navigate(routingUrls.home);
        } catch (error) {
            setIsUser(false);
        }
    };

    const handleSubmit = async (newUser) => {
        await apiAddr.post(apiUrls.userNew, newUser);
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <Container className="container-xs">
            <Row>
                <Col md={3} xl={4}></Col>
                <Col>
                    <Card>
                        <Row className="m-2">
                            <Col>
                                <h2>Welcome!</h2>
                                <Form onSubmit={onLogin}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={logon?.email}
                                            placeholder="Enter email"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={logon?.password}
                                            placeholder="Password"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Form.Group>
                                    <div className="signup-link" onClick={openModal}>
                                        <span>Not a user? Sign up!</span>
                                    </div>
                                    <Button variant="dark" type="submit" className="button">
                                        Login
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={3} xl={4}></Col>
            </Row>
            <SignupModal show={showModal} submitFunc={handleSubmit} cancelFunc={() => setShowModal(false)}/>
            <Alert variant="danger" hidden={isUser}>Username/password incorrect</Alert>
        </Container>
    );
}
export default LoginPage;
