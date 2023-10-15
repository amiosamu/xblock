import './NFTMinter.css';

import React, { useState } from 'react';
import { Button, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Web3 from 'web3';
const ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "greet",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "name": "setGreeting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


const NFTMinter = () => {
  const [contractAddress, setContractAddress] = useState('0x405d9c2Fccc01deaaE1aC07C5B9A55285a56E930'); // Set your contract address
  const [nftName, setNFTName] = useState('');
  const [nftTokenURI, setNFTTokenURI] = useState('');
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);

  const connectToBlockchain = async () => {
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;
        await ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setWeb3(web3);
      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
      }
    } else {
      console.error('Ethereum provider not found. Please install MetaMask or a similar provider.');
    }
  };

  const mintNFT = async () => {
    if (web3 && nftName && nftTokenURI && contractAddress) {
      try {
        const contract = new web3.eth.Contract(ABI, contractAddress);
        const result = await contract.methods.mintNFT(nftName, nftTokenURI).send({ from: account });
        console.log('NFT minted successfully:', result);
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  return (
    <div>
      <h2>NFT Minter</h2>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <Form>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="NFT Name"
                value={nftName}
                onChange={(e) => setNFTName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="NFT Token URI"
                value={nftTokenURI}
                onChange={(e) => setNFTTokenURI(e.target.value)}
              />
            </FormGroup>
            <Button onClick={mintNFT}>Mint NFT</Button>
          </Form>
        </div>
      ) : (
        <Button onClick={connectToBlockchain}>Connect to Ethereum</Button>
      )}
    </div>
  );
};

export default NFTMinter;
