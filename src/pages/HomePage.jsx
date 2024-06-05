import {Col, Container, Row} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";
import { AppContext } from "../contexts/AppContextProvider.jsx";
import Selector from "../components/Selector.jsx";
import BusinessInfo from "../components/BusinessInfo.jsx";
import Import from "../components/Import.jsx";

function HomePage() {
    const [gameId, setGameId] = useState(null);
    const [gameList, setGameList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [businessList, setBusinessList] = useState([]);
    const [businessId, setBusinessId] = useState(null);
    const [businessInfo, setBusinessInfo] = useState({});
    const { appState: { id } } = useContext(AppContext);
    const apiAddr = useApi();

    useEffect(() => {
        apiAddr.get(apiUrls.gameList + id)
            .then((response) => {
                setGameList(response.data);
            });
        apiAddr.get(apiUrls.productList)
            .then((response) => {
                setProductList(response.data);
            })
        if (gameId) {
            selectBusinessList();
        }
    }, [gameId, id]);

    const selectBusinessList = () => {
        apiAddr.get(apiUrls.businessList + gameId)
            .then((response) => {
                setBusinessList(response.data);
            });
        if (gameId !== null) {
            sessionStorage.setItem('gameId', gameId);
        }
    }

    useEffect(() => {
        // Retrieve gameId from session storage on component mount or refresh
        const storedGameId = sessionStorage.getItem('gameId');
        if (storedGameId) {
            setGameId(storedGameId);
        }
    }, [gameId]);

    useEffect(() => {
        // Retrieve gameId from session storage on component mount or refresh
        const storedBusinessId = sessionStorage.getItem('businessId');
        if (storedBusinessId) {
            setBusinessId(storedBusinessId);
        }
        // apiAddr.get(apiUrls.businessInfo + businessId)
        //     .then((response) => {
        //         console.log(response.data)
        //         // setBusinessInfo(response.data);
        //     });
    }, [businessId]);

    useEffect(() => {
        apiAddr.get(apiUrls.businessInfo + businessId)
            .then((response) => {
                console.log(response.data)
                setBusinessInfo(response.data);
            });
    }, [businessId]);

    const businessIdSess = (busId) => {
        setBusinessId(busId);
        sessionStorage.setItem('businessId', busId);
    }

    console.log(businessId);
    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
            <Selector
                title="Select a game"
                items={gameList.map(game => ({ id: game.gameId, name: game.name, extraInfo: `Businesses: ${game.numBusiness}` }))}
                onItemSelect={setGameId}
                buttonText="Create New Game"
                buttonDisabled={false}
                onButtonClick={() => console.log('Create New Game')}
                defaultText="No games available"
            />
            {gameId && (
                <Selector
                    title="Businesses"
                    items={businessList.map(business => ({ id: business.businessId, name: business.name, extraInfo: '' }))}
                    onItemSelect={businessIdSess}
                    buttonText="Create New Business"
                    buttonDisabled={!gameId}
                    onButtonClick={() => console.log('Create New Business')}
                    defaultText={businessList.length === 0 ? "No businesses for this game" : "No game selected"}
                />
            )}
                </Col>
                <Col xs={5}>
                    {businessInfo.businessId && (
                        <BusinessInfo info={businessInfo} productList={productList}/>
                    )}
                </Col>
                <Col>
                    {gameId && (
                        <Import />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
