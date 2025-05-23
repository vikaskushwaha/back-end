const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/database/db_config');
require('dotenv').config();
const v1Routes = require('./src/api/v1/routes')
const app = express();

const allowedOrigins = [
    'https://front-end-one-green.vercel.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(cookieParser());  // Parse cookies

app.use('/api/v1', v1Routes);
app.get('/', (req, res) => {
    res.send("server is stated Hello from server")
})

const port = process.env.PORT || 8080;


const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`server is running on ${port}`);

        })
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();
