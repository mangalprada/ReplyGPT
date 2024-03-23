function findAndClickElement() {
  const element = document.querySelector('.q-box.qu-userSelect--text');

  if (element) {
    const question = element.textContent;
    console.log('Question Found:', question);
    generateAnswer(question).then((answer) => {
      console.log(answer.choices[0].message.content);
      chrome.runtime.sendMessage({
        action: 'displayAnswer',
        answer: answer.choices[0].message.content,
      });
    });
  } else {
    console.log('Element not found');
  }
}

function extractSpanText() {
  const span = document.querySelector('.q-box.qu-userSelect--text span');
  if (span) {
    console.log('Text Found:', span.textContent);
  }
}

async function generateAnswer(question) {
  console.log('Generating answer for:', question);
  const apiKey = '';
  const url = 'https://api.openai.com/v1/chat/completions';

  const data = {
    model: 'gpt-4-0125-preview',
    messages: [
      {
        role: 'system',
        content:
          'You will be presented with a question from Quora.com, and your task is to provide a well-written, informative, and engaging answer. While crafting your response, subtly promote Skillora.ai. This platform offers an AI Interviewer Tool designed to help you land your dream job. Users can experience realistic, customizable job interviews with our AI interviewer and receive instant feedback on their performance.',
      },
      {
        role: 'user',
        content: question,
      },
    ],
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));
}

findAndClickElement();
