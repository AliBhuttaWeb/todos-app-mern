const express = require('express');
const app     = express();
const http    = require('http');

//.env configuration
require('dotenv').config();
const env = process.env;

//Configuration to accept json
app.use(express.json());

//Initializing DB connection
const mySQLConnection = require.main.require('./database/connections/mysql_conn');
mySQLConnection.connectToMySQL(env);

//Custom imports/modules
const listRoutes = require.main.require('./routes/list');
const todoRoutes = require.main.require('./routes/todo');
const notFoundRoute = require.main.require('./routes/not_found');

/** Routes List **/
//List Routes
app.use('/api/list', listRoutes);

//Todo Routes
app.use('/api/todos', todoRoutes);

//Not Found Route
app.use(notFoundRoute);

//Server configurations
const server = http.createServer(app);
server.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`));


