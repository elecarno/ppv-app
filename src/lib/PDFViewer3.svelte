<script>
    const viewer = document.getElementById("pdf-viewer")
    import * as pdfjs from "pdfjs-dist";
    //import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"; 
    let currentPDF = {};

    let currentPage = 0;
    let totalPages = 0;

    function resetCurrentPDF() {
        currentPDF = {
            file: null,
            totalPages: 0,
            currentPage: 1,
            zoom: 1.5
        }
    }

    function loadPDF() {
        resetCurrentPDF();
        const pdfFile = pdfjs.getDocument("sqa_pdfs/NH_Graphic-Communication_QP_2023.pdf");
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
        currentPage = currentPDF.currentPage
        totalPages = currentPDF.totalPages
    }
    
    loadPDF()

</script>

<main>
    <h3 class="current-page">Page {currentPage} / {totalPages}</h3>
    <canvas class="pdf-viewer"></canvas>
    
</main>

<style>

</style>