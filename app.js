const path = require('path');
const express = require('express');

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

// Express app intialization
const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/v1/', userRouter);
app.use('/', viewRouter);

module.exports = app;
