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

  // Determine which link to use
  let linkToOpen = app.url; // default to web URL

  if (isAndroid && app.android) {
    linkToOpen = app.android;
  } else if (isIOS && app.ios) {
    linkToOpen = app.ios;
  }

  if (!linkToOpen) {
    return console.warn(`No available link for app: ${app.name}`);
  }

  // Open the link
  window.location.href = linkToOpen;
}
