let showQP                  = true
let showMI                  = false
let showSP                  = false
let isEnlarged              = false
let showingQuestionOutline  = false

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
        qpVisToggleButton.style.color = "var(--button-text)"
    } else {
        qpViewerHolder.style.display = "none"
        qpVisToggleButton.style.backgroundColor = "var(--button-toggle-off)"
        qpVisToggleButton.style.color = "var(--button-toggle-off-text)"
    }

    //qpVisToggleButton.append(icon)
})

miVisToggleButton.addEventListener("click", () => {
    showMI = !showMI

    if (showMI) {
        miViewerHolder.style.display = "block"
        miVisToggleButton.style.backgroundColor = "var(--button-active)"
        miVisToggleButton.style.color = "var(--button-text)"
    } else {
        miViewerHolder.style.display = "none"
        miVisToggleButton.style.backgroundColor = "var(--button-toggle-off)"
        miVisToggleButton.style.color = "var(--button-toggle-off-text)"
    }

    //miVisToggleButton.append(icon)
})

spVisToggleButton.addEventListener("click", () => {
    showSP = !showSP

    if (showSP) {
        spViewerHolder.style.display = "block"
        spVisToggleButton.style.backgroundColor = "var(--button-active)"
        spVisToggleButton.style.color = "var(--button-text)"
    } else {
        spViewerHolder.style.display = "none"
        spVisToggleButton.style.backgroundColor = "var(--button-toggle-off)"
        spVisToggleButton.style.color = "var(--button-toggle-off-text)"
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
    showingQuestionOutline = !showingQuestionOutline

    if (showingQuestionOutline) {
        questionSelectionPanel.innerHTML = ""
        // load question navigation
        for(let question in questionsQP){
            (function(question) {
                //create subject button
                var button = document.createElement("button");
                var questionDislay = document.createElement("span")
                var articleDisplay = document.createElement("span")
                var pageDisplayQP = document.createElement("span")
                var pageDisplayMI = document.createElement("span")
                
                questionDislay.style.width = "30px"
                questionDislay.style.display = "inline-block"
                questionDislay.style.fontWeight = "bold"
                articleDisplay.style.fontWeight = "bold"
                pageDisplayQP.style.float = "right"
                pageDisplayQP.style.width = "70px"
                pageDisplayQP.style.display = "inline-block"
                pageDisplayMI.style.float = "right"
                pageDisplayMI.style.width = "70px"
                pageDisplayMI.style.display = "inline-block"

                pageDisplayQP.innerHTML = "QP: " + questionsQP[question][0]
                if (questionsQP[question].length > 1){
                    pageDisplayQP.innerHTML += "-" + questionsQP[question].at(-1)
                }

                if (questionsMI[question] != undefined){
                    pageDisplayMI.innerHTML = " MI: " + questionsMI[question][0]
                    if (questionsMI[question].length > 1){
                        pageDisplayMI.innerHTML += "-" + questionsMI[question].at(-1)
                    }
                } else {
                    pageDisplayMI.innerHTML += "MI: N/A"
                }
    
                if (extractArticle(question) == "a"){
                    questionDislay.innerHTML = extractNumber(question) + "."
                    articleDisplay.innerHTML = "(" +  extractArticle(question) + ")"
                } else if (extractArticle(question) == question){
                    questionDislay.innerHTML = extractNumber(question) + "."
                } else {
                    articleDisplay.innerHTML = "(" +  extractArticle(question) + ")"
                }
    
                button.appendChild(questionDislay)
                button.appendChild(articleDisplay)
                button.appendChild(pageDisplayMI)
                button.appendChild(pageDisplayQP)
    
                //button.innerHTML = questionDisplayString
                button.setAttribute("id", question);
                button.style.display = "block"
                // attach subject button functionality & append
                button.addEventListener("click", function() {
                    questionClickHandler(question);
                });
                questionSelectionPanel.appendChild(button);
            })(question);
        }

        qNavButton.innerHTML = "Hide<br>Questions Outline"
        questionSelectionPanelHolder.style.display = "block"
    } else {
        qNavButton.innerHTML = "Show<br>Questions Outline"
        questionSelectionPanelHolder.style.display = "none"
    }
})

function convertString(str) {
    // Use a regular expression to capture the numeric and alphabetic parts
    const match = str.match(/^(\d+)([a-zA-Z])$/);
    if (match) {
        const number = match[1];
        const letter = match[2];
        // Format the string as "number. (letter)"
        return `${number}. (${letter})`;
    }
    return str; // Return the original string if it doesn't match the pattern
}

function extractArticle(str) {
    // Use a regular expression to capture the numeric and alphabetic parts
    const match = str.match(/^(\d+)([a-zA-Z])$/);
    if (match) {
        const letter = match[2];
        // Format the string as "number. (letter)"
        return `${letter}`;
    }
    return str; // Return the original string if it doesn't match the pattern
}

function extractNumber(str) {
    // Use a regular expression to find the numeric part
    const match = str.match(/\d+/);
    if (match) {
        return parseInt(match[0], 10); // Convert the matched string to an integer
    }
    return null; // Return null if no number is found
}

function questionClickHandler(question) {
    currentQP.currentPage = questionsQP[question][0]
    if (questionsMI[question] != undefined){
        currentMI.currentPage = questionsMI[question][0]
    }
    if (questionsSP[question] != undefined){
        currentSP.currentPage = questionsSP[question][0]
    }

    renderCurrentPage(currentQP, qpViewer);
    renderCurrentPage(currentMI, miViewer);
    if (currentSP.file != null) {
        renderCurrentPage(currentSP, spViewer);
    }
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