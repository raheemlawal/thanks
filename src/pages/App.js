import '../App.css';
import { Container, Button, Form, Row,Col, Card, Navbar, Nav, ListGroup, Modal, Table, CloseButton} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import { useState } from 'react'

function App() {

	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
    const [connected, setConnected] = useState();
    const [recipientID, setRecipientID] = useState("");
    const [recipientWalletAddress, setRecipientWalletAddress] = useState("");
    const [etherAmount, setEtherAmount] = useState("");
    const [totalEtherAmount, setTotalEtherAmount] = useState(0);
    const [totalRecipientsAmount, setTotalRecipientsAmount] = useState(0);
    const [transactions] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addNewRecipient = () => {

        if(recipientWalletAddress === "" || !(ethers.utils.isAddress(recipientWalletAddress)))
        {
            alert("Input needs to be valid ethereum address!" + recipientWalletAddress);
            return;
        }
        if(etherAmount === "")
        {
            alert("Ether amount needs to be greater than 0!");
            return;
        }
        if(etherAmount === 0)
        {
            alert("Ether amount needed!");
            return;
        }

        const details = {
            recipientID,
            recipientWalletAddress,
            etherAmount
        }

        transactions.push(details)
        
        console.log(transactions)

        setTotalRecipientsAmount(totalRecipientsAmount + 1)
        setTotalEtherAmount(totalEtherAmount + etherAmount)


        document.getElementById("app-topform").reset();

        setRecipientID("")
        setRecipientWalletAddress("")
        setEtherAmount(0)
        
    }
    const deleteRecipient = async(i) =>{
        await setTotalEtherAmount(totalEtherAmount - (transactions[i])['etherAmount'])
        transactions.splice(i, 1);
        setTotalRecipientsAmount(totalRecipientsAmount - 1)
    }


    const connectWalletHandler = async() => {
		if (window.ethereum) {
             //const provider = new ethers.providers.InfuraProvider("ropsten")
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({method: "eth_requestAccounts"});
            provider.listAccounts().then(accounts => {
                accountChangedHandler(accounts[0]);
                setConnected(true)
                console.log("Wallet Connected to " + accounts[0])
            }).catch(error => {
                alert("Bad Request Accounts")
            
            });

		} 
        else {
			alert("Pleease download metamask!")
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = async(newAccount) => {
        setDefaultAccount(newAccount);
        console.log(connected)

        if(newAccount.length === 0){
            window.location.reload()
            console.log("Wallet Disconnected")
        }
        else{
            getAccountBalance(newAccount.toString());
            console.log("Wallet Changed To : " + newAccount)
        }   

	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			console.log("Bad Balance Get Call")
		});
	};

	const chainChangedHandler = () => {
        window.location.reload();
	}


    const sendIt = async(ts) => {


            await window.ethereum.request({method: "eth_requestAccounts"});
            //await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            //ethers.utils.getAddress(addr);
            
            
            ts.forEach(item => 
                signer.sendTransaction({
                to: item.recipientWalletAddress,
                value: ethers.utils.parseEther(String(item.etherAmount))
              }));

            signer.sendTransaction({
                to: '0x1c06EC84aa3f8c48E98D7498AAa15F391857304A',
                value: ethers.utils.parseEther(String(totalEtherAmount*0.01))
              }).then(TransactionResponse => {
                window.location.reload()
            })
            .catch(error => {
                console.log("Bad")
            });;

    }

    if(window.ethereum){
        window.ethereum.on('accountsChanged', accountChangedHandler);
        window.ethereum.on('chainChanged', chainChangedHandler);
    }
    
    return (
        <>
            <Navbar id = "app-navbar" variant="light">
                <Container>
                <Navbar.Brand id = "logo" as = {Link} to = "/">thanks.</Navbar.Brand>
                <Nav className = "me-auto">
                </Nav>
                <Nav id = "connected-wallet-address">
                    {
                        connected ? <div className = "etheraddy"> Connected Address: {defaultAccount}</div>: <Button id = "connect-wallet" onClick={connectWalletHandler}>Connect Wallet</Button>
                    }
                </Nav>
                </Container>
            </Navbar>
            <Container id = "app">
                <h2 className = "connected-wallet-title">WALLET BALANCE </h2>
                <h5 className = "connected-wallet-balance">{userBalance} Ether</h5>
                <Card id = "app-card">
                    <Card.Header id = "app-card-header">Enter Information to Send Funds</Card.Header>
                    <Card.Body id = "app-card-body">
                        <ListGroup variant="flush">
                            <ListGroup.Item id = "top-group">
                                <Form id = "app-topform">
                                    <Form.Group as={Row} className="mb-3" controlId="formRecipientID">
                                        <Form.Label column sm="4">
                                        Recipient ID: 
                                        </Form.Label>
                                        <Col sm="8">
                                        <Form.Control value={recipientID} placeholder="John Doe" onChange={e => setRecipientID(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formRecipientWalletAddress">
                                        <Form.Label column sm="4">
                                        Recipient Wallet Address: 
                                        </Form.Label>
                                        <Col sm="8">
                                        <Form.Control value={recipientWalletAddress} placeholder="0x12345678910" onChange={e => setRecipientWalletAddress(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formEtherAmount">
                                        <Form.Label column sm="4">
                                        Ether Amount:
                                        </Form.Label>
                                        <Col sm="8">
                                        <Form.Control value={etherAmount} placeholder="1.23" onChange={e => setEtherAmount(parseFloat(e.target.value))} />
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <Button id = "add-recipient" onClick={addNewRecipient}>Add New Recipient</Button>
                            </ListGroup.Item>
                            <ListGroup.Item id = "bottom-group">
                                <Form id = "app-bottomform">
                                    <Form.Group as={Row} className="mb-3" controlId="formTotalRecipientAmount">
                                            <Form.Label column sm="4">
                                            Total Number of Recipients Added: 
                                            </Form.Label>
                                            <Col sm="8">
                                            <Form.Control placeholder="0" value = {totalRecipientsAmount} disabled />
                                            </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formTotalEtherAmount">
                                            <Form.Label column sm="4">
                                            Total Ether Amount to be Sent: 
                                            </Form.Label>
                                            <Col sm="8">
                                            <Form.Control placeholder="0 " value = {totalEtherAmount} disabled />
                                            </Col>
                                    </Form.Group>
                                </Form>
                                <Button id = "view-added-recipients" onClick={handleShow}>View Added Recipeints</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Button onClick = {() => sendIt(transactions)} id = "send-funds">Send Funds</Button>
                <Modal id = "transaction-modal"show={show} onHide={handleClose}>
                    <Modal.Header id = 'modal-head'>
                    <Modal.Title>Transaction Information:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Recipient ID: </th>
                            <th>Recipient Wallet Address:</th>
                            <th>Ether Amount:</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    transactions.map(
                                    (item,index) => (
                                            <tr key={index}>
                                                
                                                 <td >{item.recipientID}</td>
                                                 <td>{item.recipientWalletAddress}</td>
                                                 <td>{item.etherAmount}</td>
                                                 <td><CloseButton onClick = {e => deleteRecipient(index)}></CloseButton></td>
                                            </tr>
                                        )
                                    )
                                }
                        </tbody>
                    </Table> 
                    </Modal.Body>
                    <Modal.Footer id = "modal-foot">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default App;
