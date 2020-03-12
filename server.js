const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Router
app.use('/users', require('./routes/user'));
// Listen
app.listen(process.env.PORT || 3000, () => {
    console.log('Running');
});