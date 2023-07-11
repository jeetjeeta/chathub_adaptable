const users = [];

const userJoin = (id, username, room) => {
  let obj = { id, username, room };
  users.push(obj);
};

const getUserById = (id) => {
  let val = users.find((user) => user.id === id);
  return val;
};

const getUsersByRoom = (room) => {
  let arr = users.filter((user) => room === user.room);
  return arr;
};

const userLeave = (id) => {
  const i = users.findIndex((user) => id === user.id);
  if (i === -1) return;
  users.splice(i, 1);
};

module.exports = {
  userJoin,
  getUserById,
  userLeave,
  getUsersByRoom,
};
