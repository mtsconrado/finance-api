const express = require('express');
// const { Pool } = require('pg');
// const Sequelize = require('sequelize');
const cors = require('cors');
const router = require('./router/index');
const app = express();
require('./database');

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(router);

app.listen(3001, () => {
    console.log('O servidor está rodando na porta 3001');
});
