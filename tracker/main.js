import promptSync from 'prompt-sync';
import * as network from './network.js';
import { app } from './response.js';

// Initialize prompt for user input
const prompt = promptSync();

// Get IP address of the tracker
const IPAddress = network.getIP();
console.log("Tracker's IP Address: ", IPAddress);

// Get port number from user
const port = prompt('Enter your port: ');

// Start the tracker server
app.listen(port, () => {
    console.log(`Tracker running at http://${IPAddress}:${port}`);
});