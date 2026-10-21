(() => {
  'use strict';
  // This runs after roles-portal.js, so the portal's demo UI can keep working
  // for all other roles. Selecting Руководитель opens the original main dashboard.
  const continueButton = document.getElementById('continueBtn');
  if (!continueButton) return;

  continueButton.addEventListener('click', () => {
    const selectedManager = document.querySelector('.role-card.manager.selected');
    if (!selectedManager) return;

    const selectedStore = document.getElementById('storeSelect')?.value || '1';
    try {
      sessionStorage.setItem('mmp-active-role', 'manager');
      sessionStorage.setItem('mmp-active-store', String(selectedStore));
      localStorage.setItem('mmp-demo-store', String(selectedStore));
    } catch (error) {
      // Navigation should still work if browser storage is unavailable.
    }
    window.location.assign(new URL('./dashboard.html', window.location.href).href);
  });
})();
