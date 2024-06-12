import {Button, Card, CardBody, Col, Container, FormControl, FormLabel, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../contexts/AppContextProvider.jsx";
import {useApi} from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function ProfilePage () {
    const [details, setDetails] = useState({});
    const { appState: { id }} = useContext(AppContext);
    const apiAddr = useApi();

    const selectUser = () => {
        apiAddr.get(apiUrls.userInfo + id)
            .then((res) => setDetails(res.data))
    }

    useEffect(() => {
        selectUser();
    }, []);


    return(
        <Row>
            <Col xs={3}/>
            <Col>
                <Container>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Title className="mb-0">Profile</Card.Title>
                                <Button className="ml-auto mb-2 button" onClick={selectUser}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </div>
                            <Row>
                                <Card className="ml-3">
                                    <Card.Body>
                                        <Col>
                                            <Card.Subtitle className="mb-2">Personal Info</Card.Subtitle>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl
                                                type="text"
                                                value={details?.firstName}
                                                className="mb-2"
                                                onChange={(e) => setDetails({...details, firstName: e.target.value})}
                                            />
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl
                                                type="text"
                                                value={details?.lastName}
                                                className="mb-2"
                                                onChange={(e) => setDetails({...details, lastName: e.target.value})}
                                            />
                                            <FormLabel>Email</FormLabel>
                                            <FormControl
                                                type="text"
                                                value={details?.email}
                                                className="mb-2"
                                                onChange={(e) => setDetails({...details, email: e.target.value})}
                                            />
                                            <Button className="button mt-3">Save Changes</Button>
                                        </Col>
                                    </Card.Body>
                                </Card>
                                <Col>
                                    <Card>
                                        <CardBody>
                                            <Col className="mb-3">
                                                <Card.Subtitle className="mb-2">Account Controls</Card.Subtitle>
                                            </Col>
                                            <Col xs={12}>
                                                <Button className="button">Change Password</Button>
                                            </Col>
                                            <Col>
                                                <Button className="button mt-3">Delete Account</Button>
                                            </Col>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </Container>
            </Col>
            <Col xs={3}/>
        </Row>
    )

}
export default ProfilePage;
