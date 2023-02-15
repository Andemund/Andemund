const apiEndpoint = 'http://your_centos_ip:5000/chat';
const apiKey = 'your_openai_api_key';

const chatContainer = document.querySelector('#chat-container');
const chatOutput = document.querySelector('#chat-output');
const userInput = document.querySelector('#user-input');
const sendBtn = document.querySelector('#send-btn');

sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage.length > 0) {
        appendMessage('user', userMessage);
        userInput.value = '';
        try {
            const response = await axios.post(apiEndpoint, {
                message: userMessage,
                api_key: apiKey
            });
            const botMessage = response.data.message;
            appendMessage('bot', botMessage);
        } catch (error) {
            console.log(error);
        }
    }
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);
}
