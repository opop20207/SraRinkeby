appId = "xdtQW4Rhkc0GvRzudL16sGGaO2fadoqESl8fkwIJ";
serverUrl = "https://k4lt9sbz1oni.usemoralis.com:2053/server";
plugins = "None";
options = { appId, serverUrl, plugins };

Moralis.initialize(appId); // Application id from moralis.io
Moralis.serverURL = serverUrl; //Server url from moralis.io

const nft_contract_address = "0x3d05364012a5f131e3a32a68deba6c23041fb917"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
/*
Available deployed contracts
Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD
*/

const web3 = new Web3(window.ethereum);
isUserLoggedIn();

//frontend logic
async function isUserLoggedIn() {
    web3.eth.getAccounts(function(err, accounts){
      if (err != null) console.error("An error occurred: "+err);
      else if (accounts.length == 0) console.log("User is not logged in to MetaMask");
      else console.log("User is logged in to MetaMask");
  });
}

async function login() {
    location.replace("/login");
}

async function upload() {
    if (false) {
        location.replace("/login");
    } else {
        const fileInput = document.getElementById("file");
        const data = fileInput.files[0];
        const imageFile = new Moralis.File(data.name, data);
        document.getElementById("upload").setAttribute("disabled", null);
        document.getElementById("file").setAttribute("disabled", null);
        document.getElementById("name").setAttribute("disabled", null);
        document.getElementById("description").setAttribute("disabled", null);
        await imageFile.saveIPFS();

        const imageURI = imageFile.ipfs();
        const metadata = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            image: imageURI,
        };
        console.log(" ** Image IPFS URI : ", imageURI, " **");
        const metadataFile = new Moralis.File("metadata.json", {
            base64: btoa(JSON.stringify(metadata)),
        });
        await metadataFile.saveIPFS();

        const savedData = new Moralis.Object("NFTs");
        savedData.set("name", document.getElementById("name").value);
        savedData.set(
            "description",
            document.getElementById("description").value
        );
        savedData.set("image", imageURI);
        savedData.set("owner_of", ethereum.selectedAddress);
        await savedData.save();

        const metadataURI = metadataFile.ipfs();
        const txt = await mintToken(metadataURI).then(notify);
    }
}

async function mintToken(_uri) {
    const encodedFunction = web3.eth.abi.encodeFunctionCall(
        {
            name: "mintToken",
            type: "function",
            inputs: [
                {
                    type: "string",
                    name: "tokenURI",
                },
            ],
        },
        [_uri]
    );

    const transactionParameters = {
        to: nft_contract_address,
        from: ethereum.selectedAddress,
        data: encodedFunction,
    };
    const txt = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
    });
    return txt;
}

async function notify(_txt) {
    document.getElementById(
        "resultSpace"
    ).innerHTML = `<input disabled = "true" id="result" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1" value="Your NFT was minted in transaction ${_txt}">`;
}
