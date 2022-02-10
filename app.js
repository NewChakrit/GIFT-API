const express = require('express');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const uploadRoute = require('./routes/uploadRoute');
const aboutRoute = require('./routes/aboutRoute');

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

server.listen(5555, () => console.log('server run on port 5555'));
