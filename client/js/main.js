// Animation when the page loads
gsap.from("header", {duration: 1, y: "-100%", opacity: 0});
gsap.from(".upload-section", {duration: 1, x: "-100%", delay: 0.5});
gsap.from(".output-section", {duration: 1, x: "100%", delay: 1});
gsap.from(".chat-section", {duration: 1, y: "100%", delay: 1.5});

document.getElementById('analyzeButton').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const output = document.getElementById('output');

  if (!fileInput.files.length) {
      alert('Please upload a ZIP file first.');
      return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const response = await fetch('/analyze-directory', {
      method: 'POST',
      body: formData
  });

  const data = await response.json();
  output.value = data.feedback;
});

document.getElementById('askGPTButton').addEventListener('click', async () => {
  const gptPrompt = document.getElementById('gptPrompt');
  const output = document.getElementById('output');

  if (!gptPrompt.value.trim()) {
      alert('Please enter a question or prompt for ChatGPT.');
      return;
  }

  const userResponse = await fetch('/ask-chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: gptPrompt.value.trim() })
  });

  const responseData = await userResponse.json();
  output.value += "\n\n" + responseData.feedback;

  gptPrompt.value = '';  // Clear the input for the next question
});
