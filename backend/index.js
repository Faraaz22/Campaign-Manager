// import express,cors and dotenv
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaigns');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
console.log(`Server is running on port ${PORT}`)
})