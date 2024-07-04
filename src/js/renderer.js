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

function loadPDF(pdfURL, pdfType, subject) {
  resetCurrentPDFs();

  // Send IPC request to main process to get the PDF file from the ZIP
  ipcRenderer.send('get-pdf-from-zip', { subject, pdfURL, pdfType });
}

// Listen for the response from the main process with the extracted PDF data
ipcRenderer.on('pdf-from-zip', (event, { pdfData, pdfType }) => {
  if (pdfData) {
      const pdfArrayBuffer = new Uint8Array(pdfData).buffer;
      const pdfFile = pdfjsLib.getDocument({ data: pdfArrayBuffer });
      
      pdfFile.promise.then(doc => {
          // check for type and load to correct viewer
          switch (pdfType) {
              case "qp":
                  currentQP.file = doc;
                  currentQP.totalPages = doc.numPages;
                  qpVisToggleButton.style.display = "flex";
                  renderCurrentPage(currentQP, qpViewer);
                  break;
              case "mi":
                  currentMI.file = doc;
                  currentMI.totalPages = doc.numPages;
                  miVisToggleButton.style.display = "flex";
                  renderCurrentPage(currentMI, miViewer);
                  break;
              case "sp":
                  currentSP.file = doc;
                  currentSP.totalPages = doc.numPages;
                  spVisToggleButton.style.display = "flex";
                  renderCurrentPage(currentSP, spViewer);
                  break;
          } 

          // outline questions
          let questionsDict = outlinePDF(doc, pdfType);

          console.log(pdfType);
          if (pdfType == "qp") {
              questionsQP = questionsDict;
              console.log(questionsQP);
          } else if (pdfType == "mi") {
              questionsMI = questionsDict;
              console.log(questionsMI);
          } else if (pdfType == "sp") {
              questionsSP = questionsDict;
              console.log(questionsSP);
          }
      });
  } else {
      console.error('Failed to load PDF from ZIP.');
  }
});

// loadSqaFiles()