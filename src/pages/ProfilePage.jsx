import {Button, Card, CardBody, Col, Container, FormControl, FormLabel, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../contexts/AppContextProvider.jsx";
import {useApi} from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import routingUrls from "../enums/routingUrls.js";

function ProfilePage () {
    const [details, setDetails] = useState({});
    const { appState: { id, isLoggedIn }} = useContext(AppContext);
    const navigate = useNavigate();
    const apiAddr = useApi();

    const selectUser = () => {
        apiAddr.get(apiUrls.userInfo + id)
            .then((res) => setDetails(res.data))
    }

    useEffect(() => {
        selectUser();
    }, []);

    useEffect(() => {
        if(!isLoggedIn) {
            navigate(routingUrls.login);
        }
    }, []);

    return(
        <Container>
            <Row>
                <Col sm={1} md={2}/>
                <Col sm={10} md={8}>
                    <Card className="card-design">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Title className="mb-0 subtitle">Profile</Card.Title>
                                <Button className="ml-auto mb-2 button" onClick={selectUser}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </div>
                            <Row>
                                <Card className="ml-3 mb-3">
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2">Personal Info</Card.Subtitle>
                                        <Row>
                                            <Col xs={6}>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl
                                                    type="text"
                                                    value={details?.firstName}
                                                    className="mb-2"
                                                    onChange={(e) => setDetails({...details, firstName: e.target.value})}
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl
                                                    type="text"
                                                    value={details?.lastName}
                                                    className="mb-2"
                                                    onChange={(e) => setDetails({...details, lastName: e.target.value})}
                                                />
                                            </Col>
                                            <Col>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl
                                                    type="text"
                                                    value={details?.email}
                                                    className="mb-2"
                                                    onChange={(e) => setDetails({...details, email: e.target.value})}
                                                />
                                                <Button className="button mt-3">Save Changes</Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Col>
                                    <Card>
                                        <CardBody>
                                            <Card.Subtitle className="mb-3">Account Controls</Card.Subtitle>
                                            <Row>
                                                <Col sm={12} md={5}>
                                                    <Button className="button mb-2">Change Password</Button>
                                                </Col>
                                                <Col sm={12} md={5}>
                                                    <Button className="button">Delete Account</Button>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={1}/>
            </Row>
        </Container>
    )

}
export default ProfilePage;
