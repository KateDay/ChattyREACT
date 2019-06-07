const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let connections = 0;

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === 1) {
        client.send(data);
        }
    });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    connections++;
    console.log('Client connected totalling: ', connections);
    function connectionTotal() {
        let numCount = {
            type: 'counter',
            count: connections
        }
        return numCount;
    }   
    wss.broadcast(JSON.stringify(connectionTotal())) // sending the number of connections total to the app

    ws.on('message', function incoming(data) {
        const parsed = JSON.parse(data)
        parsed.id = uuidv1();

        if(parsed.type == 'postMessage'){
            parsed.type = 'incomingMessage'
        } else if(parsed.type == 'postNotification'){
        parsed.type = 'incomingNotification'
        }
        console.log(parsed)
        wss.broadcast(JSON.stringify(parsed))
        console.log(`${parsed.username} said ${parsed.content}`) 
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => { 
        connections--;
        function connectionTotal() {
            let numCount = {
                type: 'counter',
                count: connections
            }
            return numCount;
        }
        console.log('Client disconnected, total clients:', connections)
        wss.broadcast(JSON.stringify(connectionTotal())) // sending connections totals to the app
    });
});
