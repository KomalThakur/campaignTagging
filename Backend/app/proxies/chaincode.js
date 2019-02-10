const request = require('./request');
const baseUrl = 'http://localhost:4000/'

function getToken() {
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };
    const form = {
        'username': 'Komal',
        'orgName': 'Org1'
    };

    return request.postFormRequest(headers, baseUrl + 'users', form);
}

function invokeChaincode(token, chaincode, fcn, argsArray) {
    const headers = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token
    };

    const body = {
        peers: ["peer0.org1.example.com", "peer1.org1.example.com"],
        fcn,
        args: argsArray
    }

    return request.postRequest(headers, baseUrl + 'channels/mychannel/chaincodes/' + chaincode, body);
}

async function getBlock(token) {
    const headers = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    const resp = await request.getRequest(headers, baseUrl + 'channels/mychannel?peer=peer0.org1.example.com');
    const blockDetails = JSON.parse(resp)

    return blockDetails;
}


async function queryChaincode(token, chaincode, fcn, args) {
    const headers = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    const argsArray = [];
    argsArray.push(args)
    const url = baseUrl + 'channels/mychannel/chaincodes/' + chaincode + '?peer=peer0.org1.example.com&fcn=' + fcn + '&args=' + JSON.stringify(argsArray);
    const resp = await request.getRequest(headers, url);
    return JSON.parse(resp);
}

module.exports = {
    getToken,
    invokeChaincode,
    getBlock,
    queryChaincode
}