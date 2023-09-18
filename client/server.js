const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'client')));

app.post('/analyze-directory', async (req, res) => {
    // Logic to handle the uploaded zip, extract it, read files, and send to ChatGPT.
    // For brevity, I'm not including the full details here, but it would involve
    // extracting the ZIP, iterating over the files, and then calling ChatGPT.
    const feedback = await getFeedbackFromChatGPT("Your code content here...");
    res.json({ feedback });
});

// Define other routes, middleware, error handlers as needed...

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function getFeedbackFromChatGPT(codeContent) {
    const API_KEY = process.env.API_KEY;
    const endpoint = "https://api.openai.com/v2/engines/davinci/completions";

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            prompt: `Review the following code: ${codeContent}`,
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}
