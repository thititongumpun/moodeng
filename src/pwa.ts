import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl: string) {
    console.log('Service Worker registered:', swScriptUrl);
  },
  onNeedRefresh() {
    updateSW();

    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="position: fixed; bottom: 20px; left: 20px; background: #000; color: #fff; padding: 10px; z-index: 1000;">
        The app has been updated with new content.
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  },
  onOfflineReady() {
    console.log('PWA is ready to work offline.');
  },
});
