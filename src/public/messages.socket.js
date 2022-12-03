const socket = io();

const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");

//se define la función que envía mensajes
const sendMessage = (messageInfo) => {
  //se manda mensaje al back a traves de websocket
  socket.emit("client:message", messageInfo);
};

//se define la función que muestra mensajes
const renderMessage = (messagesData) => {
  let fyh = new Date().toLocaleString();
  const htmlMessagesPool = messagesData.map((messageInfo) => {
    return `<div> <strong style="color: blue">${messageInfo.username}</strong> <span style="color: brown">[${fyh}]:</span> <em style="color: green">${messageInfo.message}</em> </div>`;
  });

  messagesPool.innerHTML = htmlMessagesPool.join(" ");
};

//se define la función que dispara el evento submit del form de mensajes
const messageSubmitHandler = (event) => {
  //evita que se recargue la página
  event.preventDefault();

  //se definen variables del mensaje
  const messageInfo = {
    username: usernameInput.value,
    message: messageInput.value,
  };

  //se define como obligatoria la entrada de email
  const formElements = document.getElementById("messageForm").elements;
  
  if (formElements[0].value == '') {
    alert("Por favor ingrese su Email para iniciar el chat");
    return false;
  }    

  //se ejecuta sendMessage()
  sendMessage(messageInfo);

  //se vacía el message input asi queda libre para escribir un nuevo mensaje y se fija el nombre de usuario  
  messageInput.value = "";
  usernameInput.readOnly = true;
};

//se ejecuta el evento submit para mensajes
messageForm.addEventListener("submit", messageSubmitHandler);

//se escuchan los eventos que vienen del server, mostrando los mensajes 
socket.on("server:message", renderMessage);