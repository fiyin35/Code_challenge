
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/db');

const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//REMEMBER TO REMOVE THIS
app.get('/', (req, res) => {
    res.send('Welcome to homepage');
});

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



// app.listen(PORT, () => {
//     console.log(`listening on port: ${PORT}`)
// })



