const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
// var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const io = new Server(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// var dbUrl = 'mongodb://mongo:27017/simple-chat'
// mongoose.connect(dbUrl, { useNewUrlParser: true })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));

// var Message = mongoose.model('Message', {name: String, message: String});
class Message {
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
};

app.use(express.static(__dirname));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })
app.get('/messages', (req, res) => {
    // Message.find({}, (err, messages) => {
    //     res.send(messages);
    // });
    var messages = {
        name: 'Tuan Anh',
        message: 'Hello'
    };
    console.log('GET messages');
    res.send(messages);
});
app.post('/messages', (req, res) => {
    var message = req.body;
    console.log('POST messages', message);
    io.emit('message', req.body);
    res.sendStatus(200);
    // message.save((err) => {
    //     if (err) {
    //         sendStatus(500);
    //     } else {
    //         res.sendStatus(200);
    //     }
    // });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

server.listen(3000, () => {
    console.log('listening on *:', server.address().port);
});

