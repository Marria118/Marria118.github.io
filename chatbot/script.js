const messages = [
  { "role": "system", "content": "Что я могу сделать для вас сегодня?" }
];

const renderMessages = () => {
  const chat = document.getElementById('chat');
  chat.innerHTML = '';
  messages.forEach(msg => {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${msg.role}`;
    messageElement.textContent = `${msg.role}: ${msg.content}`;
    chat.appendChild(messageElement);
  });
};

const sendMessage = () => {
  const userInput = document.getElementById('user-input').value.trim();
  if (userInput) {
    messages.push({ "role": "user", "content": userInput });
    document.getElementById('user-input').value = '';
    renderMessages();
    sendTextRequest();
  }
};

const sendTextRequest = async () => {
  try {
    const response = await fetch("https://amr.pw/proxy", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"messages": messages }),
    });
    const data = await response.json();
    if (data && data.message) {
      messages.push(data.message);
      renderMessages();
    }
    console.log("Response from proxy:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Initial render
renderMessages();
