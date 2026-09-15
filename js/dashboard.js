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
        alert('Failed to save profile.');
      }
    } catch (e) {
      console.error(e);
      alert('Network error.');
    } finally {
      saveProfileBtn.textContent = originalText;
      saveProfileBtn.disabled = false;
    }
  });
});
