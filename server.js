const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
app.use(cors({
    origin: 'http://localhost:4200'
}));
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
            res.sendStatus(500);
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

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

mongoose.connect(dbUrl, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

httpServer.listen(port, () => {
    console.log('listening on *:', httpServer.address().port);
});

