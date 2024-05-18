function loadCoursePackage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            JSZip.loadAsync(arrayBuffer).then(function(zip) {
                let packageDataFile = null;
                zip.forEach(function (relativePath, zipEntry) {
                    if (relativePath.endsWith("/package_data.json")) {
                        packageDataFile = zipEntry;
                    }
                });
                if (packageDataFile) {
                    packageDataFile.async("string").then(function(content) {
                        try {
                            const jsonData = JSON.parse(content);
                            console.log(jsonData); // Print parsed JSON to console
                        } catch (error) {
                            console.error("Failed to parse package_data.json:", error);
                        }
                    });
                } else {
                    console.error("package_data.json not found in the zip file.");
                }
            }).catch(function(err) {
                console.error("Failed to load zip file:", err);
            });
        };
        reader.readAsArrayBuffer(file);
    }
}
