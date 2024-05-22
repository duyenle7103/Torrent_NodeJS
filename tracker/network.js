import * as os from 'os';

var nets = os.networkInterfaces();
const results = Object.create(null);

function getIP() {
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    if (results['Wi-Fi']) {
        return results['Wi-Fi'][0];
    } else {
        return results['Ethernet 2'][0];
    }
}

export { getIP };