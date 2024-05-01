let usingQuestionNavigation = true
let showMI = false

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

miVisToggleButton.addEventListener("click", () => {
    showMI = !showMI
    if (showMI) {
        miViewerHolder.style.display = block
    } else {
        miViewerHolder.style.display = none
    }
})

qpNextButton.addEventListener("click", () => {
    if (currentQP.currentPage != currentQP.totalPages){
        currentQP.currentPage += 1;
        renderCurrentPage(currentQP, qpViewer);
    }
})

qpPreviousButton.addEventListener("click", () => {
    if (currentQP.currentPage != 0){
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
    if (currentMI.currentPage != 0){
        currentMI.currentPage -= 1;
        renderCurrentPage(currentMI, miViewer);
    }
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

function updatePageCounts(){
    qpNavLabel.innerHTML = currentQP.currentPage + " / " + currentQP.totalPages
    miNavLabel.innerHTML = currentMI.currentPage + " / " + currentMI.totalPages
}