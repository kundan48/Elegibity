const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbconnection');
const cron = require('node-cron');
const ApiIndex = require('./api/index.js'); 
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

connectDB(); 

app.use('/api', ApiIndex);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
