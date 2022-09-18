const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const io = new Server(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const Message = mongoose.model('Message', {name: String, message: String});
const dbUrl = 'mongodb://localhost:27017/chat-app'

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })
app.get('/messages', (req, res) => {
    console.log('GET messages');
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});
app.post('/messages', (req, res) => {
    const message = new Message(req.body);
    console.log('POST messages', message);
    message.save((err) => {
        if (err) {
            sendStatus(500);
        } else {
            io.emit('message', req.body);
            res.sendStatus(200);
        }
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

mongoose.connect(dbUrl, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

server.listen(3000, () => {
    console.log('listening on *:', server.address().port);
});

