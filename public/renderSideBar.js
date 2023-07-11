const outputRoom = (room) => {
  const sidebar = document.querySelector(".chat-sidebar");
  sidebar.innerHTML = `<h3><i class="fas fa-comments"></i> Room Name:</h3>
    <h2 id="room-name">${room}</h2>
    <h3><i class="fas fa-users"></i> Users</h3>`;
};

const outputUsers = (users) => {
  const sidebar = document.querySelector(".chat-sidebar");
  const ul = document.createElement("ul");
  ul.setAttribute("id", "users");
  let str = ``;
  for (let user of users) {
    str += `<li>${user.username}</li>\n`;
  }
  ul.innerHTML = str;
  sidebar.appendChild(ul);
};

const removeUser = (user) => {
  const sidebar = document.querySelector(".chat-sidebar");
  const lis = document.querySelectorAll("#users li");
  for (let li of lis) {
    if (li.textContent === user.username) {
      li.remove();
    }
  }
};

socket.on("outputUsers", (users, room) => {
  outputRoom(room);
  outputUsers(users);
});

socket.on("removeUsers", (user) => {
  removeUser(user);
});
