const express = require('express');
var cors = require('cors')
var app = express()
 
app.use(cors());
const port = 5000;
app.use(express.json());

//connecting to mongoose server
const connectToMongo = require('./db');
connectToMongo();

//routes:
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`cloudNotebook backend listening at http://localhost:${port}`)
});