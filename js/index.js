let selectedSubject = ""
let selectedLevel = ""

let customQPURL = ""
let customMIURL = ""

function loadSubjects() {
    for(let subject in sqaFiles){
        (function(subject) {
        var button = document.createElement("button");
        button.innerHTML = subjectNames[subject] + "<br>" + countSubjectPapers(sqaFiles[subject]);
        button.setAttribute("id", subject);
        button.style.display = "block"
        button.addEventListener("click", function() {
            subjectClickHandler(subject);
        });
        subjectSelection.appendChild(button);
        })(subject);
    }
}

function subjectClickHandler(subject) {
    selectedSubject = subject
    stepLabel.innerHTML = "Select Level for " + subjectNames[subject]
    subjectCustomConatiner.style.display = "none"
    levelSelection.style.display = "block"

    if (sqaFiles[subject]["n5"] != undefined){
        n5Button.style.display = "block"
        n5Button.innerHTML = "National 5" + "<br>" + countLevelPapers(sqaFiles[selectedSubject]["n5"]);
        n5Button.addEventListener("click", function() {
            levelClickHandler(subject, "n5");
        });
    }
    if (sqaFiles[subject]["nh"] != undefined){
        nhButton.style.display = "block"
        nhButton.innerHTML = "Higher" + "<br>" + countLevelPapers(sqaFiles[selectedSubject]["nh"]);
        nhButton.addEventListener("click", function() {
            levelClickHandler(subject, "nh");
        });
    }
    if (sqaFiles[subject]["ah"] != undefined){
        ahButton.style.display = "block"
        ahButton.innerHTML = "Advanced Higher" + "<br>" + countLevelPapers(sqaFiles[selectedSubject]["ah"]);
        ahButton.addEventListener("click", function() {
            levelClickHandler(subject, "ah");
        });
    }
}

function levelClickHandler(subject, level) {
    selectedLevel = level
    levelSelection.style.display = "none";
    document.getElementById("year-paper-container").style.display = "block"
    stepLabel.innerHTML = "Select Year & Paper for " + levelNames[selectedLevel] + " " + subjectNames[selectedSubject];

    yearSelection.innerHTML = ""

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

    // Remove the pressed class from all buttons initially
    var buttons = yearSelection.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("pressed");
    }

    for (var year in sqaFiles[subject][level]) {
        (function(year) {
            var button = document.createElement("button");
            button.innerHTML = year + "<br>" + countYearPapers(sqaFiles[selectedSubject][selectedLevel][year]);
            button.setAttribute("id", year);
            button.style.display = "block";
            button.addEventListener("click", function() {
                // Toggle the pressed class for all buttons
                var buttons = yearSelection.getElementsByTagName("button");
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].style.borderRight = "1px solid #25259c"
                }
                button.style.borderRight = "10px solid #1e1e7b"

                // Call the yearClickHandler function
                yearClickHandler(subject, level, year);
            });
            yearSelection.appendChild(button);
        })(year);
    }
}

document.getElementById("level-back-button").addEventListener("click", () => {
    subjectCustomConatiner.style.display = "block"
    levelSelection.style.display = "none"
})

function yearClickHandler(subject, level, year) {
    //console.log(subject, level, year)

    paperSelection.innerHTML = ""

    var header = document.createElement("h3")
    header.innerHTML = year + " Papers"
    paperSelection.append(header)

    for (paper in sqaFiles[subject][level][year]){
        (function(paper) {
            let paperData = sqaFiles[subject][level][year][paper]
            let paperName = paperData["name"]
            var paperTypeIndex = paperName.lastIndexOf("_");
            var paperType = paperName.substring(paperTypeIndex + 1);

            var paperFullname = levelNames[level] + " " + subjectNames[subject] + " " + year + " - " + paperNames[paperType]

            var button = document.createElement("button");
            button.innerHTML = paperNames[paperType];
            button.setAttribute("id", paperNames[paperType]);
            button.style.display = "block"
            button.addEventListener("click", function() {
                paperClickHandler(paperData["path"], paperData["mi"]["path"], paperFullname);
            });
            paperSelection.appendChild(button);
        })(paper);
    }
}

function yearBackButton(){
    levelSelection.style.display = "block";
    document.getElementById("year-paper-container").style.display = "none"
    paperSelection.innerHTML = ""
}

function paperClickHandler(qpPath, miPath, paperFullname) {
    console.log(qpPath, miPath, paperFullname)
    loadPDF(qpPath, "qp")
    loadPDF(miPath, "mi")
    menuUI.style.display = "none"
    viewerUI.style.display = "block"
}

document.getElementById("viewer-back-button").addEventListener("click", () => {
    menuUI.style.display = "block"
    viewerUI.style.display = "none"
})

function getCustomQP(event) {
    const inputQP = event.target.files[0];
    const inputMI = event.target.files[1];

    const readerQP = new FileReader();
    readerQP.readAsDataURL(inputQP);
    readerQP.onload = () => {
        loadPDF(readerQP.result, "qp");
    };

    const readerMI = new FileReader();
    readerMI.readAsDataURL(inputMI);
    readerMI.onload = () => {
        loadPDF(readerMI.result, "mi");
    };
}

loadCustomPDFs.addEventListener("click", () => {
    menuUI.style.display = "none"
    viewerUI.style.display = "block"
})

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

loadSubjects()