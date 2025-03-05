const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MonogDB Connected'))
.catch(err => console.log(err))

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
