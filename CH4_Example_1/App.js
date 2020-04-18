const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
// const handelHbs = require('express-handlebars');
const path = require('path');
const adminrouter = require('./routes/admin.js');
const shoprouter = require('./routes/shop.js');
const ErrorController = require('./controllers/error.js');



const app = express();
// app.engine('Handlebars', handelHbs({layoutsDir: '/views/Layout' , defaultLayout: 'main-layout',extname:'handlebars'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyparser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'Puplic')));

app.use('/admin', adminrouter);  
app.use(shoprouter);


app.use('/',ErrorController.get404error);

app.listen(3000);