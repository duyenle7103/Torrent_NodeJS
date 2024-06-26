import request from 'request';

function createPeerID() {
    var result = [];
    const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let n = 0; n < 12; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    result = result.join('');
    result = '-TR2000-' + result;

    // Print peer ID for debugging
    console.log('Peer ID: ', result);

    return result;
}

function buildTrackerURL(torrentObj, port) {
	const params = {
		info_hash:  new TextDecoder().decode(torrentObj.info_hash),
		peer_id:    createPeerID(),
		port:       port,
		uploaded:   '0',
		downloaded: '0',
		compact:    '1',
		left:       torrentObj.length,
	}
	const searchParams = new URLSearchParams(params);
    const params_string = searchParams.toString();
    
    return params_string;
}

//Sending the request
function sendRequestToTracker(torrentObj, port) {
    const trackerURL = buildTrackerURL(torrentObj, port);
    var url = torrentObj.announce + '/download' + '?' + trackerURL;

    request(url, function (error, response, body) {
        console.log('Sending request to tracker: ', url);
        console.log('Error: ', error);
        return;
    });
}

export { sendRequestToTracker }