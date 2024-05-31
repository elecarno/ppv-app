let selectedSubject = ""
let selectedLevel = ""

let customQPURL = ""
let customMIURL = ""
let customSPURL = ""

// create subject selection buttons
function loadSubjects() {
    subjectSelection.innerHTML = ""

    // loop through all subjects
    for(let subject in sqaFiles){
        (function(subject) {
        // create subject button
        var button = document.createElement("button");
        button.innerHTML = subjectNames[subject] + "<br>" + countSubjectPapers(sqaFiles[subject]); // paper count display
        button.setAttribute("id", subject);
        button.style.display = "block"
        // attach subject button functionality & append
        button.addEventListener("click", function() {
            subjectClickHandler(subject);
        });
        subjectSelection.appendChild(button);
        })(subject);
    }

    window.scrollTo({top: 0})
}

// create level selection for pressed subject
function subjectClickHandler(subject) {
    selectedSubject = subject
    levelLabel.innerHTML = "<span class=\"notbold\">Select Level for</span><br>" + subjectNames[subject]

    // switch to level selection 'page'
    subjectCustomContainer.style.display = "none"
    levelSelection.style.display = "block"

    // hide all level buttons (reset 'page')
    n5Button.style.display = "none"
    nhButton.style.display = "none"
    ahButton.style.display = "none"

    // check if level exists, create button if it does
    if (sqaFiles[subject]["n5"] != undefined){
        n5Button.style.display = "block"
        n5Button.innerHTML = "National 5" + "<br>" + countLevelPapers(sqaFiles[selectedSubject]["n5"]); // paper count
        n5Button.addEventListener("click", function() {
            levelClickHandler(subject, "n5");
        });
    }
    if (sqaFiles[subject]["nh"] != undefined){
        nhButton.style.display = "block"
        nhButton.innerHTML = "Higher" + "<br>" + countLevelPapers(sqaFiles[selectedSubject]["nh"]); // paper count
        nhButton.addEventListener("click", function() {
            levelClickHandler(subject, "nh");
        });
    }
    if (sqaFiles[subject]["ah"] != undefined){
        ahButton.style.display = "block"
        ahButton.innerHTML = "Advanced Higher" + "<br>" + countLevelPapers(sqaFiles[selectedSubject]["ah"]); // paper count
        ahButton.addEventListener("click", function() {
            levelClickHandler(subject, "ah");
        });
    }

    window.scrollTo({top: 0})
}

// create year selection for pressed level
function levelClickHandler(subject, level) {
    selectedLevel = level
    yearPaperLabel.innerHTML = "<span class=\"notbold\">Select Year & Paper for</span><br>" + levelNames[selectedLevel] + " " + subjectNames[selectedSubject];

    // switch to year selection 'page'
    levelSelection.style.display = "none";
    document.getElementById("year-paper-container").style.display = "block"

    // remove all year buttons (reset 'page')
    yearSelection.innerHTML = ""

    // create back button (needs to be done in code because 'page' was just cleared)
    var BackButton = document.createElement("button")
    BackButton.setAttribute("id", "year-back-button");
    BackButton.style.border = "none"
    BackButton.style.borderBottom = "solid 5px white"
    BackButton.style.height = "40px"
    BackButton.style.backgroundColor = "grey"
    BackButton.innerHTML = "Back to Levels"
    BackButton.addEventListener("click", function() {
        yearBackButton()
    })
    yearSelection.append(BackButton)

    // remove pressed class from all buttons initially
    var buttons = yearSelection.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("pressed");
    }

    // loop through years in selected level for selected subject
    for (var year in sqaFiles[subject][level]) {
        (function(year) {
            // create year button
            var button = document.createElement("button");
            button.innerHTML = year + "<br>" + countYearPapers(sqaFiles[selectedSubject][selectedLevel][year]); // paper count
            button.setAttribute("id", year);
            button.style.display = "block";
            // add year button functionality & append
            button.addEventListener("click", function() {
                // toggle pressed class for all buttons (selection display)
                var buttons = yearSelection.getElementsByTagName("button");
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].style.borderRight = "1px solid #25259c"
                }
                button.style.borderRight = "10px solid #1e1e7b"

                // call yearClickHandler function
                yearClickHandler(subject, level, year);
            });
            yearSelection.appendChild(button);
        })(year);
    }

    window.scrollTo({top: 0})
}

// add functionality to "Back to Subjects" button on level selection 'page 
document.getElementById("level-back-button").addEventListener("click", () => {
    subjectCustomContainer.style.display = "flex"
    levelSelection.style.display = "none"

    window.scrollTo({top: 0})
})

// create paper buttons for selected year
function yearClickHandler(subject, level, year) {
    // remove all paper buttons (reset 'page')
    paperSelection.innerHTML = ""

    // create year header for papers
    var header = document.createElement("h3")
    header.innerHTML = year + " Papers"
    paperSelection.append(header)

    // loop through papers within selected year of selected level of selected subject
    for (paper in sqaFiles[subject][level][year]){
        (function(paper) {
            // create data for paper
            let paperData = sqaFiles[subject][level][year][paper]
            let paperName = paperData["name"]
            var paperTypeIndex = paperName.lastIndexOf("_");
            var paperType = paperName.substring(paperTypeIndex + 1);
            // create full display name
            var paperFullname = levelNames[level] + " " + subjectNames[subject] + " " + year + " - " + paperNames[paperType]

            // create paper button
            var button = document.createElement("button");
            button.innerHTML = paperNames[paperType];
            button.setAttribute("id", paperNames[paperType]);
            button.style.display = "block"
            // add paper button functionality & append
            button.addEventListener("click", function() {
                // check if paper has supplementary sheet
                if (paperData["sp"] != undefined){
                    // if yes, input path for supplementary sheet
                    paperClickHandler(paperData["path"], paperData["mi"]["path"], paperData["sp"]["path"], paperFullname, subject);
                } else {
                    // if no, semd path for supplementary sheet as `undefined`
                    paperClickHandler(paperData["path"], paperData["mi"]["path"], "undefined", paperFullname, subject);
                }
            });
            paperSelection.appendChild(button);
        })(paper);
    }

    window.scrollTo({top: 0})
}

// add functionality to "Back to Levels" button
function yearBackButton(){
    levelSelection.style.display = "block";
    document.getElementById("year-paper-container").style.display = "none"
    paperSelection.innerHTML = ""

    window.scrollTo({top: 0})
}

// load PDFs from pressed paper and open viewer
function paperClickHandler(qpPath, miPath, spPath, paperFullname, subject) {
    console.log(paperFullname + "\nqp: " + qpPath + "\nmi: " + miPath + "\nsp: " + spPath)
    loadPDF(qpPath, "qp", subject)
    loadPDF(miPath, "mi", subject)
    // check for supplementary sheet
    if (spPath != undefined){
        loadPDF(spPath, "sp", subject)
    }

    paperLabel.innerHTML = paperFullname

    // switch to viewer 'page'
    menuUI.style.display = "none"
    viewerUI.style.display = "block"

    showingQuestionOutline = false
    qNavButton.innerHTML = "Show<br>Questions Outline"
    questionSelectionPanelHolder.style.display = "none"
    
    window.scrollTo({top: 0})
}

// load custom PDFs
function getCustomQP(event) {
    const inputQP = event.target.files[0];

    const readerQP = new FileReader();
    readerQP.readAsDataURL(inputQP);
    readerQP.onload = () => {
        customQPURL = readerQP.result
    };
}

function getCustomMI(event) {
    const inputMI = event.target.files[0];

    const readerMI = new FileReader();
    readerMI.readAsDataURL(inputMI);
    readerMI.onload = () => {
        customMIURL = readerMI.result
    };
}

function getCustomSP(event) {
    const inputSP = event.target.files[0];

    const readerSP = new FileReader();
    readerSP.readAsDataURL(inputSP);
    readerSP.onload = () => {
        customSPURL = readerSP.result
    };
}

// switch to viewer 'page' when "View PDFs" button pressed
loadCustomPDFs.addEventListener("click", () => {
    if (customQPURL != ""){
        loadPDF(customQPURL, "qp");
    }
    if (customMIURL != ""){
        loadPDF(customMIURL, "mi");
    }
    if (customSPURL != ""){
        loadPDF(customSPURL, "sp");
    }

    menuUI.style.display = "none"
    viewerUI.style.display = "block"
})

// footer buttons
function ShowLicense() {
    document.getElementById("license-ui").style.display = "block"
    document.getElementById("patchnotes-ui").style.display = "none"

    menuUI.style.display = "none"
    viewerUI.style.display = "none"
}

function ShowPatchNotes() {
    document.getElementById("patchnotes-ui").style.display = "block"
    document.getElementById("license-ui").style.display = "none"

    menuUI.style.display = "none"
    viewerUI.style.display = "none"
}

function ShowHomepage() {
    document.getElementById("patchnotes-ui").style.display = "none"
    document.getElementById("license-ui").style.display = "none"

    menuUI.style.display = "block"
    viewerUI.style.display = "none"
}

// paper counting functions
function countSubjectPapers(subject){
    let count = 0
    for (level in subject){
        for (year in subject[level]) {
            if (subject[level][year] != []){
                count += subject[level][year].length
            }
        }
    }

    return " • " + count
}

function countLevelPapers(level) {
    let count = 0
    for (year in level) {
        if (level[year] != []){
            count += level[year].length
        }
    }

    return " • " + count
}

function countYearPapers(year) {
    let count = 0
    count += year.length
    return " • " + count
}

// Select all elements with the class 'custom-file-upload'
document.querySelectorAll('.custom-file-upload').forEach(function(label) {
    // Find the input element within the label
    const fileInput = label.nextElementSibling;

    // Find the span element with the class 'file-name' within the label
    const fileNameSpan = label.querySelector('.file-name');

    // Attach the change event listener to the input element
    fileInput.addEventListener('change', function() {
        // Set the text content of the span element to the selected file name
        fileNameSpan.innerHTML = "(" + this.files[0].name + ")"
    });
});


// initialse page
loadSubjects()