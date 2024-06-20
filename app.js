document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const historyLink = document.getElementById('history-link');
    const logoutLink = document.getElementById('logout-link');
    const authSection = document.getElementById('auth-section');
    const chatSection = document.getElementById('chat-section');
    const historySection = document.getElementById('history-section');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const chatBox = document.getElementById('chat-box');
    const essayInput = document.getElementById('essay-input');
    const submitEssayButton = document.getElementById('submit-essay');
    const historyList = document.getElementById('history-list');

    let isAuthenticated = false;

    function toggleSections() {
        authSection.style.display = isAuthenticated ? 'none' : 'block';
        chatSection.style.display = isAuthenticated ? 'block' : 'none';
        historySection.style.display = 'none';
        logoutLink.style.display = isAuthenticated ? 'inline' : 'none';
        loginLink.style.display = isAuthenticated ? 'none' : 'inline';
        registerLink.style.display = isAuthenticated ? 'none' : 'inline';
        historyLink.style.display = isAuthenticated ? 'inline' : 'none';
    }

    loginLink.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    registerLink.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    historyLink.addEventListener('click', () => {
        authSection.style.display = 'none';
        chatSection.style.display = 'none';
        historySection.style.display = 'block';
        loadHistory();
    });

    logoutLink.addEventListener('click', () => {
        isAuthenticated = false;
        toggleSections();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simplified for prototype: direct authentication
        isAuthenticated = true;
        toggleSections();
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simplified for prototype: direct registration
        isAuthenticated = true;
        toggleSections();
    });

    submitEssayButton.addEventListener('click', () => {
        const essay = essayInput.value;
        if (essay.trim()) {
            chatBox.innerHTML += `<div class="user-message"><strong>You:</strong> ${essay}</div>`;
            essayInput.value = '';
            // Simulate a response from the server
            setTimeout(() => {
                chatBox.innerHTML += `<div class="bot-message"><strong>Bot:</strong> Your essay has been graded.</div>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1000);
        }
    });

    function loadHistory() {
        // Simulate fetching history
        historyList.innerHTML = '<div class="history-entry"><p><strong>Essay:</strong> Example essay</p><p><strong>Grade:</strong> B+</p></div>';
    }

    toggleSections();
});
