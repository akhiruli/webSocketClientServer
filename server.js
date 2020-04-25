const express =  require('express')
const http = require('http')
const webSockSvr = require('websocket').server;

const server = http.createServer();
server.listen(9898)

const wsServer = new webSockSvr({
    httpServer: server
})

wsServer.on('request', (request)=> {
    const conn = request.accept(null, request.origin);

    conn.on('message', (message) =>{
        console.log(message.utf8Data)
        conn.sendUTF('hi from server');
    })

    conn.on('close', (reasonCode, description) =>{
        console.log('client got disconnected')
    })
})
