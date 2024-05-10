let usingQuestionNavigation = true
let showQP = true
let showMI = false
let showSP = false
let isEnlarged = false

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
        // check if not on first article
        if (currentArticle > 0){
            // if no, check if not on current article's first page
            if (currentArticlePage > 0) {
                // if no, move to previous page of current article
                currentArticlePage -= 1
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle][currentArticlePage]
                currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle][currentArticlePage]
                console.log("qp: moved to previous page of current article")
            } else {
                // if yes, move to previous article
                currentArticle -= 1
                currentArticlePage = (questionsQP[currentQuestion][1][currentArticle].length -1)
                currentQP.currentPage = questionsQP[currentQuestion][1][currentArticle].at(-1)
                currentMI.currentPage = questionsMI[currentQuestion][1][currentArticle].at(-1)
                console.log("qp: moved to last page of previous article")
            }
        } else {
            // if yes, move to previous question
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

// update displays
function updateQuestionLabel(){
    // check if question has article or is standalone
    if (questionsQP[currentQuestion][1][currentArticle] != undefined){
        // check if article has mulitple pages
        if (questionsQP[currentQuestion][1][currentArticle].length > 1){
            // render display with page number of article
            questionLabel.innerHTML = currentQuestion + ". (" + (currentArticle+10).toString(36) + ") - page " + (currentArticlePage+1)
        } else {
            // display standalone question and article
            questionLabel.innerHTML = currentQuestion + ". (" + (currentArticle+10).toString(36) + ")"
        }
    } else {
        // display standalone question number
        questionLabel.innerHTML = currentQuestion + "."
    }

    // log question navigation counters for debugging purposes
    console.log("currentPage: ", currentQP.currentPage, ", final page of question: ", questionsQP[currentQuestion][0].at(-1)
    , "\ncurrentQuestion: ", currentQuestion, ", number of pages: ", questionsQP[currentQuestion][0].length
    , "\ncurrentArticle: ", currentArticle, ", number of pages: ", questionsQP[currentQuestion][1][currentArticle].length
    , "\ncurrentArticlePage: ", currentArticlePage, ", actual page: ", questionsQP[currentQuestion][1][currentArticle][currentArticlePage])
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