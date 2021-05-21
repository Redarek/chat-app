const BChainButton = ({  }) => {
    return (
      <div className="" style={{}}>
        <button 
            className="send-to-bchain" 
            style={{ backgroundColor: '#1E90FF', width: '15px', height: '15px' }} />
      </div>
    );
  };
  

  function initContract() {
    const abi = 
        [{
            "constant":false,
            "inputs":[{"name":"sentText","type":"string"}],
            "name":"sendText",
            "outputs":[],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "constant":true,
            "inputs":[{"name":"","type":"uint256"}],
            "name":"message_list",
            "outputs":[{"name":"senderText","type":"address"},
            {"name":"text","type":"string"}],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
        }]
    const contract_Address = {
        "3": "0x527C3A8d964c7eD34169c8f90f4c5Dd62c5Bec2e"
    }
    try {
        var current_network = web3.version.network;
        var contract = web3.eth.contract(abi).at(contract_Address[current_network]);
    } catch (error) {
        console.log(error)
    }
    return contract;
}

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log("Web3 detected!");
        window.web3 = new Web3("https://ropsten.infura.io/v3/fa2d51dfb7214816ae1e14b2f3145619");
        // Now you can start your app & access web3 freely:
        console.log("Вы подключены к Блокчейн");
        var currentNetwork = web3.version.network;
        if (currentNetwork == 3) {
            console.log("Вы подключены к Ropsten");
            changeLkUrl()
        } else {
            console.log("Вы не подключены к сети Ropsten");
        }
    }

})

function connect() {
    if (typeof ethereum !== 'undefined') {
       ethereum
        .request({ method: 'eth_requestAccounts' })
        .catch((error) => {
        if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.');
        } else {
            console.error(error);
        }
        }); 
        let addr = web3.eth.accounts[0];
        setCookie('address', encodeURIComponent(addr), {secure: true, 'max-age': 3600});
        return addr;
    } else {
        document.getElementById("address").innerHTML = "Error";
    }
}

function deposit_js(price) {
    connect();
    console.log(price)
    var contract = initContract();
    const amountWei = price / 45000 * 1e18
    contract.deposit({
        value: amountWei
    }, function (error, result) {
        if (!error)
            console.log(result);
        else
            console.error(error);
    });
}

export default BChainButton;