import {ethers} from "ethers";

var contractController;
window.addEventListener('load', async function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log("Web3 detected!");
        const Web3 = require("web3");
        const web3 = new Web3();
        window.ethereum.enable().then(web3.setProvider(new ethers.providers.Web3Provider(window.ethereum)));
        var currentNetwork = window.ethereum.networkVersion;
        console.log(currentNetwork)
        if (currentNetwork === "3") {
            console.log("Вы подключены к Ropsten");
        } else {
            console.log("Вы не подключены к сети Ropsten");
        }
        initContracts();
    }
})

function initContracts() {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner();
    const address = "0x527C3A8d964c7eD34169c8f90f4c5Dd62c5Bec2e";
    const abi =[{"constant":false,"inputs":[{"name":"sentText","type":"string"}],"name":"sendText","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"message_list","outputs":[{"name":"senderText","type":"address"},{"name":"text","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
    contractController = new ethers.Contract(address, abi, signer);
}

function sendMessage(text){
    contractController.sendText(text)
}

const BChainButton = ({ text }) => {

    return (
        <div className="" style={{}}>
            <button
                className="send-to-bchain"
                onClick={() => sendMessage(text.text)}
                style={{ backgroundColor: '#1E90FF', width: '15px', height: '15px' }} />
        </div>
    );
};

export default BChainButton;
