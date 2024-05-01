let selectedSubject = ""
let selectedLevel = ""

let customQPURL = ""
let customMIURL = ""

function loadSubjects() {
    for(let subject in sqaFiles){
        var button = document.createElement("button");
        button.innerHTML = subjectNames[subject];
        button.setAttribute("id", subject);
        button.style.display = "block"
        button.addEventListener("click", function() {
            subjectClickHandler(subject);
        });
        subjectSelection.appendChild(button);
    }
}

function subjectClickHandler(subject) {
    selectedSubject = subject
    stepLabel.innerHTML = "Select Level for " + subjectNames[subject]
    subjectCustomConatiner.style.display = "none"
    levelSelection.style.display = "block"

    if (sqaFiles[subject]["n5"] != undefined){
        n5Button.style.display = "block"
        n5Button.addEventListener("click", function() {
            levelClickHandler(subject, "n5");
        });
    }
    if (sqaFiles[subject]["nh"] != undefined){
        nhButton.style.display = "block"
        nhButton.addEventListener("click", function() {
            levelClickHandler(subject, "nh");
        });
    }
    if (sqaFiles[subject]["ah"] != undefined){
        ahButton.style.display = "block"
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
            button.innerHTML = year;
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

loadSubjects()

//loadPDF("sqa_pdfs/NH_Spanish_Reading_2023.pdf", "qp")
//loadPDF("sqa_pdfs/mi_NH_Spanish_Reading_2023.pdf", "mi")

//loadPDF("sqa_pdfs/NH_Chemistry_Paper2_2022.pdf", "qp")
//loadPDF("sqa_pdfs/mi_NH_Chemistry_Paper-2_2022.pdf", "mi")

// loadPDF("./sqa_pdfs\\graphcomm\\higher\\2023\\graphcomm_nh_2023_qp.pdf", "qp")
// loadPDF("./sqa_pdfs\\graphcomm\\higher\\2023\\graphcomm_nh_2023_qp_mi.pdf", "mi")
