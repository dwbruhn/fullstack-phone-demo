// initial idea: https://daveceddia.com/create-react-app-express-production/

const express = require('express');
const path = require('path');
const phoneServer = require('fullstack-phone/server');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Put all API endpoints under '/api'

// get metadata for all regions
app.get('/api/metadata', (req, res) => {
    const meta = phoneServer.loadMeta();
    res.json(meta);
    console.log('Sent all metadata');
});

// get metadata for a single region
app.get('/api/metadata/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Requested metadata region ${id}`);
    try {
        const meta = phoneServer.loadMeta([id]);
        res.json(meta);
        console.log(`Sent metadata for region ${id}`);
    } catch (e) {
        console.log(`Got exception for ${id}: ${e.message}`);
        res.json({});
    }
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Node server listening on ${port}`);
