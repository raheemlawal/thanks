import '../Home.css';
import { Container, Button, Navbar, Row,Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter,faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FaBolt, FaChartLine, FaUsers } from 'react-icons/fa';


function Home() {
  return (
    <>
        <Navbar className = "socialmedia-bar">
            <Container>
            <Navbar.Brand id = "logo" as = {Link} to = "/">thanks.</Navbar.Brand>
            <Nav className="me-auto">
            </Nav>
            <Nav>
                <Row id = "smrow">
                        <Col xs = {6} sm = {6} md = {6} lg = {6}>
                            <a href="https://www.instagram.com/"
                                className="instagramsocial">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                        </Col>
                        <Col xs = {6} sm = {6} md = {6} lg = {6}>
                            <a href="https://www.twitter.com/"
                                className="twittersocial">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                        </Col >
                 </Row>
            </Nav>
            </Container>
        </Navbar>
        <Container id = "home">
            <h1 className = "title">thanks.</h1>
            <h3 className = "description">allocate how you send your cryptocurrency funds</h3>
            <Button id ="enter-app" variant = "light" as={Link} to="/app">Enter App</Button>
            <Row id = "adjective-row">
                <Col id = "fast-col">
                    <h3>Fast.</h3> 
                    <FaBolt size={40}/>
                </Col>
                <Col id = "scalable-col">
                    <h3>Scalable.</h3>
                    <FaChartLine size={40}/>
                </Col>
                <Col id = "dex-col">
                    <h3>Decentralized.</h3>
                    <FaUsers size={40}/>   
                </Col>
            </Row>
            <Row id = "powered-row">
                We currently use Metamask and the Ethereum Blockchain! Please ensure all wallets use ETH!
            </Row>
        </Container>
        
    </>
  );
}

export default Home;
