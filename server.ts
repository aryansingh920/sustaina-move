import express, { Request, Response } from 'express';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const app = express();
const web3 = new Web3('<BSC_NODE_URL>');
const privateKey = '<YOUR_PRIVATE_KEY>';
const contractAddress = '<YOUR_CONTRACT_ADDRESS>';
const contractABI = <YOUR_CONTRACT_ABI>;

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Middleware to parse JSON requests
app.use(express.json());

// Get the count of images
app.get('/images/count', async (req: Request, res: Response) => {
    try {
        const count = await contractInstance.methods.getImagesCount().call();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an image by index
app.get('/images/:index', async (req: Request, res: Response) => {
    try {
        const index = parseInt(req.params.index);
        const image = await contractInstance.methods.getImage(index).call();
        res.json({ image });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new image
app.post('/images', async (req: Request, res: Response) => {
    try {
        const ipfsHash = req.body.ipfsHash; // Assuming the IPFS hash is sent in the request body
        const gas = await contractInstance.methods.addImage(ipfsHash).estimateGas();
        const tx = {
            from: account.address,
            to: contractAddress,
            gas,
            data: contractInstance.methods.addImage(ipfsHash).encodeABI(),
        };
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ txHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
