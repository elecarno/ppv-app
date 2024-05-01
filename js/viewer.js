const qpViewer = document.getElementById("qp-viewer")
const miViewer = document.getElementById("mi-viewer")
let currentQP = {};
let currentMI = {};

let questionsQP = {};
let questionsMI = {};

let currentQuestion = 1 // 1. , 2. , 3.
let currentArticle = 0 // (a) , (b) , (c)
let currentArticlePage = 0

function resetCurrentQP() {
    currentQP = {
        file: null,
        totalPages: 0,
        currentPage: 1,
        zoom: 1.5
    }
}
function resetCurrentMI() {
    currentMI = {
        file: null,
        totalPages: 0,
        currentPage: 1,
        zoom: 1.5
    }
}

function loadPDF(pdfURL, currentPDF) {
    resetCurrentQP();
    resetCurrentMI();

    const pdfFile = pdfjsLib.getDocument(pdfURL);
    pdfFile.promise.then(doc => {
        switch (currentPDF) {
            case "qp":
                currentQP.file = doc;
                currentQP.totalPages = doc.numPages;
                renderCurrentPage(currentQP, qpViewer);
                break;
            case "mi":
                currentMI.file = doc;
                currentMI.totalPages = doc.numPages;
                renderCurrentPage(currentMI, miViewer);
                break;
        } 

        // Check for questions
        let questionsDict = outlinePDF(doc, currentPDF)

        console.log(currentPDF)
        if (currentPDF == "qp") {
            questionsQP = questionsDict
            console.log(questionsQP)
        } else if (currentPDF == "mi") {
            questionsMI = questionsDict
            console.log(questionsMI)
        }
    })
}

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

const getPageText = async (pdf, pageNo) => {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map(token => token.str).join("");
    return pageText;
};

function outlinePDF(doc, currentPDF) {
    let questionsDict = {}
    let isMI = false

    if (currentPDF == "mi"){
        isMI = true
    }

    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
        getPageText(doc, pageNumber).then(function(pageText) {
            //console.log(pageNumber, pageText)        
            for (let questionNumber = 1; questionNumber <= 50; questionNumber++){
                if (pageText.includes("MARGIN" + questionNumber + ". ") 
                || pageText.includes("questions" + questionNumber + ". ") 
                || pageText.includes("guidance" + questionNumber + ". ")
                || pageText.includes("." + questionNumber + ". ")
                || pageText.includes("accept:" + questionNumber + ". ")) {
                    if (questionsDict[questionNumber] == null){
                        questionsDict[questionNumber] = [[], {}]
                    }
                    questionsDict[questionNumber][0].push(pageNumber)  
                    questionsDict[questionNumber][0] = sortNumericalArray(questionsDict[questionNumber][0])
                    
                    for (i = 0; i < 26; i++) {
                        let searchString = "(" + (i+10).toString(36) + ")"
                        //console.log(searchString)
                        if (pageText.includes(searchString)) {
                            if (questionsDict[questionNumber][1][i] == null){
                                questionsDict[questionNumber][1][i] = []
                            }
                            questionsDict[questionNumber][1][i].push(pageNumber)
                            questionsDict[questionNumber][1][i] = sortNumericalArray(questionsDict[questionNumber][1][i])
                            questionsDict[questionNumber][1][i] = removeNonConsecutiveNumbersArray(questionsDict[questionNumber][1][i])
                            questionsDict[questionNumber][1] = removeNonConsecutiveNumbers(questionsDict[questionNumber][1])
                            //questionsDict[questionNumber][1] = removeNonConsecutiveEntries(questionsDict[questionNumber][1])
                        }
                    }
                }

                //questionsDict[questionNumber][0] = removeNonConsecutiveNumbersArray(questionsDict[questionNumber][0])
            }
        });
    }

    return questionsDict
}

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