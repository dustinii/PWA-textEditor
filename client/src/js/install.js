// Reference to the install button element
const butInstall = document.getElementById('buttonInstall');

// Reference for the deferred prompt event
let deferredPrompt;

// Listen for the beforeinstallprompt event and show the install button
window.addEventListener('beforeinstallprompt', (event) => {
  deferredPrompt = event;
  butInstall.classList.remove('hidden');
});

// Handle the button click to show the install prompt
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();
  deferredPrompt = null;

  // Hide the install button after showing the prompt
  butInstall.classList.add('hidden');
});

// Reset the deferred prompt when the app is installed
window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
});
