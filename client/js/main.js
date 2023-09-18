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
