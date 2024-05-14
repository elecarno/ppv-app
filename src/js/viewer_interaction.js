let usingQuestionNavigation = true
let showQP                  = true
let showMI                  = false
let showSP                  = false
let isEnlarged              = false

// counters for question navigation
let currentQuestion         = 1 // 1a, 1b, 2a, 2b, 2c, 3, 4, 5a, 5b
let currentQuestionIndex    = 0 // 1a = 0, 1b = 1, 2a = 2
let currentQuestionPageQP   = 0 // page of current question
let currentQuestionPageMI   = 0
let currentQuestionPageSP   = 0 
let atEndOfQP               = false
let atEndOfMI               = true
let atEndOfSP               = false

// add functionality to navigation toggle button
navToggleButton.addEventListener("click", () => {
    usingQuestionNavigation = !usingQuestionNavigation
    if (usingQuestionNavigation) {
        // update navToggleButton
        navToggleButton.innerHTML = "Switch to<br>Separate Navigation"
        questionNavigationPanel.style.display = "flex"
        // hide all "s-nav-button"s
        qpNextButton.style.display = "none"
        qpPreviousButton.style.display = "none"
        miNextButton.style.display = "none"
        miPreviousButton.style.display = "none"
        spNextButton.style.display = "none"
        spPreviousButton.style.display = "none"
    } else {
        // update navToggleButton
        navToggleButton.innerHTML = "Switch to<br>Question Navigation"
        questionNavigationPanel.style.display = "none"
        // show all "s-nav-button"s
        qpNextButton.style.display = "block"
        qpPreviousButton.style.display = "block"
        miNextButton.style.display = "block"
        miPreviousButton.style.display = "block"
        spNextButton.style.display = "block"
        spPreviousButton.style.display = "block"
        
    }
    // reset counters and display for question navigation
    currentQuestion = 1
    currentArticle = 0
    currentArticlePage = 0
    questionLabel.innerHTML = "Question: N/A"
})

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
nextButton.addEventListener("click", () => {
    // If on first page, move to first page of first question
    if (currentQP.currentPage == 1) {
        currentQuestion = Object.keys(questionsQP)[currentQuestionIndex]
        currentQP.currentPage = questionsQP[currentQuestion][0]
    } else {
        if (currentQuestionPageQP != questionsQP[currentQuestion].length-1){
            currentQuestionPageQP += 1
            currentQP.currentPage = questionsQP[currentQuestion][currentQuestionPageQP]
        } else { 
            atEndOfQP = true 
            currentQuestionPageQP = 0
            console.log("(qp) at end of question " + currentQuestion)
        }
        if (currentQuestionPageMI != questionsMI[currentQuestion].length-1){
            currentQuestionPageMI += 1
            currentQP.currentPage = questionsMI[currentQuestion][currentQuestionPageMI]
        } else { atEndOfMI = true }

        if (atEndOfQP) {
            currentQuestionIndex += 1
            currentQuestion = Object.keys(questionsQP)[currentQuestionIndex]
            currentQP.currentPage = questionsQP[currentQuestion][0]
            atEndOfQP = false
        }
        
    }

    console.log("(qp) moved to page " + (currentQuestionPageQP+1) + "/" + questionsQP[currentQuestion].length + " of question " + currentQuestion)

    renderCurrentPage(currentQP, qpViewer);
    renderCurrentPage(currentMI, miViewer);
    updateQuestionLabel();
})

previousButton.addEventListener("click", () => {
    // do stuff

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