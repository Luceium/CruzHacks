const http = require('http')
const express = require('express')
const WebSocket = require('ws')
const cors =require('cors')

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const app = express();
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocket.Server({server});

app.post('/', async function requestHandler(req, res){
    await prisma.emergency.create({
        data: {
            user: {
                connect: {
                    id: req.body.userId
                }
            },
            event: {
                connect: {
                    id: req.body.eventId
                }
            },
            time: new Date(),
            type: req.body.type
        }
    })
    wss.clients.forEach(client => {
        if (client.eventId === req.body.eventId){
            client.send(JSON.stringify({
                eventId: req.body.eventId,
                userId: req.body.userId,
                type: req.body.type,
                sound: req.body.sound
            }));
        }
    });
    res.status(200).json();


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