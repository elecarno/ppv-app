const nextButton = document.getElementById("next-button")
const previousButton = document.getElementById("previous-button")
const questionLabel = document.getElementById("question-label")

const qpViewer = document.getElementById("qp-viewer")
const miViewer = document.getElementById("mi-viewer")
let currentQP = {};
let currentMI = {};

let questionsQP = {};
let questionsMI = {};

let currentQuestion = 1
let currentQuestionPage = 1
let currentArticle = 1
let currentPart = 1

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
        currentQP.currentPage = questionsQP[currentQuestion][0][0]
    } else if (questionsQP[currentQuestion][0].length > currentQuestionPage) {
        currentQuestionPage += 1;
        currentQP.currentPage += 1;
    } 
    else {
        currentQP.currentPage += 1;
        currentQuestion += 1;
        currentQuestionPage = 1;
    }

    //currentMI.currentPage = questionsMI[currentQuestion][0][1]

    renderCurrentPage(currentQP, qpViewer);
    //renderCurrentPage(currentMI, miViewer);
    questionLabel.innerHTML = "Current Question: " + currentQuestion + ", page: " + currentQuestionPage

    console.log(questionsQP[currentQuestion][0].length)
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
                if (pageText.includes("MARGIN" + questionNumber + ". ") || pageText.includes("questions" + questionNumber + ". ") || pageText.includes("guidance" + questionNumber + ". ")) {
                    if (questionsDict[questionNumber] == null){
                        questionsDict[questionNumber] = [[], {}]
                    }
                    questionsDict[questionNumber][0].push(pageNumber)  
                    questionsDict[questionNumber][0] = sortNumericalArray(questionsDict[questionNumber][0])
                    
                    for (i = 0; i < 26; i++) {
                        let startIdx = 0;
                        let stringIdx = (i+10).toString(36)
                        let searchString = "(" + stringIdx + ")"
                        //console.log(searchString)
                        if (pageText.includes(searchString)) {
                            if (questionsDict[questionNumber][1][stringIdx] == null){
                                questionsDict[questionNumber][1][stringIdx] = []
                            }
                            questionsDict[questionNumber][1][stringIdx].push(pageNumber)
                            questionsDict[questionNumber][1][stringIdx] = sortNumericalArray(questionsDict[questionNumber][1][stringIdx])
                            questionsDict[questionNumber][1] = removeNonConsecutiveAlphabets(questionsDict[questionNumber][1])
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

function sortNumericalArray(arr) {
    // Use the sort method with a compare function
    return arr.slice().sort((a, b) => a - b);
}

loadPDF("sqa_pdfs/NH_Chemistry_Paper2_2022.pdf", "qp")
loadPDF("sqa_pdfs/mi_NH_Chemistry_Paper-2_2023.pdf", "mi")