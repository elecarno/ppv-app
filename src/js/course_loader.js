function loadCoursePackage(event) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        JSZip.loadAsync(e.target.result).then(function (zip) {
          // Find the name of the ZIP file
          const zipFileName = Object.keys(zip.files)[0].split('/')[0]; // Extract the name of the first file's directory
  
          // Find and read the package_data.json file
          const packageDataFile = zip.file(`${zipFileName}/package_data.json`);
          if (packageDataFile) {
            // The file was found, proceed with further operations
            packageDataFile.async("text").then(function (content) {
              const packageData = JSON.parse(content);
  
              // Create a key in sqaFiles with the course name and assign packageData to it
              const course = packageData.course;
              sqaFiles[course] = packageData.data;
  
              // Replace each path key with a PDF.js-readable object
              for (const level in packageData.data) {
                for (const year in packageData.data[level]) {
                  packageData.data[level][year].forEach(async item => {
                    if (item.path) {
                      // Get PDF document using pdfjs.getDocument
                      const fixedPath = `${zipFileName}/` + reformatPath(item.path);
                      item.path = fixedPath
                    }
                    if (item.mi && item.mi.path) {
                      // Get PDF document for mi
                      const fixedPathMi = `${zipFileName}/` + reformatPath(item.mi.path);
                      item.mi.path = fixedPathMi
                    }
                    if (item.sp && item.sp.path) {
                      // Get PDF document for sp
                      const fixedPathSp = `${zipFileName}/` + reformatPath(item.sp.path);
                      item.sp.path = fixedPathSp
                    }
                  });
                }
              }
  
              // Log the modified object to the console
              console.log(sqaFiles);
              loadSubjects()
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
  