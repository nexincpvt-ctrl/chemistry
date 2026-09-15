/* ============================================================
   NEXINC — AUTH LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const formTitle = document.getElementById('formTitle');
    const formSub = document.getElementById('formSub');
    const nameGroup = document.getElementById('nameGroup');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passInput = document.getElementById('passInput');
    const submitBtn = document.getElementById('submitBtn');
    const switchText = document.getElementById('switchText');
    const switchBtn = document.getElementById('switchBtn');
    const authForm = document.getElementById('authForm');
    
    let isLogin = true;

    // Toggle between Login and Sign Up
    switchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        
        if (isLogin) {
            formTitle.innerHTML = 'Welcome Back';
            formSub.innerHTML = 'SIGN IN TO CONTINUE';
            nameGroup.style.display = 'none';
            nameGroup.style.opacity = '0';
            nameInput.removeAttribute('required');
            submitBtn.innerHTML = 'SIGN IN <i data-lucide="arrow-right"></i>';
            switchText.innerHTML = "Don't have an account?";
            switchBtn.innerHTML = 'SIGN UP';
        } else {
            formTitle.innerHTML = 'Create Account';
            formSub.innerHTML = 'JOIN THE CHEMISTRY BENCH';
            nameGroup.style.display = 'block';
            setTimeout(() => nameGroup.style.opacity = '1', 10);
            nameInput.setAttribute('required', 'true');
            submitBtn.innerHTML = 'SIGN UP <i data-lucide="arrow-right"></i>';
            switchText.innerHTML = 'Already have an account?';
            switchBtn.innerHTML = 'SIGN IN';
        }
        
        if (window.lucide) {
            lucide.createIcons();
        }
    });

    // Handle Form Submission
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'PLEASE WAIT...';
        submitBtn.disabled = true;

        const email = emailInput.value;
        const password = passInput.value;
        const name = nameInput.value;

        try {
            const endpoint = isLogin ? '/api/login' : '/api/signup';
            const body = isLogin ? { email, password } : { name, email, password };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Something went wrong');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            // Save token to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Trigger Loading Screen
            document.getElementById('loadingOverlay').classList.add('active');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2700);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to server');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Initialize Google Sign-In
    window.onload = function () {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: '428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com',
                callback: handleGoogleLogin
            });
            google.accounts.id.renderButton(
                document.getElementById('googleButtonContainer'),
                { theme: 'outline', size: 'large', width: 340, shape: 'rectangular', logo_alignment: 'center' }
            );
        }
    };

    async function handleGoogleLogin(response) {
        try {
            const res = await fetch('/api/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.credential })
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                alert(data.error || 'Google login failed');
                return;
            }
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Trigger Loading Screen
            document.getElementById('loadingOverlay').classList.add('active');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2700);
        } catch (error) {
            console.error('Google login error:', error);
            alert('Failed to connect to server for Google Login');
        }
    }
});
