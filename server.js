const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
// process.env accesses Node.js's environment variables that would be set to the server you deployed on, or 3000 if it's not set

const server = http.createServer(app);

server.listen(port);