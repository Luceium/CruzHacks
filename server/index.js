const http = require('http')
const express = require('express')
const WebSocket = require('ws')


const app = express();
const server = http.createServer(app)

app.post('/', function requestHandler(req, res){
    
})

const wss = new WebSocket.Server({server});

wss.on('connection', function (ws){
    console.log('new connection')
})


server.listen(1337, function () {
    console.log('Server running')
})