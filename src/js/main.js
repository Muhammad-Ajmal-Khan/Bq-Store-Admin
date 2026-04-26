import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
        
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login Successful!');
            window.location.href = 'dashboard.html';
        } catch (error) {
            errorMessage.textContent = "Invalid email or password.";
            errorMessage.classList.remove('hidden');
        }
    });
}