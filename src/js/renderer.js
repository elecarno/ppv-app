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

function loadCoursePackage(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      JSZip.loadAsync(e.target.result).then(function (zip) {
        const zipFileName = Object.keys(zip.files)[0].split('/')[0];

        const packageDataFile = zip.file(`${zipFileName}/package_data.json`);
        if (packageDataFile) {
          packageDataFile.async("text").then(function (content) {
            const packageData = JSON.parse(content);
            const course = packageData.course;
            sqaFiles[course] = packageData.data;

            for (const level in packageData.data) {
              for (const year in packageData.data[level]) {
                packageData.data[level][year].forEach(async item => {
                  if (item.path) {
                    const fixedPath = `${zipFileName}/` + reformatPath(item.path);
                    item.path = fixedPath;
                  }
                  if (item.mi && item.mi.path) {
                    const fixedPathMi = `${zipFileName}/` + reformatPath(item.mi.path);
                    item.mi.path = fixedPathMi;
                  }
                  if (item.sp && item.sp.path) {
                    const fixedPathSp = `${zipFileName}/` + reformatPath(item.sp.path);
                    item.sp.path = fixedPathSp;
                  }
                });
              }
            }

            console.log(sqaFiles);
            loadSubjects();

            // Send the sqaFiles data to the main process to save it
            ipcRenderer.send('save-sqa-files', sqaFiles);

          }).catch(function (error) {
            console.error('Error reading package_data.json:', error);
          });
        } else {
          console.error('package_data.json not found in ZIP file');
        }
      }).catch(function (error) {
        console.error('Error loading ZIP file:', error);
      });
    };

    reader.readAsArrayBuffer(file);
  }
}

function reformatPath(str) {
  return str.replace(/\\/g, '/');
}

// Function to load sqaFiles from JSON
function loadSqaFiles() {
  ipcRenderer.send('load-sqa-files');
}

// Listen for the loaded sqaFiles data from the main process
ipcRenderer.on('loaded-sqa-files', (event, data) => {
  if (data) {
    sqaFiles = data;
    console.log('sqaFiles loaded:', sqaFiles);
    loadSubjects(); // Call loadSubjects once the data is loaded
  } else {
    console.error('Failed to load sqaFiles.');
  }
});

loadSqaFiles()