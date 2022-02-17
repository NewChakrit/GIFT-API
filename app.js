const express = require('express');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const uploadRoute = require('./routes/uploadRoute');
const aboutRoute = require('./routes/aboutRoute');
const postRoute = require('./routes/postRoute');
const chatRoute = require('./routes/chatRoute');
const { getById } = require('./dbs/function/userDao');

// // // Create Table
// const { sequelize } = require('./dbs/models/index');
// sequelize.sync({ force: true });

require('dotenv').config();
require('./middlewares/passport');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
    })
);

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/about', aboutRoute);
app.use('/upload', uploadRoute);
app.use('/post', postRoute);
app.use('/chat', chatRoute);

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    let code = 500;
    if (err.name === 'JsonWebTokenError') {
        code = 401;
    }
    if (err.name === 'TokenExpiredError') {
        code = 401;
    }
    if (process.env.NODE_ENV === 'development') {
        res.status(code).json({ message: err.message });
    } else {
        res.status(code.json({ message: 'something wrong' }));
    }
});

const jwt = require('jsonwebtoken');
const http = require('http'); //setup socket.io
const db = require('./dbs/models');
const server = http.createServer(app);

// ให้ทุกคนที่เข้ามา server นี้สามารถใช้งานได้ โดยมี method เป็น get & post
const io = require('socket.io')(server, {
    cors: {
        // origin: 'https://boring-shaw-52ae84.netlify.app',
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// เช็คว่า user นี้สามารถเชื่อมต่อได้หรือไม่ ถ้า token หมดอายุจะไม่สามารถเชื่อมต่อได้
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        socket.userId = payload.id;
        socket.firstName = payload.firstName;
        socket.lastName = payload.lastName;
        socket.username = payload.username;
        console.log(payload);
        next();
    } catch (err) {
        socket.emit('token-expired', { message: 'token-expired' });
    }
});

// event connection
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    //handle the new message event
    socket.on('send_message', async (data) => {
        const userData = await getById(data.userId);
        const newMessage = await db.Message.create({
            message: data.message,
            userId: data.userId,
            roomId: socket.roomId,
        });

        // event receive_message
        io.in(`${socket.roomId}`).emit('receive_message', {
            message: [
                {
                    userId: data.userId,
                    message: data.message,
                    profileUrl: userData.profileUrl,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    time: newMessage.createdAt,
                },
            ],
        });
    });

    socket.on('typing', () => {
        io.in(`${socket.roomId}`).emit('typing', {
            username: socket.username,
        });
    });

    socket.on('join', async (data) => {
        const members =
            socket.userId < data.friendId
                ? `${socket.userId}-${data.friendId}`
                : `${data.friendId}-${socket.userId}`;

        const existingRoom = await db.Room.findOne({ where: { members } });
        if (existingRoom) {
            socket.roomId = existingRoom.id;
        } else {
            const newRoom = await db.Room.create({ members });
            socket.roomId = newRoom.id;
        }
        socket.leaveAll();
        socket.join(`${socket.roomId}`);

        const roomData = await db.Message.findAll({
            where: { roomId: socket.roomId },
            include: [
                {
                    model: db.User,
                },
            ],
        });
        io.in(`${socket.roomId}`).emit('room-data', {
            roomData,
            chatRoomId: socket.roomId,
        });
    });
});

server.listen(5555, () => console.log('server run on port 5555'));
