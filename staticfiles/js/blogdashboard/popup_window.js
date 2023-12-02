

let popupWindow = null;

function openPopup(url) {
  if (popupWindow && !popupWindow.closed) {
    // If the popup window is already open, just update its URL
    popupWindow.location.href = url;
  } else {
    // Open a new popup window and set its URL
    popupWindow = window.open(url, 'popupWindow', 'width=600,height=600');
  }
}