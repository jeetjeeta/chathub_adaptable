const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const hamburgerButton = document.querySelector(".hamburgerButton");

const P = getRandPrime(10, 1000);
const Q = getRandPrime(10, 1000);
const N = P * Q;
const phi = (P - 1) * (Q - 1);

const publicKey = rel_prime(phi);
const privateKey = calculate_d(phi, publicKey);

const openSidebar = () => {
  hamburgerButton.classList.add("selected");
};

const formatMessage2 = (username, msg) => {};

const socket = io();
const botName = "ChatHub Bot";

const getParameterByName = (name) => {
  let s = window.location.href;
  s += "&";

  let reg = new RegExp("[?&]" + name + "=.*");

  let res = reg.exec(s);

  res = res[0].substr(1, res[0].length);
  //   console.log(res);
  res = res.replace(/&(.*)/, "");
  //   console.log(res);
  res = res.split("=");
  res = res[1];
  return decodeURIComponent(res);
};

socket.emit(
  "joinRoom",
  getParameterByName("username"),
  getParameterByName("room")
);

const formatMessage = (user, msg, type = "recieved") => {
  const message = document.createElement("div");

  message.className = "message";
  if (type === "send") {
    message.className = "sendMessage";
  }

  console.log(msg);
  message.innerHTML = `<p class="meta">${user} <span>${getTime()}</span></p>
  <p class="text whiteSpace">
    ${msg}
  </p>`;

  chatMessages.appendChild(message);
  const text = message.querySelector(".text");
  text.textContent = msg;
};

socket.on("message", (msg) => {
  formatMessage(botName, msg);
});

const sendMessage = (mesg) => {
  formatMessage("You", mesg, "send");
};

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  e.target.elements.msg.value = "";
  const username = getParameterByName("username");
  sendMessage(msg);

  e.target.elements.msg.focus();
  chatMessages.scrollTop = chatMessages.scrollHeight;

  socket.emit("chatMessage", msg, username);

  socket.emit("sendMes", encryptMessage());
});

const getTime = () => {
  const time = new Date();
  let timeFormat = `${time.getDate()}-${
    time.getMonth() + 1
  }-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;

  return timeFormat;
};

socket.on("chatMessage", (msg, username) => {
  formatMessage(username, msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

const room = getParameterByName("room");
document.querySelector("#room-name").textContent = room;

chatForm.addEventListener("submitted", (e) => {
  socket.emit("sendMessage", encryptMessage(e.message));
});

socket.on("recieveMsg", (msg, username) => {
  formatMessage2(username, decryptMessage(msg));
});
