import request from 'request';

function sendUploadSignal(torrentObj, IPAdress, port) {
    // Prepare data to send to tracker
    const postData = {
        info_hash: new TextDecoder().decode(torrentObj.info_hash),
        ip: IPAdress + ':' + port
    }

    var clientServerOptions = {
        uri: torrentObj.announce + '/upload',
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log("Sending information to tracker:");
        console.log(`\tInfo-hash: ${postData.info_hash}`);
        console.log("\tIP address: ", postData.ip);
        console.log("Error: ", error);
        return;
    });
}

export { sendUploadSignal }