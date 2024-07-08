// localStorage.removeItem("activated") //for testing
// localStorage.removeItem("trialStartDate") //for testing

let activated = false;
let register = "Lochgilphead Joint Campus";
const trialPeriodDays = 14;

// Function to format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to calculate the difference in days between two dates
function dateDifferenceInDays(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((date2 - date1) / oneDay);
}

// Function to load initial state from localStorage
function loadInitialState() {
    const savedActivatedState = localStorage.getItem('activated');
    const savedExpirationDate = localStorage.getItem('expirationDate');
    const trialStartDateStr = localStorage.getItem('trialStartDate');

    if (savedActivatedState === 'true' && savedExpirationDate) {
        const expirationDate = new Date(savedExpirationDate);
        const currentDate = new Date();

        if (currentDate <= expirationDate) {
            activated = true;
            keyUI.style.display = "none";
            menuUI.style.display = "block";
            document.getElementById("register-label").textContent = `Registered with ${register}, expires on ${formatDate(expirationDate)}`;
            loadSubjects();
            loadSqaFiles();
            return;
        } else {
            // Expired key, clear the storage
            localStorage.removeItem('activated');
            localStorage.removeItem('expirationDate');
        }
    }

    if (trialStartDateStr) {
        const trialStartDate = new Date(trialStartDateStr);
        const currentDate = new Date();
        const daysSinceTrialStart = dateDifferenceInDays(trialStartDate, currentDate);

        if (daysSinceTrialStart <= trialPeriodDays) {
            activated = true;
            keyUI.style.display = "none";
            menuUI.style.display = "block";
            document.getElementById("register-label").textContent = `Trial active, expires on ${formatDate(new Date(trialStartDate.getTime() + trialPeriodDays * 24 * 60 * 60 * 1000))}`;
            loadSubjects();
            loadSqaFiles();
            return;
        } else {
            localStorage.removeItem('trialStartDate');
            activationStatus.textContent = "Trial expired. Please enter a valid key.";
        }
    } else {
        document.getElementById("check-license-button").textContent = "Start Trial Period";
    }

    keyUI.style.display = "block";
    menuUI.style.display = "none";
}

// Call the function to load the initial state
loadInitialState();

document.getElementById("check-license-button").addEventListener('click', () => {
    const key = keyInput.value;
    const expirationDateStr = validKeys[key];

    if (expirationDateStr) {
        const expirationDate = new Date(expirationDateStr);
        const currentDate = new Date();

        if (currentDate <= expirationDate) {
            keyUI.style.display = "none";
            menuUI.style.display = "block";
            activated = true;
            // Save the activated state and expiration date to localStorage
            localStorage.setItem('activated', 'true');
            localStorage.setItem('expirationDate', expirationDateStr);
            document.getElementById("register-label").textContent = `Registered with ${register}, expires on ${formatDate(expirationDate)}`;
            loadSubjects();
            loadSqaFiles();
            return;
        } else {
            activationStatus.textContent = "Key Expired";
            return;
        }
    } else if (!localStorage.getItem('trialStartDate')) {
        activated = true;
        const trialStartDate = new Date();
        localStorage.setItem('trialStartDate', trialStartDate.toISOString());
        keyUI.style.display = "none";
        menuUI.style.display = "block";
        document.getElementById("register-label").textContent = `Trial active, expires on ${formatDate(new Date(trialStartDate.getTime() + trialPeriodDays * 24 * 60 * 60 * 1000))}`;
        loadSubjects();
        loadSqaFiles();
    } else {
        activationStatus.textContent = "Invalid Key";
    }
});
