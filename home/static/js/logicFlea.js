Moralis.initialize("xdtQW4Rhkc0GvRzudL16sGGaO2fadoqESl8fkwIJ"); // Application id from moralis.io
Moralis.serverURL = "https://k4lt9sbz1oni.usemoralis.com:2053/server"; //Server url from moralis.io

const nft_market_place_address = "0xf3c3fce5be43fe2f56a08478455f39dcb8251dd4"; //NFT Market Place Contract, code of this contract is in the following github repository https://github.com/DanielMoralisSamples/25_NFT_MARKET_PLACE.

const web3 = new Web3(window.ethereum);

Moralis.start(options);
Moralis.Web3.authenticate().then(function (user) {
    user.set("userAddress", ethereum.selectedAddress);
    user.save();
});

//Display NFT Functions

async function initPage() {
    populateNFTs();
}

async function populateNFTs() {
    console.log("!!");
    const localNFTs = await getNFTs().then(function (data) {
        let nftDisplays = getNFTObjects(data);
        console.log(nftDisplays.length);
        displayUserNFTs(nftDisplays);
    });
}

async function getNFTs() {
    const queryAll = new Moralis.Query("NFTs");
    console.log(queryAll);
    queryAll.equalTo("owner_of", ethereum.selectedAddress);
    console.log(ethereum.selectedAddress);
    const data = await queryAll.find();
    console.log(data.length);
    nftArray = [];
    for (let i = 0; i < data.length; i++) {
        const nft = {
            objectId: data[i].get("objectId"),
            createdAt: data[i].get("createdAt"),
            image: data[i].get("image"),
            owner_of: data[i].get("owner_of"),
        };
        nftArray.push(nft);
    }
    return nftArray;
}

function displayUserNFTs(data) {
    let entryPoint = 0;
    let rowId = 0;
    for (i = 0; i < data.length; i += 3) {
        let row = `<div id="row_${rowId}" class="row"></div>`;
        document.getElementById("NFTLists").innerHTML += row;
        for (j = entryPoint; j <= entryPoint + 2; j++) {
            if (j < data.length) {
                document.getElementById("row_" + rowId).innerHTML += data[j];
            }
        }
        entryPoint += 3;
        rowId += 1;
    }
}

function cleanNFTList() {
    document.getElementById("NFTLists").innerHTML = "";
}

function generateNFTDisplay(id, uri) {
    const nftDisplay = `<div id="${id}" class="col-lg-4 text-center">
                            <img src=${uri} class="img-fluid rounded" style="max-width: 30%">
                            <button id="button_${id}" class="btn btn-dark" onclick="selectNFT(this);">Select</button>
                        </div>`;
    return nftDisplay;
}

function getNFTObjects(array) {
    let nfts = [];
    for (i = 0; i < array.length; i++) {
        nfts.push(generateNFTDisplay(array[i].objectId, array[i].image));
    }
    return nfts;
}
