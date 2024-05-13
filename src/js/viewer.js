const qpViewer = document.getElementById("qp-pdf-viewer")
const miViewer = document.getElementById("mi-pdf-viewer")
const spViewer = document.getElementById("sp-pdf-viewer")

// stores for PDF data
let currentQP = {};
let currentMI = {};
let currentSP = {};

// stores for question outlines
let questionsQP = {};
let questionsMI = {};
let questionsSP = {};

// counters for question navigation
let currentQuestion = 1 // 1. , 2. , 3.
let currentArticle = 0 // (a) , (b) , (c)
let currentArticlePage = 0 // page of current article

// reset PDF data stores
function resetCurrentPDFs() {
    currentQP = {
        file: null,
        totalPages: 0,
        currentPage: 1,
        zoom: 2.5
    }
    currentMI = {
        file: null,
        totalPages: 0,
        currentPage: 1,
        zoom: 2.5
    }
    currentSP = {
        file: null,
        totalPages: 0,
        currentPage: 1,
        zoom: 2.5
    }

    qpVisToggleButton.style.display = "none"
    miVisToggleButton.style.display = "none"
    spVisToggleButton.style.display = "none"
}

// load PDF data from path (pdfURL = path, pdfType = type of paper ("qp", "mi", "sp"))
function loadPDF(pdfURL, pdfType) {
    resetCurrentPDFs();

    const pdfFile = pdfjsLib.getDocument(pdfURL);
    pdfFile.promise.then(doc => {
        // check for type and load to correct viewer
        switch (pdfType) {
            case "qp":
                currentQP.file = doc;
                currentQP.totalPages = doc.numPages;
                qpVisToggleButton.style.display = "flex"
                renderCurrentPage(currentQP, qpViewer);
                break;
            case "mi":
                currentMI.file = doc;
                currentMI.totalPages = doc.numPages;
                miVisToggleButton.style.display = "flex"
                renderCurrentPage(currentMI, miViewer);
                break;
            case "sp":
                currentSP.file = doc;
                currentSP.totalPages = doc.numPages;
                spVisToggleButton.style.display = "flex"
                renderCurrentPage(currentSP, spViewer);
                break;
        } 

        // outline questions
        let questionsDict = outlinePDF(doc, pdfType)

        console.log(pdfType)
        if (pdfType == "qp") {
            questionsQP = questionsDict
            console.log(questionsQP)
        } 
        else if (pdfType == "mi") {
            questionsMI = questionsDict
            console.log(questionsMI)
        } 
        // else if (pdfType == "sp") {
        //     questionsSP = questionsDict
        //     console.log(questionsSP)
        // }
    })
}

// render page to viewer
function renderCurrentPage(currentPDF, viewer) {
    currentPDF.file.getPage(currentPDF.currentPage).then(page => {
        const context = viewer.getContext("2d");
        const viewport = page.getViewport({scale: currentPDF.zoom});
        viewer.height = viewport.height;
        viewer.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        }
        page.render(renderContext);
    })
    updatePageCounts()
}

// question outliner
function outlinePDF(doc, pdfType) {
    let questionsDict = {};

    // Create an array to hold promises for each page's text content
    const promises = [];

    // Iterate through each page
    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
        // Push the promise for each page's text content into the array
        promises.push(doc.getPage(pageNumber).then(page => {
            // Get the text content of the page
            return page.getTextContent().then(textContent => {
                let pageText = ""
                let lastY = -1;

                // check for newlines
                textContent.items.forEach(function (i) {
                    if (lastY != i.transform[5]) {
                        lastY = i.transform[5];
                    }
                    // add newline indictators to page text string
                    pageText += "\\n" + i.str + " ";
                });

                // Return the page number and text content
                return { pageNumber, pageText };
            });
        }));
    }

    // Wait for all promises to resolve
    Promise.all(promises).then(pageContents => {
        // Sort the page contents based on page number
        pageContents.sort((a, b) => a.pageNumber - b.pageNumber);

        // Log the text content of each page in order
        pageContents.forEach(pageContent => {
            let pageText = pageContent.pageText
            let pageNumber = pageContent.pageNumber
            //console.log(`Text from page ${pageContent.pageNumber}: ${pageContent.pageText}`);

            // loop through hypothetical questions 1-50
            for (let questionNumber = 1; questionNumber <= 50; questionNumber++) {
                // check for question number
                if (pageText.includes("\\n" + questionNumber + ". ")) {
                    let questionKey = questionNumber;
                    let previousArticle = 0

                    // loop through a-z
                    for (i = 0; i < 26; i++) {
                        let currentArticle = (i+10).toString(36)
                        let searchCurrent = "(" + currentArticle + ") "

                        if (pageText.includes(searchCurrent)) {
                            if (i == 0 || previousArticle == (i-1)){
                                previousArticle = i
                                questionKey = questionNumber + currentArticle
                            }
                        }

                        questionsDict[questionKey] = pageNumber

                        // if (questionsDict[questionKey] == undefined){
                        //     questionsDict[questionKey] = [pageNumber]
                        // } else {
                        //     questionsDict[questionKey].push(pageNumber)
                        //     questionsDict[questionKey] = sortNumericalArray(questionsDict[questionKey])
                        // }
                    }
                }
            }
        });

    }).catch(error => {
        console.error('Error while extracting text content:', error);
    });

    return questionsDict
}

// functions for the outliner
const getPageText = async (pdf, pageNo) => {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map(token => token.str).join("");
    return pageText;
};

const getPageTextRaw = async (pdf, pageNo) => {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    return tokenizedText;
};

function removeNonConsecutiveAlphabets(dictionary) {
    // Convert dictionary keys to an array and sort it
    const keys = Object.keys(dictionary).sort();

    // Initialize a new dictionary to store consecutive keys and their corresponding values
    const resultDictionary = {};

    // Iterate through the sorted keys
    for (let i = 0; i < keys.length; i++) {
        // Check if it's the first key or if the character code is consecutive with the previous one
        if (i === 0 || keys[i].charCodeAt(0) === keys[i - 1].charCodeAt(0) + 1) {
            // If consecutive, add it to the result dictionary
            resultDictionary[keys[i]] = dictionary[keys[i]];
        }
    }

    return resultDictionary;
}

function removeNonConsecutiveNumbers(dictionary) {
    // Convert dictionary keys to an array of numbers and sort it
    const keys = Object.keys(dictionary).map(Number).sort((a, b) => a - b);

    // Initialize a new dictionary to store consecutive keys and their corresponding values
    const resultDictionary = {};

    // Iterate through the sorted keys
    for (let i = 0; i < keys.length; i++) {
        // Check if it's the first key or if the number is consecutive with the previous one
        if (i === 0 || keys[i] === keys[i - 1] + 1) {
            // If consecutive, add it to the result dictionary
            resultDictionary[keys[i]] = dictionary[keys[i]];
        }
    }

    return resultDictionary;
}

function removeNonConsecutiveNumbersArray(arr) {
    // Convert array elements to numbers and sort it
    const sortedArr = arr.map(Number).sort((a, b) => a - b);

    // Initialize a new array to store consecutive elements
    const resultArr = [];

    // Iterate through the sorted array
    for (let i = 0; i < sortedArr.length; i++) {
        // Check if the number is consecutive with the previous one
        if (i === 0 || sortedArr[i] === sortedArr[i - 1] + 1) {
            // If consecutive, add it to the result array
            resultArr.push(sortedArr[i]);
        } else {
            // If non-consecutive, break the loop
            break;
        }
    }

    return resultArr;
}

function sortNumericalArray(arr) {
    // Use the sort method with a compare function
    arr = removeNonConsecutiveNumbersArray(arr)
    return arr.slice().sort((a, b) => a - b);
}

function extractPageNumberFromString(inputString) {
    // Regular expression to match "page" followed by one or two digits
    const regex = /page\s+(\d+)/i;
    // Match the regex against the input string
    const match = inputString.match(regex);
    // If there's a match, extract the number from the matched group
    if (match) {
        return parseInt(match[1], 10); // Parse the matched number as an integer
    } else {
        return null; // Return null if no match found
    }
}