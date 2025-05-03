const path = require('path');
const express = require('express')
const cors = require('cors')
const totalRecordRouter = require('./router/TotalRecordRouter');
const financeRecordRouter = require("./router/FinanceRecordRouter");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json()); // Middleware to parse JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

app.use('/', financeRecordRouter);
app.use('/api', totalRecordRouter);



// Connect to Mongodb
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Not connected to Mongodb: ", err.message))

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

