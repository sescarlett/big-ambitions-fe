import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useApi} from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";
import {AppContext} from "../contexts/AppContextProvider.jsx";
import routingUrls from "../enums/routingUrls.js";

function LoginPage () {
    const [logon, setLogon] = useState({})
    const { setAppState } = useContext(AppContext);
    const apiAddr  = useApi();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLogon({...logon, [name] : value})
    }

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await apiAddr.post(apiUrls.login, logon);
            setAppState({ id: response.data });
            sessionStorage.setItem('userId', response.data);
            navigate(routingUrls.home);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid="sm">
            <Row className="justify-content-md-center">
                <Col md="auto">Login</Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
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
                        {/*<Form.Text>sign up</Form.Text>*/}
                        <Button variant="primary" type="submit" >
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default LoginPage;
