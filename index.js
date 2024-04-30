const nextButton = document.getElementById("next-button")
const previousButton = document.getElementById("previous-button")
const questionLabel = document.getElementById("question-label")

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

nextButton.addEventListener("click", () => {
    if (currentQP.currentPage == 1) {
        currentQP.currentPage = questionsQP[currentQuestion][1][0][0]
        console.log("qp: moved to first page of first question")
    } else {
        if (currentArticle+1 < questionsQP[currentQuestion][0].length && questionsQP[currentQuestion][1][0] != undefined){
            if (currentArticlePage+1 < questionsQP[currentQuestion][1][currentArticle].length) {
                currentArticlePage += 1
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][currentArticlePage]
                console.log("qp: set to next page of current article")
            } else {
                currentArticlePage = 0
                currentArticle += 1
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][0]
                console.log("qp: set to page of next article")
            }
        } else {
            currentArticlePage = 0
            currentArticle = 0
            currentQuestion += 1
            currentQP.currentPage = questionsQP[currentQuestion][0][0]
            console.log("moved to first page of next question")
        }


        // if (currentArticle in questionsMI[currentQuestion][1]) {
        //     currentArticle += 1
        //     currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][0]
        //     currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle][0]
        // } else {
        //     currentArticle += 1
        //     currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][0]
        //     currentMI.currentPage += 1
        // }
    }

    // if (currentArticle < Object.keys(questionsQP[currentQuestion][1]).length)

    renderCurrentPage(currentQP, qpViewer);
    renderCurrentPage(currentMI, miViewer);
    questionLabel.innerHTML = "Current Question: " + currentQuestion + ". (" + (currentArticle+10).toString(36) + ")"

    console.log("currentPage: ", currentQP.currentPage, ", final page of question: ", questionsQP[currentQuestion][0].at(-1)
    , "\ncurrentQuestion: ", currentQuestion, ", number of pages: ", questionsQP[currentQuestion][0].length
    , "\ncurrentArticle: ", currentArticle, ", number of pages: ", questionsQP[currentQuestion][1][currentArticle].length
    , "\ncurrentArticlePage: ", currentArticlePage, ", actual page: ", questionsQP[currentQuestion][1][currentArticle][currentArticlePage])
})

// previousButton.addEventListener("click", () => {

// })

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
        let questionsDict = outlinePDF(doc)

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
}

const getPageText = async (pdf, pageNo) => {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map(token => token.str).join("");
    return pageText;
};

function outlinePDF(doc) {
    let questionsDict = {}

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
                            questionsDict[questionNumber][1] = removeNonConsecutiveNumbers(questionsDict[questionNumber][1])
                        }
                    }
                }
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

function removeNonConsecutiveNumbers2(dictionary) {
    // Convert dictionary keys to an array of numbers and sort it
    const keys = Object.keys(dictionary).map(Number).sort((a, b) => a - b);

    // Check if the first key is 0, if not, return an empty dictionary
    if (keys[0] !== 0) {
        return {};
    }

    // Initialize a new dictionary to store consecutive keys and their corresponding values
    const resultDictionary = {};

    // Iterate through the sorted keys
    for (let i = 0; i < keys.length; i++) {
        // Check if the number is consecutive with the previous one
        if (i === 0 || keys[i] === keys[i - 1] + 1) {
            // If consecutive, add it to the result dictionary
            resultDictionary[keys[i]] = dictionary[keys[i]];
        } else {
            // If non-consecutive, break the loop
            break;
        }
    }

    return resultDictionary;
}

function sortNumericalArray(arr) {
    // Use the sort method with a compare function
    return arr.slice().sort((a, b) => a - b);
}

//loadPDF("sqa_pdfs/NH_Spanish_Reading_2023.pdf", "qp")
//loadPDF("sqa_pdfs/mi_NH_Spanish_Reading_2023.pdf", "mi")

loadPDF("sqa_pdfs/NH_Chemistry_Paper2_2022.pdf", "qp")
loadPDF("sqa_pdfs/mi_NH_Chemistry_Paper-2_2022.pdf", "mi")