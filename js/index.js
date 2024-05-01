let selectedSubject

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
    stepLabel.innerHTML = "Select Level"
    subjectSelection.style.display = "none"
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
    levelSelection.style.display = "none";
    stepLabel.innerHTML = "Select Year & Paper";

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

function yearClickHandler(subject, level, year) {
    //console.log(subject, level, year)

    paperSelection.innerHTML = ""

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

function paperClickHandler(qpPath, miPath, paperFullname) {
    console.log(qpPath, miPath, paperFullname)
    loadPDF(qpPath, "qp")
    loadPDF(miPath, "mi")
    menuUI.style.display = "none"
    viewerUI.style.display = "block"
}

loadSubjects()

//loadPDF("sqa_pdfs/NH_Spanish_Reading_2023.pdf", "qp")
//loadPDF("sqa_pdfs/mi_NH_Spanish_Reading_2023.pdf", "mi")

//loadPDF("sqa_pdfs/NH_Chemistry_Paper2_2022.pdf", "qp")
//loadPDF("sqa_pdfs/mi_NH_Chemistry_Paper-2_2022.pdf", "mi")

// loadPDF("./sqa_pdfs\\graphcomm\\higher\\2023\\graphcomm_nh_2023_qp.pdf", "qp")
// loadPDF("./sqa_pdfs\\graphcomm\\higher\\2023\\graphcomm_nh_2023_qp_mi.pdf", "mi")
