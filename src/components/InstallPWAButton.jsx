import React, { useState, useEffect } from "react";

export default function InstallPWAButton({ iconOnly = false }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      title="Download App"
      className="install-btn flex items-center justify-center p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M12 16a1 1 0 0 1-.7-.29l-5-5a1 1 0 1 1 1.4-1.42L11 12.59V4a1 1 0 1 1 2 0v8.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5A1 1 0 0 1 12 16z" />
        <path d="M5 20a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H5z" />
      </svg>
      {!iconOnly && <span className="ml-2 text-sm font-semibold">Download</span>}
    </button>
  );
}
