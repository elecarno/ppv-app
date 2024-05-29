const { ipcRenderer } = require('electron');

document.getElementById('load-package-button').addEventListener('change', (event) => {
  const file = event.target.files[0];

  // Check if the file is a zip file by its extension
  if (file && file.name.endsWith('.zip')) {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = Buffer.from(reader.result);
      ipcRenderer.send('save-zip-file', { name: file.name, data: buffer });
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert('Please select a valid zip file.');
  }
});
