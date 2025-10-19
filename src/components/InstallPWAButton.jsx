import React, { useEffect, useState } from 'react';

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Fired when PWA meets install criteria
    function beforeInstallHandler(e) {
      e.preventDefault(); // prevents auto mini-infobar
      setDeferredPrompt(e);
      setIsInstallable(true);
    }

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    // Detect if app is already installed (standalone)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    function onAppInstalled() {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    // choice.outcome will be 'accepted' or 'dismissed'
    console.log('PWA install choice: ', choice);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // If already installed, optionally show nothing or show "Open App"
  if (isInstalled) return null;

  return (
    <>
      {isInstallable ? (
        <button
  onClick={handleInstallClick}
  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
>
  📲 Download App
</button>
      ) : null}
    </>
  );
}
