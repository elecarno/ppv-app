const nextButton = document.getElementById("next-button")
const previousButton = document.getElementById("previous-button")
const navToggleButton = document.getElementById("toggle-nav-button")
const qpNextButton = document.getElementById("qp-right-button")
const qpPreviousButton = document.getElementById("qp-left-button")
const miNextButton = document.getElementById("mi-right-button")
const miPreviousButton = document.getElementById("mi-left-button")
const questionNavigationPanel = document.getElementById("q-navigation")
const separateNavigationPanel = document.getElementById("s-navigation")
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
let usingQuestionNavigation = true

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

navToggleButton.addEventListener("click", () => {
    usingQuestionNavigation = !usingQuestionNavigation
    if (usingQuestionNavigation) {
        navToggleButton.innerHTML = "Switch to Separate Navigation"
        questionNavigationPanel.style.display = "block"
        separateNavigationPanel.style.display = "none"
    } else {
        navToggleButton.innerHTML = "Switch to Question Navigation"
        questionNavigationPanel.style.display = "none"
        separateNavigationPanel.style.display = "block"
    }
    currentQuestion = 1
    currentArticle = 0
    currentArticlePage = 0
    questionLabel.innerHTML = "Current Question: N/A"
})

qpNextButton.addEventListener("click", () => {
    currentQP.currentPage += 1;
    renderCurrentPage(currentQP, qpViewer);
})

qpPreviousButton.addEventListener("click", () => {
    currentQP.currentPage -= 1;
    renderCurrentPage(currentQP, qpViewer);
})

miNextButton.addEventListener("click", () => {
    currentMI.currentPage += 1;
    renderCurrentPage(currentMI, miViewer);
})

miPreviousButton.addEventListener("click", () => {
    currentMI.currentPage -= 1;
    renderCurrentPage(currentMI, miViewer);
})

nextButton.addEventListener("click", () => {
    // If on first page, move to first page of first question
    if (currentQP.currentPage == 1) {
        currentQP.currentPage = questionsQP[currentQuestion][1][0][0]
        currentMI.currentPage = questionsMI[currentQuestion][1][0][0]
        console.log("qp: moved to first page of first question")
    } else {
        // check if still on current question
        if (currentArticle+1 < questionsQP[currentQuestion][0].length && questionsQP[currentQuestion][1][0] != undefined){
            // check if still within current article
            if (currentArticlePage+1 < questionsQP[currentQuestion][1][currentArticle].length) {
                currentArticlePage += 1
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][currentArticlePage]
                currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle][currentArticlePage]
                console.log("qp: set to next page of current article")
            } else { // move to next article if at end of current article
                currentArticlePage = 0
                currentArticle += 1
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][0]
                currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle][0] 
                console.log("qp: set to page of next article")
            }
        } else { // move to next question if at end of current question
            currentArticlePage = 0
            currentArticle = 0
            currentQuestion += 1
            currentQP.currentPage = questionsQP[currentQuestion][0][0]
            currentMI.currentPage = questionsMI[currentQuestion][0][0]
            console.log("qp: moved to first page of next question")
        }
    }

    renderCurrentPage(currentQP, qpViewer);
    renderCurrentPage(currentMI, miViewer);
    updateQuestionLabel();
})

previousButton.addEventListener("click", () => {
    // If on first page, move to first page of first question
    if (currentQP.currentPage == 1) {
        currentQP.currentPage = questionsQP[currentQuestion][1][0][0]
        currentMI.currentPage = questionsMI[currentQuestion][1][0][0]
        console.log("qp: moved to first page of first question")
    } else {
        if (currentArticle > 0){
            if (currentArticlePage > 0) {
                currentArticlePage -= 1
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][currentArticlePage]
                currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle][currentArticlePage]
                console.log("qp: moved to previous page of current article")
            } else {
                currentArticle -= 1
                currentArticlePage = (questionsQP[currentQuestion][1][currentArticle].length -1)
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle].at(-1)
                currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle].at(-1)
                console.log("qp: moved to last page of previous article")
            }
        } else {
            currentQuestion -= 1
            currentArticle = Object.keys(questionsQP[currentQuestion]).length - 1
            currentArticlePage = (questionsQP[currentQuestion][1][currentArticle].length -1)
            currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle].at(-1)
            currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle].at(-1)
            console.log("qp: moved to last page of previous question")
        }
    }

    renderCurrentPage(currentQP, qpViewer);
    renderCurrentPage(currentMI, miViewer);
    updateQuestionLabel();
})

function updateQuestionLabel(){
    if (questionsQP[currentQuestion][1][currentArticle] != undefined){
        if (questionsQP[currentQuestion][1][currentArticle].length > 1){
            questionLabel.innerHTML = "Current Question: " + currentQuestion + ". (" + (currentArticle+10).toString(36) + ") - page " + (currentArticlePage+1)
        } else {
            questionLabel.innerHTML = "Current Question: " + currentQuestion + ". (" + (currentArticle+10).toString(36) + ")"
        }
    } else {
        questionLabel.innerHTML = "Current Question: " + currentQuestion + "."
    }

    console.log("currentPage: ", currentQP.currentPage, ", final page of question: ", questionsQP[currentQuestion][0].at(-1)
    , "\ncurrentQuestion: ", currentQuestion, ", number of pages: ", questionsQP[currentQuestion][0].length
    , "\ncurrentArticle: ", currentArticle, ", number of pages: ", questionsQP[currentQuestion][1][currentArticle].length
    , "\ncurrentArticlePage: ", currentArticlePage, ", actual page: ", questionsQP[currentQuestion][1][currentArticle][currentArticlePage])
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

//loadPDF("sqa_pdfs/NH_Spanish_Reading_2023.pdf", "qp")
//loadPDF("sqa_pdfs/mi_NH_Spanish_Reading_2023.pdf", "mi")

//loadPDF("sqa_pdfs/NH_Chemistry_Paper2_2022.pdf", "qp")
//loadPDF("sqa_pdfs/mi_NH_Chemistry_Paper-2_2022.pdf", "mi")

loadPDF("sqa_pdfs/NH_Graphic-Communication_QP_2023.pdf", "qp")
loadPDF("sqa_pdfs/mi_NH_Graphic-Communication_mi_2023.pdf", "mi")