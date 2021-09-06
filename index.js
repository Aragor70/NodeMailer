require('dotenv').config({ path: './config/config.env' })

const express = require('express');
const connect = require('./config/db');
const errorHandler = require('./middlewares/error');
const app = express();



connect();

app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/api/users'));

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`));

process.on('unhandledRejection', (err, _promise) => {
    console.log(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})