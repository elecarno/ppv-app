This project uses Feather Icons (https://feathericons.com/)

Notice: This project contains test files taken from the SQA website. I do not own the copyrights to these files.

**Known Bugs:**
- Moving between questions sometimes requires two clicks of the 'previous' or 'next' buttons.
- The "previous" button in the question based navigation is often unreliable and will potentially break the navigation system.
- Moving between questions will sometimes not reach the final page of the paper.
- Modern Languages Reading Papers do not navigation through questions properly.
- Physics, Biology, and Chemistry Mulitple Choice Papers do not work with question navigation.

**To-do:**
- Add audio player for listening papers
- Subject based "package drap & drop" system (package subjects individually and allow them to be dragged into the application)

Plan:
- Use electron.js based local storage to store copy of uploaded package zip
- keep reference to this zip for each course ("sqaData" variable?)
- when paper is being loaded -> load the zip corresponding to the course and use the path of the paper  in `sqaFiles` to load the correct paper