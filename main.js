const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/database/db_config');
require('dotenv').config();
const v1Routes = require('./src/api/v1/routes')
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(cookieParser());  // Parse cookies

app.use('/api/v1', v1Routes);
app.get('/', (req, res) => {
    res.send("server is stated Hello from server")
})

const port = 8080;


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
