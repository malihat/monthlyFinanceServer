const path = require('path');
const express = require('express')
const cors = require('cors')
const totalRecordRouter = require('./router/TotalRecordRouter');
const financeRecordRouter = require("./router/FinanceRecordRouter");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json()); // Middleware to parse JSON requests
app.use('https://financetrackerbackend.vercel.app/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

app.use('/', financeRecordRouter);
app.use('/api', totalRecordRouter);



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Not connected to Mongodb: ", err.message))

app.listen(PORT, '0.0.0.0/0', () => {
    console.log('Server is running on port 5000');
});

