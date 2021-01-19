const express = require('express');
const path = require('path');
const cors = require('cors');
 
// Use env port or default
const port = process.env.PORT || 5000;

const app = express()

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/../client/build'));
app.get('/*',(req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));