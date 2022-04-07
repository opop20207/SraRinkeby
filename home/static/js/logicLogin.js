appId = "xdtQW4Rhkc0GvRzudL16sGGaO2fadoqESl8fkwIJ";
serverUrl = "https://k4lt9sbz1oni.usemoralis.com:2053/server";
plugins = "None";
options = { appId, serverUrl, plugins };

Moralis.initialize(appId); // Application id from moralis.io
Moralis.serverURL = serverUrl; //Server url from moralis.io

const web3 = new Web3(window.ethereum);

//frontend logic

async function isUserLoggedIn() {
    const currentUser = Moralis.User.current();
    if (currentUser) return true;
    else return false;
}

async function loginMetamask() {
    console.log();
    Moralis.start(options);
    Moralis.Web3.authenticate().then(function (user) {
        user.set("userAddress", ethereum.selectedAddress);
        user.save();
        location.replace("/");
    });
}
