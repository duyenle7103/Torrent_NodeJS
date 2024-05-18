import http from 'http'

export function createPeerID() {
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

export function buildTrackerURL(torrentObj, peerID, port) {
	const params = {
		info_hash:  new TextDecoder().decode(torrentObj.info_hash),
		peer_id:    peerID,
		port:       port,
		uploaded:   '0',
		downloaded: '0',
		compact:    '1',
		left:       torrentObj.length,
	}
	const searchParams = new URLSearchParams(params);
    const params_string = searchParams.toString();
}

const options = {
    hostname: '192.168.244.170',
    port: '1234',
    path: '/announce',
    method: 'GET'
};

// Sending the request
const req = http.request(options, (res) => {
    let data = ''
 
    res.on('data', (chunk) => {
        data += chunk;
    });
 
    // Ending the response 
    res.on('end', () => {
        console.log('Body:', data)
    });
 
}).on("error", (err) => {
    console.log("Error: ", err)
}).end()