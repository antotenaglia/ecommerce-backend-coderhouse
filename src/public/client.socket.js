const socket = io();
const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");

const sendMessage = async (messageInfo) => {
    socket.emit("client:message", messageInfo);

    const username = usernameInput.textContent;
    const message = messageInput.value;
    const res = await fetch('/chat?username=' + username, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: username, message: message})
    });
};

const renderMessage = (messagesData) => {
    let dateAndTime = new Date().toLocaleString();
    const htmlMessagesPool = messagesData.map((messageInfo) => {
        return `<div> <strong style="color: blue">${messageInfo.username}</strong> <span style="color: brown">[${dateAndTime}]:</span> <em style="color: green">${messageInfo.message}</em> </div>`;
    });

    messagesPool.innerHTML = htmlMessagesPool.join(" ");
};

const messageSubmitHandler = (event) => {
    event.preventDefault();

    const messageInfo = {
        username: usernameInput.textContent,
        message: messageInput.value,
    };

    if(messageInfo.message.length == 0) {
        alert("There are unfilled fields");
        return;
    };

    sendMessage(messageInfo);

    messageInput.value = "";
};

messageForm.addEventListener("submit", messageSubmitHandler);

socket.on("server:message", renderMessage);