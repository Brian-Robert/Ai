const chat = document.getElementById("chat");
const input = document.getElementById("prompt");
const button = document.getElementById("send");

button.onclick = sendMessage;

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "message " + type;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(() => {
        addMessage("AI is not connected yet.", "ai");
    }, 500);
}
