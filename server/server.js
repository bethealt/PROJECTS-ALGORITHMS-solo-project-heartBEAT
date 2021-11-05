const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const dotenv = require('dotenv')
const buf = Buffer.from('hello world')
const opt = { debug: true }
const config = dotenv.parse(buf, opt)  // expect a debug message because the buffer is not in KEY=VAL form
const jwt = require("jsonwebtoken");
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('dotenv').config({ debug: process.env.DEBUG })
require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/course.routes')(app);
 
const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
 
// to initialize the socket, we need to invoke a new instance of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client has successfully completed the handshake!
    console.log('socket id: ' + socket.id);
    
    // Event Listeners:
    socket.on("event_from_client", data => {
    // send a message with "data" to ALL clients EXCEPT for the one that emitted the "event_from_client" event
        socket.broadcast.emit("event_to_all_other_clients", data);
    });
});

const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: true
  };
   
const userToken = jwt.sign(payload, process.env.SECRET_KEY);
  
  

