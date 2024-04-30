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
let currentQuestionPage = 0
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
        currentQP.currentPage = questionsQP[1][0]
    } else if (questionsQP[currentQuestion].length > (currentQuestionPage+1)) {
        currentQuestionPage += 1;
        currentQP.currentPage += 1;
    } else {
        currentQP.currentPage += 1;
        currentQuestion += 1;
        currentQuestionPage = 0;
    }

    currentMI.currentPage = questionsMI[currentQuestion][0]

    renderCurrentPage(currentQP, qpViewer);
    renderCurrentPage(currentMI, miViewer);
    questionLabel.innerHTML = "Current Question: " + currentQuestion + ", page: " + currentQuestionPage
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
        let questionsDict = {}
        for (let number = 1; number <= doc.numPages; number++) {
            getPageText(doc, number).then(function(result) {
                for (let question = 1; question <= 50; question++){
                    if (result.includes(question + ". ")) {
                        //console.log(currentPDF + ": Question " + question + " is on page " + number)
                        if (questionsDict[question] == null) {
                            questionsDict[question] = [number]
                        } else if (!questionsDict[question].includes(number)) {
                            questionsDict[question].push(number)
                        }                        
                    }
                }
            });
        }  

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

loadPDF("sqa_pdfs/NH_Graphic-Communication_QP_2023.pdf", "qp")
loadPDF("sqa_pdfs/mi_NH_Graphic-Communication_mi_2023.pdf", "mi")