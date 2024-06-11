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

function HomePage() {
    const [gameId, setGameId] = useState(null);
    const [gameList, setGameList] = useState([]);
    const [showGameModal, setShowGameModal] = useState(false);
    const [productList, setProductList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [businessList, setBusinessList] = useState([]);
    const [businessId, setBusinessId] = useState(null);
    const [businessInfo, setBusinessInfo] = useState({});
    const [showBusinessModal, setShowBusinessModal] = useState(false);
    const [importInfo, setImportInfo] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { appState: { id } } = useContext(AppContext);
    const apiAddr = useApi();

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
        apiAddr.get(apiUrls.businessDisplays + businessId)
            .then((res) => setDisplayList(res.data));
    }

    useEffect(() => {
        selectBusinessList();
        // Retrieve gameId from session storage on component mount or refresh
        const storedGameId = sessionStorage.getItem('gameId');
        if (storedGameId) {
            setGameId(storedGameId);
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
        apiAddr.get(apiUrls.businessDisplays + businessId)
            .then((res) => setDisplayList(res.data));
        // Retrieve gameId from session storage on component mount or refresh
        const storedBusinessId = sessionStorage.getItem('businessId');
        if (storedBusinessId) {
            setBusinessId(storedBusinessId);
        }
    }, [businessId]);

    useEffect(() => {
        selectGameList();
        setRefresh(true);
    }, [id]);

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
                onButtonClick={() => setShowGameModal(true)}
                defaultText="No games available"
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
                />
            )}
                </Col>
                <Col xs={6}>
                    {businessInfo.businessId && (
                        <BusinessInfo info={businessInfo} productList={productList} displayList={displayList} submitFunc={handleBusinessUpdate}/>
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
