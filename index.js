const loadButton = document.getElementById("load-button")
const nextButton = document.getElementById("next-button")
const previousButton = document.getElementById("previous-button")
const viewer = document.getElementById("pdf-viewer")
let currentPDF = {};

let currentQuestion = 1
let currentArticle = 1
let currentPart = 1

function resetCurrentPDF() {
    currentPDF = {
        file: null,
        totalPages: 0,
        currentPage: 1,
        zoom: 1.5
    }
}

// loadButton.addEventListener("click", () => {
//     loadPDF()
// })

nextButton.addEventListener("click", () => {
    const isValidPage = currentPDF.currentPage < currentPDF.totalPages;
    if (isValidPage) {
        currentPDF.currentPage += 1;
        renderCurrentPage();
    }
})

previousButton.addEventListener("click", () => {
    const isValidPage = (currentPDF.currentPage - 1) > 0;
    if (isValidPage) {
        currentPDF.currentPage -= 1;
        renderCurrentPage();
    }
})

function loadPDF() {
    resetCurrentPDF();
    const pdfFile = pdfjsLib.getDocument("sqa_pdfs/NH_Graphic-Communication_QP_2023.pdf");
    pdfFile.promise.then(doc => {
        currentPDF.file = doc;
        currentPDF.totalPages = doc.numPages;

         // Check for questions text
        for (let number = 1; number <= currentPDF.totalPages; number++) {
            getPageText(doc, number).then(function(result) {
                if (result.includes("1. ")) {
                    console.log("Question 1 is on page" + number)
                }
            });
        }

        renderCurrentPage();
    })
}

function renderCurrentPage() {
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

loadPDF()