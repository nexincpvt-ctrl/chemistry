
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

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  let user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    window.location.href = 'index.html';
    return;
  }

  // --- Profile Header ---
  const navName = document.getElementById('navName');
  const navAvatar = document.getElementById('navAvatar');
  const userProfileBtn = document.getElementById('userProfileBtn');

  function updateHeader() { if(!navName || !navAvatar) return;
    navName.textContent = user.name || 'User';
    if (user.avatar) {
      navAvatar.textContent = user.avatar;
    } else {
      navAvatar.textContent = (user.name || 'U').charAt(0).toUpperCase();
    }
  }
  updateHeader();

  // --- Logout Logic ---
  const logoutModal = document.getElementById('logoutModal');
  const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

  userProfileBtn?.addEventListener('click', () => {
    logoutModal?.classList.add('active');
  });

  cancelLogoutBtn?.addEventListener('click', () => {
    logoutModal?.classList.remove('active');
  });

  confirmLogoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });

  // --- Onboarding Logic ---
  const onboardModal = document.getElementById('onboardModal');
  const obName = document.getElementById('obName');
  const obClass = document.getElementById('obClass');
  const obSource = document.getElementById('obSource');
  const avatarOpts = document.querySelectorAll('.avatar-opt');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  let selectedAvatar = '👨‍🔬';

  if (!user.class_name) {
    // Show onboarding if class_name is not set
    onboardModal?.classList.add('active');
    obName.value = user.name || '';
  }

  avatarOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      avatarOpts.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedAvatar = opt.dataset.av;
    });
  });

  saveProfileBtn?.addEventListener('click', async () => {
    const originalText = saveProfileBtn.textContent;
    saveProfileBtn.textContent = 'Saving...';
    saveProfileBtn.disabled = true;

    try {
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          name: obName.value,
          class_name: obClass.value,
          heard_from: obSource.value,
          avatar: selectedAvatar
        })
      });

      if (res.ok) {
        const data = await res.json();
        user = data.user;
        localStorage.setItem('user', JSON.stringify(user));
        updateHeader();
        onboardModal?.classList.remove('active');
      } else {
        showToast('Failed to save profile.');
      }
    } catch (e) {
      console.error(e);
      showToast('Network error.');
    } finally {
      saveProfileBtn.textContent = originalText;
      saveProfileBtn.disabled = false;
    }
  });
});
