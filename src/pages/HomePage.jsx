import {Button, Card, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useApi} from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";

function HomePage () {
    //gameList is a list of objects with gameId, name and numBusiness

    const [gameList, setGameList] = useState([]);
    const [businessList, setBusinessList] = useState([]);
    const [gameId, setGameId] = useState(null);
    const [businessId, setBusinessId] = useState(null);
    const apiAddr  = useApi();

    const handleGameId = (id) => {
        setGameId(id);
    }

    const handleBusinessId = (id) => {
        setBusinessId(id);
    }

    useEffect(() => {
        apiAddr.get(apiUrls.gameList+1)
            .then((response) => {
                setGameList(response.data);
            });
        apiAddr.get(apiUrls.businessList + gameId)
            .then((response) => {
                setBusinessList(response.data);
            });
        if (gameId !== null) {
            sessionStorage.setItem('gameId', gameId);
        }
        // eslint-disable-next-line
    }, [gameId]);

    useEffect(() => {
        // Retrieve gameId from session storage on component mount or refresh
        const storedGameId = sessionStorage.getItem('gameId');
        if (storedGameId) {
            setGameId(parseInt(storedGameId)); // Convert to integer if necessary
        }
    }, []);

    return (
        <div className="justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Select a game</Card.Title>
                    <Card.Text>
                        Select a game to see import information and individual businesses
                    </Card.Text>
                    <ListGroup defaultActiveKey="#link1">
                        {gameList.map((game) => (
                            <ListGroup.Item action onClick={() => handleGameId(game.gameId)} key={game.gameId}>
                                {game.name} Businesses: {game.numBusiness}
                            </ListGroup.Item>
                            ))}
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Businesses</Card.Title>
                    {businessList.length > 0 ? (
                        <ListGroup defaultActiveKey="#link1">
                            {businessList.map((business) => (
                                <ListGroup.Item action onClick={() => handleBusinessId(business.businessId)} key={business.businessId}>
                                    {business.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No game selected/available</p>
                    )}
                </Card.Body>
            </Card>
        </div>
    )
}
export default HomePage;
