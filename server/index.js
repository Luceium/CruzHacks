const http = require('http')
const express = require('express')
const WebSocket = require('ws')
const cors =require('cors')



const app = express();
app.use(cors())
app.use(express.json())
const server = http.createServer(app)
const wss = new WebSocket.Server({server});

app.post('/', function requestHandler(req, res){
    console.log(req.body.eventId)
    console.log(req.body.userId)
    console.log(req.body.type)
    wss.clients.forEach(client => client.send(req.body.id));


})
//The url is this server

wss.on('connection', function (w){
    console.log('new connection')
})


server.listen(1337, function () {
    console.log('Server running')
})