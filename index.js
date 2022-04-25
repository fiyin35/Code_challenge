
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/db');
const userRoutes = require('./routes/user');

const dotenv = require('dotenv')

dotenv.config();



const app = express();

app.use(bodyParser.json({ limit: '2mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))
app.use(cors());



app.use('/user', userRoutes);

const PORT = process.env.PORT|| 5000;

sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(PORT);
})
.catch(err => {
    console.log(err);
});





