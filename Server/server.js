require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const chalk = require('chalk');
const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('./config/db');


app.use(cors());
app.use(parser.json());

app.use('/api/task', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(port, (err) => {
    if (err) {
        console.log(chalk.inverse.red("Something went wrong"), err);
    } else {
        console.log(chalk.inverse.green(`Server is running on port ${port}`));
    }
});