const socket = io("ws://localhost:5256");

const username = prompt("Enter display name.");
socket.emit('new-user', username);
addMessage(`You joined the chat.`);

socket.on("message", data => {
    addMessage(`${data.username}: ${data.message}`);
});

socket.on("user-connected", username => {
    addMessage(`${username} joined the chat.`);
});

socket.on("user-disconnected", username => {
    addMessage(`${username} left the chat.`);
});

document.getElementById('send-button').onclick = () => {
    const text = document.querySelector('input').value;
    if (text != "") 
    {
        socket.emit('message', text);
        addMessage(`You: ${text}`);
    }
    
    var input = document.getElementById("text-input");
    input.value = "";
};

function updateScroll(){
    var element = document.getElementById("message-list");
    element.scrollTop = element.scrollHeight;
}

function addMessage(msg)
{
    const elem = document.createElement("li");
    elem.innerHTML = msg;
    document.getElementById("message-list").appendChild(elem);
    updateScroll();
}