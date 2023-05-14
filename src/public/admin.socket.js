const socket = io();
const usernameInput = document.getElementById("usernameInput");

const sendMessage = async (messageInfo) => {
    socket.emit("client:message", messageInfo);

    const username = usernameInput.textContent;
    const message = messageInfo.message;
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
    const message = messagesData.slice(-1)[0];
    if(typeof message === "undefined")
        return;
    let messageArray = [];
    messageArray.push(message);
    const messagesPool = document.getElementById(message.to);
    let dateAndTime = new Date().toLocaleString();
    const htmlMessagesPool = messageArray.map((messageInfo) => {
        return `<div> <strong style="color: blue">${messageInfo.username}</strong> <span style="color: brown">${dateAndTime}:</span> <em style="color: green">${messageInfo.message}</em> </div>`;
    });

    messagesPool.innerHTML = htmlMessagesPool.join(" ");
};

const messageSubmitHandler = (event) => {
    event.preventDefault();
    const usernameTo = event.srcElement.id.split('+')[1];
    const messageElem = document.getElementById("message+" + usernameTo);
    const messageInfo = {
        username: usernameInput.textContent,
        message: messageElem.value,
        to: usernameTo
    };

    if(messageInfo.message.length == 0) {
        alert("There are unfilled fields");
        return;
    };

    sendMessage(messageInfo);

    messageElem.value = "";
};

const list = document.getElementsByClassName("messageSubmit");

for (let item of list) {
    let elem = document.getElementById(item.id);
    elem.addEventListener("submit", messageSubmitHandler);
}

socket.on("server:message", renderMessage);