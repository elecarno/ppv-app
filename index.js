const loadButton = document.getElementById("load-button")
const nextButton = document.getElementById("next-button")
const previousButton = document.getElementById("previous-button")

const qpViewer = document.getElementById("qp-viewer")
const miViewer = document.getElementById("mi-viewer")
let currentQP = {};
let currentMI = {};

let currentQuestion = 1
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

// nextButton.addEventListener("click", () => {
//     const isValidPage = currentQP.currentPage < currentQP.totalPages;
//     if (isValidPage) {
//         currentQP.currentPage += 1;
//         renderCurrentPage();
//     }
// })

// previousButton.addEventListener("click", () => {
//     const isValidPage = (currentQP.currentPage - 1) > 0;
//     if (isValidPage) {
//         currentQP.currentPage -= 1;
//         renderCurrentPage();
//     }
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
        for (let number = 1; number <= doc.numPages; number++) {
            getPageText(doc, number).then(function(result) {
                if (result.includes("1. ")) {
                    console.log(currentPDF + ": Question 1 is on page " + number)
                }
            });
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