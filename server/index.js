const http = require('http')
const express = require('express')
const WebSocket = require('ws')
const cors =require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocket.Server({server});

app.post('/createEmergency', async function requestHandler(req, res){
    wss.clients.forEach(client => {
        if (client.eventId === req.body.event.id){
            client.send(JSON.stringify({
                type: "createEmergency",
                emergency: req.body.emergency,
                sound: req.body.sound
            }));
        }
    });
    res.status(200).json({});
})

app.post('/deleteEmergency', async function requestHandler(req, res){
    wss.clients.forEach(client => {
        if (client.eventId === req.body.event.id){
            client.send(JSON.stringify({
                type: "deleteEmergency",
                emergency: req.body.emergency
            }));
        }
    });
    res.status(200).json({});
})

app.post('/updateUsers', async function requestHandler(req, res){
    wss.clients.forEach(client => {
        if (client.eventId === req.body.event.id){
            client.send(JSON.stringify({
                type: "updateUsers",
                users: req.body.usersapp/(loggedIn)/
            }));
        }
    });
    res.status(200).json({});
})

wss.on('connection', function (w){
    console.log('New connection')

    w.onmessage = (e) => {
        w.eventId = e.data;
    }
})

server.listen(1337, function () {
    console.log('Server running')
})