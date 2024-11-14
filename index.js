const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}
const generateResponse = () => {
    const API_URL = " https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "Authorization" : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            message: [{role: "user", content: userMessage}]
        })
    }
}

const handlechat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"))

    setTimeout(() => {
        chatbox.appendChild(createChatLi("typing...", "incoming"));
        generateResponse();
    },600);
}

sendChatBtn.addEventListener("click", handlechat);