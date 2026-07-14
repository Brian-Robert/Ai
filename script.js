const chat = document.getElementById("chat");
const input = document.getElementById("prompt");
const button = document.getElementById("send");

const WORKER_URL = "brian-ai.brian-robert.workers.dev";

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

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    try {
        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        const reply =
            data.choices?.[0]?.message?.content ||
            data.choices?.[0]?.text ||
            "No response.";

        addMessage(reply, "ai");

    } catch (error) {
        addMessage("Connection error.", "ai");
        console.error(error);
    }
}
