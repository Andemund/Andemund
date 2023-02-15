const OPENAI_API_KEY = 'your_api_key_here';
const chatContainer = document.querySelector('.chat-container');
const chatBox = chatContainer.querySelector('.chat-box');
const inputBox = chatContainer.querySelector('input');
const sendButton = chatContainer.querySelector('button');

const openai = new OpenAI(OPENAI_API_KEY);

sendButton.addEventListener('click', () => {
    const userMessage = inputBox.value;
    if (userMessage === '') return;
    appendUserMessage(userMessage);
    inputBox.value = '';

    openai.complete({
        engine: 'davinci',
        prompt: `User: ${userMessage}\nBot:`,
        maxTokens: 150,
        n: 1,
        stop: '\n',
    }).then(result => {
        const botMessage = result.data.choices[0].text.trim();
        appendBotMessage(botMessage);
    }).catch(error => {
        console.error('Error:', error);
    });
});

function appendUserMessage(message) {
    const messageElement = chatBox.querySelector('.user-message');
messageElement.querySelector('.message-content p').textContent = message;
}

function appendBotMessage(message) {
const messageElement = chatBox.querySelector('.chat-message').cloneNode(true);
messageElement.querySelector('.message-header p').textContent = 'Bot:';
messageElement.querySelector('.message-content p').textContent = message;
chatBox.appendChild(messageElement);
}
