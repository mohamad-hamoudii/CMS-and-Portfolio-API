require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const xss = require('xss-clean');
const mongoose = require('mongoose');
const authRoutes = require('../routes/cms_routes/authRoutes');
const contentRoutes = require('../routes/cms_routes/contentRoutes');

mongoose.connect(process.env.MONGO_URI);

app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(cors());

//Routes
app.use('/cms/auth', authRoutes);
app.use('/cms/content', contentRoutes);

app.get('/', (req, res) => {
    return res.json({status: 'ok'})
})
app.get('/favicon.ico', (req, res) => {
    return res.json({status: 'ok'})
})

module.exports = app;