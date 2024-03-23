// script.js

document.getElementById('clickButton').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'findAndClick' });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'displayAnswer') {
    document.getElementById('answerText').textContent = request.answer;
    document.getElementById('answerContainer').style.display = 'block';
  }
});

document.getElementById('copyButton').addEventListener('click', function () {
  const answerText = document.getElementById('answerText').textContent;
  navigator.clipboard.writeText(answerText).then(
    function () {
      console.log('Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Could not copy text: ', err);
    }
  );
});
