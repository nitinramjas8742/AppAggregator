/**
 * Opens the app link if available for the platform,
 * otherwise falls back to web URL.
 * Handles missing fields gracefully.
 */
export function openAppOrWeb(app) {
  if (!app) return console.warn("App data missing!");

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

  const webUrl = app.url; // always fallback to website
  let appUrl = null;

  if (isAndroid && app.android) {
    appUrl = app.android; // e.g., "zomato://"
  } else if (isIOS && app.ios) {
    appUrl = app.ios; // e.g., "zomato://"
  }

  if (!appUrl) {
    // No app URL, open website
    window.location.href = webUrl;
    return;
  }

  const now = Date.now();
  window.location.href = appUrl;

  // Fallback to web after 1.5s if app didn’t open
  setTimeout(() => {
    if (Date.now() - now < 2000) {
      window.location.href = webUrl;
    }
  }, 1500);
}
