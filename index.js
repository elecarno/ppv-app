const loadButton = document.getElementById("load-button")
const viewer = document.getElementById("pdf-viewer")
let currentPDF = {};

function resetCurrentPDF() {
    currentPDF = {
        file: null,
        totalPages: 0,
        currentPage: 1,
        zoom: 1.5
    }
}

loadButton.addEventListener("click", () => {
    loadPDF()
})

function loadPDF() {
    resetCurrentPDF();
    const pdfFile = pdfjsLib.getDocument("sqa_pdfs/NH_Graphic-Communication_QP_2023.pdf");
    pdfFile.promise.then(doc => {
        currentPDF.file = doc;
        currentPDF.totalPages = doc.numPages;
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