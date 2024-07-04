let activated = false;
let register = "Lochgilphead Joint Campus"

document.getElementById("check-license-button").addEventListener('click', () => {
    if (validKeys.includes(keyInput.value)) {
        keyUI.style.display = "none";
        menuUI.style.display = "block";
        activated = true;
        // Save the activated state to localStorage
        localStorage.setItem('activated', 'true');
        loadSubjects();
        loadSqaFiles();
        document.getElementById("register-label").textContent = "Registered with " + register;
    } else {
        activationStatus.textContent = "Invalid Key";
    }
});
