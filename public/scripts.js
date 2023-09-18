const codeUpload = document.getElementById('codeUpload');
const output = document.getElementById('output');
const chatGPTPrompt = document.getElementById('chatGPTPrompt');
const chatGPTResponse = document.getElementById('chatGPTResponse');
const analyzeBtn = document.getElementById('analyzeBtn');
const askBtn = document.getElementById('askBtn');

analyzeBtn.addEventListener('click', async () => {
    const formData = new FormData();
    formData.append('code', codeUpload.files[0]);

    const response = await fetch('/analyze', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    output.value = data.response;
});

askBtn.addEventListener('click', async () => {
    const promptText = chatGPTPrompt.value;

    const response = await fetch('/ask-chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
    });

    const data = await response.json();

    chatGPTResponse.value = data.response;
});
