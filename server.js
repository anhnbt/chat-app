require('dotenv').config();
const {createServer} = require('http');
const express = require('express'); // library express
const bodyParser = require('body-parser'); // turns response into usable format
const cors = require('cors'); // allow or disallow cross-site communication
const fs = require('fs');
const helmet = require('helmet'); // create header that protect from attacks (security)
const morgan = require('morgan'); // add some logging capabilities
const path = require('path');

const {Server} = require('socket.io');
// socket configuration
// const {WebSockets} = require('./src/utils/WebSockets');
// routes
var indexRouter = require("./routes");
var usersRouter = require("./routes/users");

const app = express();
app.use(express.static(__dirname));
//body parsing middleware
app.use(helmet());
// app.use(cors(corsOptions));
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// show log in terminal without write log into file
app.use(morgan('combined'));


// Route API
// app.use("/", indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

// Running Server on Port
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
app.set('socketio', io);

io.on('connection', function(socket){

    socket.on('newRideAdded', function(exclude){
        io.emit('newRideAdded', exclude);
    });

    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});
// io.on('connection', WebSockets.connection);
httpServer.listen(PORT, () => {
    console.log(`Listening on port:: http://localhost:${PORT}/`)
});
