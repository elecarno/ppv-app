let showQP                  = true
let showMI                  = false
let showSP                  = false
let isEnlarged              = false

// add functionality to enlarge/minimise button
scaleToggleButton.addEventListener("click", () => {
    isEnlarged = !isEnlarged

    scaleToggleButton.innerHTML = ""
    var icon = document.createElement("i")

    if (isEnlarged) {
        icon.setAttribute("data-feather", "minimize")
        qpViewerHolder.style.width = "100%"
        miViewerHolder.style.width = "100%"
        spViewerHolder.style.width = "100%"
    }
    else {
        icon.setAttribute("data-feather", "maximize")
        qpViewerHolder.style.width = "70%"
        miViewerHolder.style.width = "70%"
        spViewerHolder.style.width = "70%"
    }

    scaleToggleButton.append(icon)
    feather.replace()
})

// add functionality to paper visibility toggles
qpVisToggleButton.addEventListener("click", () => {
    showQP = !showQP

    if (showQP) {
        qpViewerHolder.style.display = "block"
        qpVisToggleButton.style.backgroundColor = "var(--button-active)"
    } else {
        qpViewerHolder.style.display = "none"
        qpVisToggleButton.style.backgroundColor = "var(--button-toggle-off)"
    }

    //qpVisToggleButton.append(icon)
})

miVisToggleButton.addEventListener("click", () => {
    showMI = !showMI

    if (showMI) {
        miViewerHolder.style.display = "block"
        miVisToggleButton.style.backgroundColor = "var(--button-active)"
    } else {
        miViewerHolder.style.display = "none"
        miVisToggleButton.style.backgroundColor = "var(--button-toggle-off)"
    }

    //miVisToggleButton.append(icon)
})

spVisToggleButton.addEventListener("click", () => {
    showSP = !showSP

    if (showSP) {
        spViewerHolder.style.display = "block"
        spVisToggleButton.style.backgroundColor = "var(--button-active)"
    } else {
        spViewerHolder.style.display = "none"
        spVisToggleButton.style.backgroundColor = "var(--button-toggle-off)"
    }

    //spVisToggleButton.append(icon)
})

// add functionality to seperate navigation buttons
qpNextButton.addEventListener("click", () => {
    if (currentQP.currentPage != currentQP.totalPages){
        currentQP.currentPage += 1;
        renderCurrentPage(currentQP, qpViewer);
    }
})

qpPreviousButton.addEventListener("click", () => {
    if (currentQP.currentPage != 1){
        currentQP.currentPage -= 1;
        renderCurrentPage(currentQP, qpViewer);
    }
})

miNextButton.addEventListener("click", () => {
    if (currentMI.currentPage != currentMI.totalPages){
        currentMI.currentPage += 1;
        renderCurrentPage(currentMI, miViewer);
    }
})

miPreviousButton.addEventListener("click", () => {
    if (currentMI.currentPage != 1){
        currentMI.currentPage -= 1;
        renderCurrentPage(currentMI, miViewer);
    }
})

spNextButton.addEventListener("click", () => {
    if (currentSP.currentPage != currentSP.totalPages){
        currentSP.currentPage += 1;
        renderCurrentPage(currentSP, spViewer);
    }
})

spPreviousButton.addEventListener("click", () => {
    if (currentSP.currentPage != 1){
        currentSP.currentPage -= 1;
        renderCurrentPage(currentSP, spViewer);
    }
})

// add functionality to question navigation buttons
qNavButton.addEventListener("click", () => {
    renderCurrentPage(currentQP, qpViewer);
    renderCurrentPage(currentMI, miViewer);
    updateQuestionLabel();
})

// update displays
function updateQuestionLabel(){
    //console.log(currentQuestion)
}

function updatePageCounts(){
    qpNavLabel.innerHTML = currentQP.currentPage + " / " + currentQP.totalPages
    miNavLabel.innerHTML = currentMI.currentPage + " / " + currentMI.totalPages
    spNavLabel.innerHTML = currentSP.currentPage + " / " + currentSP.totalPages
}

// add functionality to "Back to Papers" button
document.getElementById("viewer-back-button").addEventListener("click", () => {
    menuUI.style.display = "block"
    viewerUI.style.display = "none"
})