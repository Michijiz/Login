function showCustomAlert(message, onClose) {
    const modal = document.getElementById('customAlert');
    const msg = document.getElementById('alertMessage');
    const closeBtn = document.getElementById('closeAlert');
    msg.textContent = message;
    modal.style.display = 'flex';
    closeBtn.focus();

    function closeModal() {
        modal.style.display = 'none';
        closeBtn.removeEventListener('click', closeModal);
        window.removeEventListener('click', outsideClick);
        window.removeEventListener('keydown', escClose);
        if (onClose) onClose();
    }

    function outsideClick(event) {
        if (event.target === modal) closeModal();
    }

    function escClose(event) {
        if (event.key === 'Escape') closeModal();
    }

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);
    window.addEventListener('keydown', escClose);
}

document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.querySelector('.submit');
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const passwordInput = document.querySelector('input[placeholder="Password"]');
    const form = document.querySelector('.container');

    function handleLogin(e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            showCustomAlert('Please enter both username and password.', () => usernameInput.focus());
            return;
        }

        const demoUser = 'user';
        const demoPass = 'password123';

        if (username === demoUser && password === demoPass) {
            showCustomAlert('Login successful!');
            // Redirect or perform further actions here
        } else {
            showCustomAlert('Invalid username or password.', () => {
                passwordInput.value = '';
                passwordInput.focus();
            });
        }
    }

    loginBtn.addEventListener('click', handleLogin);

    // Allow Enter key to submit
    form.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    });
});