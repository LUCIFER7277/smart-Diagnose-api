require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connection');

const diagnosisRoutes = require('./routes/diagnosisRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', diagnosisRoutes);

const errorHandler = require('./errors/errorHandler');
app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
