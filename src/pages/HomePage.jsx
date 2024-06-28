import {Col, Container, Row} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi.js";
import apiUrls from "../enums/apiUrls.js";
import { AppContext } from "../contexts/AppContextProvider.jsx";
import Selector from "../components/Selector.jsx";
import BusinessInfo from "../components/BusinessInfo.jsx";
import Import from "../components/Import.jsx";
import GameModal from "../components/modal/GameModal.jsx";
import BusinessModal from "../components/modal/BusinessModal.jsx";
import routingUrls from "../enums/routingUrls.js";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const [gameId, setGameId] = useState(null);
    const [gameList, setGameList] = useState([]);
    const [showGameModal, setShowGameModal] = useState(false);
    const [productList, setProductList] = useState([]);
    const [businessList, setBusinessList] = useState([]);
    const [businessId, setBusinessId] = useState(null);
    const [businessInfo, setBusinessInfo] = useState({});
    const [showBusinessModal, setShowBusinessModal] = useState(false);
    const [importInfo, setImportInfo] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { appState: { id, gameIdGlobal, isLoggedIn }, setAppState } = useContext(AppContext);
    const apiAddr = useApi();
    const navigate = useNavigate();
    const importRefresh = {
        gameId: gameIdGlobal,
        importId: 1,
        dayPerOrderId: 3
    }

    const selectBusinessList = () => {
        apiAddr.get(apiUrls.businessList + gameId)
            .then((response) => {
                setBusinessList(response.data);
            });
        if (gameId !== null) {
            sessionStorage.setItem('gameId', gameId);
        }
    }

    const selectGameList = () => {
        apiAddr.get(apiUrls.gameList + id)
            .then((response) => {
                setGameList(response.data);
                setRefresh(false);
            });
    }

    const selectImportList = (select) => {
        apiAddr.post(apiUrls.importList, select)
            .then((res) => setImportInfo(res.data))
    }

    const businessIdSet = (busId) => {
        setBusinessId(busId);
        sessionStorage.setItem('businessId', busId);
    }

    const gameIdSet = (gmeId) => {
        setGameId(gmeId);
        setAppState({gameIdGlobal: gmeId})
    }

    const handleNewGame = (newGame) => {
        apiAddr.post(apiUrls.gameNew + id, newGame)
            .then(() => {
                setShowGameModal(false)
                selectGameList();
            })
    }

    const handleNewBusiness = (newBus) => {
        apiAddr.post(apiUrls.businessNew + gameId, newBus)
            .then(() => {
                selectBusinessList();
                setShowBusinessModal(false);
            })
    }

    const handleBusinessUpdate = (busEdit) => {
        apiAddr.patch(apiUrls.businessProdsUpdate + businessId, busEdit)
            .then((res) => {
                setBusinessInfo(res.data);
                setRefresh(true);
            });
    }

    const deleteBusiness = (delId) => {
        apiAddr.delete(apiUrls.businessDelete + delId)
            .then(() => {
                setBusinessInfo({});
                selectBusinessList();
            });
    }

    const deleteGame = (delId) => {
        apiAddr.delete(apiUrls.gameDelete + delId)
            .then(() => {
                setBusinessInfo({});
                setGameId(null);
                selectImportList(importRefresh);
                sessionStorage.removeItem('gameId');
                selectGameList();
            });
    }

    useEffect(() => {
        selectBusinessList();
        const storedGameId = sessionStorage.getItem('gameId');
        setBusinessInfo({});
        sessionStorage.removeItem('businessId');
        selectImportList(importRefresh);
        if (storedGameId) {
            setGameId(storedGameId);
            setAppState({gameIdGlobal: storedGameId})
        }
    }, [gameId]);

    useEffect(() => {
        apiAddr.get(apiUrls.productList)
            .then((response) => {
                setProductList(response.data);
            })
        apiAddr.get(apiUrls.businessInfo + businessId)
            .then((response) => {
                setBusinessInfo(response.data);
            });
        // Retrieve gameId from session storage on component mount or refresh
        const storedBusinessId = sessionStorage.getItem('businessId');
        if (storedBusinessId) {
            setBusinessId(storedBusinessId);
        }
    }, [businessId]);

    useEffect(() => {
        selectGameList();
    }, [id]);

    useEffect(() => {
        if(!isLoggedIn) {
            navigate(routingUrls.login);
        }
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col sm={6} md={4} lg={3} xl={2}>
            <Selector
                title="Select a game"
                items={gameList.map(game => ({ id: game.gameId, name: game.name, extraInfo: `Businesses: ${game.numBusiness}` }))}
                onItemSelect={gameIdSet}
                buttonText="Create New Game"
                buttonDisabled={false}
                onButtonClick={() => setShowGameModal(true)}
                defaultText="No games available"
                deleteFunc={deleteGame}
            />
            {gameId && (
                <Selector
                    title="Businesses"
                    items={businessList.map(business => ({ id: business.businessId, name: business.name, extraInfo: '' }))}
                    onItemSelect={businessIdSet}
                    buttonText="Create New Business"
                    buttonDisabled={!gameId}
                    onButtonClick={() => setShowBusinessModal(true)}
                    defaultText={businessList.length === 0 ? "No businesses for this game" : "No game selected"}
                    deleteFunc={deleteBusiness}
                />
            )}
                </Col>
                <Col sm={6} md={8} lg={6} xl={6}>
                    {businessInfo.businessId && (
                        <BusinessInfo info={businessInfo} productList={productList} submitFunc={handleBusinessUpdate}/>
                    )}
                </Col>
                <Col>
                    {gameId && (
                        <Import info={importInfo} submitFunc={selectImportList} refresh={refresh}/>
                    )}
                </Col>
            </Row>
            <GameModal show={showGameModal} submitFunc={handleNewGame} cancelFunc={() => setShowGameModal(false)}/>
            <BusinessModal show={showBusinessModal} submitFunc={handleNewBusiness} cancelFunc={() => setShowBusinessModal(false)}/>
        </Container>
    );
}

export default HomePage;
