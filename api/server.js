const express = require('express');
const multer = require('multer');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Multer configuration for file uploads
const storage = multer.memoryStorage(); // store the file in memory
const upload = multer({ storage: storage });

app.use(express.static('public')); // serve static files from the 'public' directory
app.use(express.json()); // for parsing application/json

// Endpoint to handle file uploads
app.post('/analyze', upload.single('file'), (req, res) => {
    if (!req.file || Object.keys(req.file).length === 0) {
        return res.status(400).send('No file uploaded.');
    }

    const buffer = req.file.buffer;

    // You can process the uploaded file here, e.g., unzip, analyze, etc.
    // For demonstration, let's just save it to the disk
    const outputPath = path.join(__dirname, 'uploads', req.file.originalname);
    fs.writeFileSync(outputPath, buffer);

    res.send('File uploaded successfully.');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
