const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const unzipper = require('unzipper');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client'));
app.use(bodyParser.json({ limit: '50mb' }));

// Endpoint to analyze uploaded directory (ZIP file)
app.post('/analyze-directory', async (req, res) => {
    const { codeZip } = req.body;

    // Use unzipper to extract content from ZIP and analyze

    // Mockup response after analyzing
    res.json({ feedback: "Your code looks good, but there are areas to improve." });
});

// Endpoint to ask ChatGPT based on user's prompt
app.post('/ask-chatgpt', async (req, res) => {
    const { prompt } = req.body;

    const apiURL = "https://api.openai.com/v1/engines/davinci/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CHATGPT_API_KEY}`
    };

    const body = JSON.stringify({ prompt: prompt, max_tokens: 150 });

    const response = await fetch(apiURL, {
        method: "POST",
        headers: headers,
        body: body
    });

    const data = await response.json();
    res.json({ response: data.choices[0].text.trim() });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
