chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'findAndClick') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js'],
      });
    });
  }
});
