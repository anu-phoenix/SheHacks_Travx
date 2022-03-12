const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const transacRouter = require('./routes/roomRoutes');
const viewRouter = require('./routes/viewRoutes');

// Express app intialization
const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transac', transacRouter);
app.use('/', viewRouter);

module.exports = app;
