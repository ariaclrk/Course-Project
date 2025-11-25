// Elements
const chatContainer = document.querySelector(".chatbot");
const chatbox       = document.querySelector(".chatbox");
const chatInput     = document.querySelector(".chat-input textarea");
const sendBtn       = document.querySelector(".chat-input button");
const toggleBtn     = document.getElementById("chatbutton");

// Toggle open/close
toggleBtn?.addEventListener("click", () => {
  chatContainer?.classList.toggle("open");
});

// Rules
const RULES = [
  { input: ["hi","hello","hey"], reply: "Hello! Try: about, skills, projects, contact, help." },
  { input: ["about","who are you"], reply: "I'm the portfolio assistant for Ariana." },
  { input: ["skills","what can you do","what do you know"], reply: "Python, Java, SQL, Wireshark, HTML, CSS." },
  { input: ["projects","portfolio"], reply: "Click on 'Projects' located in the navigation bar." },
  { input: ["contact","email","reach","message"], reply: "Reach Ariana at ariana.clark@my.utsa.edu." },
  { input: ["help","what can you answer"], reply: "Try: 'about', 'skills', 'projects', or 'contact'." },
  { input: ["how are you"], reply: "Doing great! How can I help?" }
];

const FALLBACK = "Sorry, I didn't catch that. Please try again.";

// Helpers
const norm = s => s.trim().toLowerCase().replace(/\s+/g, " ");

function findReply(text) {
  for (const {input, reply} of RULES) {
    if (input.some(k => norm(text).includes(k))) return reply;
  }
  return FALLBACK;
}

function addMessage(msg, who = "outgoing") {
  if (!chatbox) return;
  const li = document.createElement("li");
  li.classList.add("chat", who);

  const p = document.createElement("p");
  p.textContent = msg;
  li.appendChild(p);

  chatbox.appendChild(li);
  chatbox.scrollTop = chatbox.scrollHeight;
}
// Send msg
function send() {
  const text = norm(chatInput?.value || "");
  if (!text) return;
  addMessage(text, "outgoing");
  if (chatInput) chatInput.value = "";
  setTimeout(() => addMessage(findReply(text), "incoming"), 200);
}

// Close using enter key
sendBtn?.addEventListener("click", send);
chatInput?.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});