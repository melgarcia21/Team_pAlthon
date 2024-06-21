document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const submitEssay = document.getElementById('submit-essay');
    const historyList = document.getElementById('history-list');
    const loginForm = document.getElementById('login-form');
    const loginLink = document.getElementById('loginLink');
    const getStartedButton = document.getElementById('get-started');

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Navigate to Essay Grading on Get Started button click
    getStartedButton.addEventListener('click', () => {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('essay-grading').classList.add('active');
    });

    // Essay submission
    submitEssay.addEventListener('click', async () => {
        const essay = userInput.value.trim();
        if (essay) {
            addMessage('user', essay);
            await gradeEssay(essay);
            userInput.value = '';
        }
    });

    // Function to call OpenAI API
    async function callOpenAIAPI(essay) {
        // Put your API Key here        const apiKey = '';
        const response = await fetch('https://api.openai.com/v1/engines/gpt-4/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                prompt: `Please grade the following IELTS essay and provide feedback:\n\n${essay}\n\nGrade and Feedback:`,
                max_tokens: 150
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    }

    // Function to grade essay
    async function gradeEssay(essay) {
        addMessage('bot', "Grading your essay...");
        try {
            const feedback = await callOpenAIAPI(essay);
            addMessage('bot', feedback);
            const historyItem = document.createElement('li');
            historyItem.textContent = `Essay submitted on ${new Date().toLocaleString()}`;
            historyList.appendChild(historyItem);
        } catch (error) {
            addMessage('bot', "An error occurred while grading your essay. Please try again.");
        }
    }

    // Add message to chat
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        const iconElement = document.createElement('div');
        iconElement.classList.add('icon');
        iconElement.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.textContent = message;
        
        messageElement.appendChild(iconElement);
        messageElement.appendChild(contentElement);
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Login form submission (non-functional for prototype)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log(`Login attempted with username: ${username} and password: ${password}`);
        alert('Login functionality is not implemented in this prototype.');
    });

    // Toggle login/logout
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginLink.textContent === 'Login') {
            loginLink.textContent = 'Logout';
            alert('You are now logged in (simulated).');
        } else {
            loginLink.textContent = 'Login';
            alert('You are now logged out (simulated).');
        }
    });
});
