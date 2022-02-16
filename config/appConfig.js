require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const xss = require('xss-clean');
const mongoose = require('mongoose');
const authRoutes = require('../routes/cms_routes/authRoutes');
const contentRoutes = require('../routes/cms_routes/contentRoutes');

mongoose.connect(process.env.MONGO_URI, (error) => {
    if(error) console.log(error)
});

app.use(helmet());
app.use(xss());
app.use(express.json());
// app.use(cors());

//Routes
app.use('/cms/auth', authRoutes);
app.use('/cms/content', contentRoutes);

module.exports = app;