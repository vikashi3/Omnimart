const cors = require('cors');

const corsOptions = {
    origin: [ 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true, 
};

module.exports = cors(corsOptions);
