function toggleChat() {
    var chatbox = document.getElementById('chatbox');
    chatbox.classList.toggle('collapsed');
}

function sendMessage() {
    var userMessage = document.getElementById('user-message').value;
    var chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += '<div class="message sent">' + userMessage + '</div>';
    document.getElementById('user-message').value = ''; // Clear input field

    // Send user message to OpenAI API and handle response
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: userMessage }]
        })
    })
    .then(response => response.json())
    .then(data => {
        var modelResponse = data.choices[0].message.content;
        chatMessages.innerHTML += '<div class="message received">' + modelResponse + '</div>';
    })
    .catch(error => console.error('Error:', error));
}
