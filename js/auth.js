
function showToast(message) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'custom-toast';
        toast.className = 'toast';
        toast.innerHTML = `<div class="toast-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div><span class="toast-msg"></span>`;
        document.body.appendChild(toast);
    }
    toast.querySelector('.toast-msg').textContent = message;
    
    // Reset animation if already showing
    toast.classList.remove('show');
    void toast.offsetWidth; // trigger reflow
    toast.classList.add('show');
    
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ============================================================
   NEXINC — AUTH LOGIC
   ============================================================ */

// Global scope - needed for Google SDK onload callback
function handleGoogleLoginGlobal(response) {
  window._pendingGoogleResponse = response;
  const event = new CustomEvent('google-login', { detail: response });
  window.dispatchEvent(event);
}

function _doRenderGoogle() {
  const btn = document.getElementById('googleButtonContainer');
  const fallback = document.getElementById('googleFallbackBtn');
  if (!btn) return;

  if (window.google) {
    try {
      google.accounts.id.initialize({
        client_id: '428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com',
        callback: handleGoogleLoginGlobal
      });
      google.accounts.id.renderButton(btn, {
        theme: 'outline', size: 'large', width: 340,
        shape: 'pill', logo_alignment: 'center'
      });
      // Check if SDK actually rendered something
      setTimeout(() => {
        if (btn.children.length === 0 && fallback) {
          fallback.style.display = 'flex';
        }
      }, 1000);
    } catch(e) {
      // SDK error - show fallback
      if (fallback) fallback.style.display = 'flex';
    }
  } else {
    // No Google SDK - show fallback
    if (fallback) fallback.style.display = 'flex';
  }
}

// Called by fallback button
function triggerGoogleLogin() {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One Tap blocked - show a message
        if (typeof showToast === 'function') {
          showToast('Please allow pop-ups for Google Sign-In or use email login.');
        }
      }
    });
  } else {
    if (typeof showToast === 'function') {
      showToast('Google Sign-In not available. Please add your Vercel domain to Google Cloud Console.');
    }
  }
}

// Called by Google SDK ?onload= param - DOM may not be ready yet
window.initGoogle = function () {
  const init = () => {
    const panel = document.querySelector('.auth-panel');
    if (panel) {
      let animated = false;
      const render = () => {
        if (!animated) {
          animated = true;
          _doRenderGoogle();
        }
      };
      panel.addEventListener('animationend', render);
      // Fallback timeout in case animation already finished or fails
      setTimeout(render, 850); 
    } else {
      _doRenderGoogle();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};


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

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('JSON Parse Error:', jsonError);
                showToast(`Server Error: Invalid response (HTTP ${response.status}). Is backend running?`);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            if (!response.ok) {
                showToast(data.error || 'Something went wrong');
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
            showToast('Failed to connect to server');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Initialize Google Sign-In - call in case SDK already loaded before this
    if (window.google) {
        window.initGoogle();
    }

    // Guaranteed fallback: if Google button not rendered in 2 seconds, show our custom button
    setTimeout(() => {
        const container = document.getElementById('googleButtonContainer');
        const fallback = document.getElementById('googleFallbackBtn');
        if (container && fallback && container.children.length === 0) {
            fallback.style.display = 'flex';
        }
    }, 2000);

    // Listen for Google login events dispatched by global handler
    window.addEventListener('google-login', async (e) => {
        await handleGoogleLogin(e.detail);
    });

    // Also handle any pending response from before DOMContentLoaded
    if (window._pendingGoogleResponse) {
        handleGoogleLogin(window._pendingGoogleResponse);
        window._pendingGoogleResponse = null;
    }

    async function handleGoogleLogin(responseObj) {
        try {
            const response = await fetch('/api/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: responseObj.credential })
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('JSON Parse Error:', jsonError);
                showToast(`Google Auth Server Error (HTTP ${response.status}). Is backend running?`);
                return;
            }

            if (!response.ok) {
                showToast(data.error || 'Google login failed');
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
            showToast('Failed to connect to server for Google Login');
        }
    }
});
