const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const findFreePort = require('find-free-port');

findFreePort(3000, (err, freePort) => {
    if (err) throw err;
    const PORT = freePort;

    // Body parsing middleware
    app.use(express.json());

    // Serve static files from the docs/ directory
    app.use(express.static(path.join(__dirname, 'docs')));

    // Set homepage to docs/index.html
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'docs', 'index.html'));
    });

    // POST /save
    // Route to save data from experiments
    app.post('/save', (req, res) => {

        const filePath = './data/' + req.body.filename;

        fs.writeFile(filePath, req.body.data, (err) => {
            if (err) {
                console.error('Error saving the file:', err);
                res.status(500).send('Error saving the data');
            } else {
                console.log('Data saved successfully');
                res.json({ success: 1 });
            }
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});