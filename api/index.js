const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

const API_ENDPOINT = 'https://api.openai.com/v2/engines/davinci/completions';
const API_KEY = process.env.API_KEY;

app.post('/analyze', async (req, res) => {
    const { code } = req.body;

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: `Review the following code: ${code}`,
            max_tokens: 150
        })
    });

    const data = await response.json();
    res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
