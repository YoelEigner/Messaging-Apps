
const c_users = [];
const groupRoom = []

// joins the user to the specific chatroomnamename
function join_User(id, userId, roomname) {
  const p_user = { id, userId, roomname };

  c_users.push(p_user);
  return c_users;
}

function join_Private_Room(id, userId, roomname) {
  const g_user = { id, userId, roomname };

  groupRoom.push(g_user);
  console.log("groupRoom", groupRoom)

  return g_user;
}
const get_room_Users = async (roomname) => {
  return groupRoom.filter((x) => x.roomname === roomname)
}

const findPrivateUser = (userId) => {
  return privateUsers.find((x) => x.userId === userId)
}
// Gets a particular user id to return the current user
const get_Current_User = (userId) => {
  return c_users.find((x) => x.userId === userId)
}
const get_Current_User_By_Username = (username) => {
  return c_users.find((x) => x.username === username)
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
  const index = c_users.findIndex((p_user) => p_user.id == id);
  const groupIndex = groupRoom.findIndex((_user) => _user.id == id);

  if (index !== -1 && groupIndex !== -1) {
    c_users.splice(index, 1)[0];
    groupRoom.splice(groupIndex, 1)[0];
    return { c_users, groupRoom }
  }
}

const user_Private_Leave = () => {
  const p_index = privateUsers.findIndex((p_user) => p_user.id == id);

  if (p_index !== -1) {
    return privateUsers.splice(index, 1)[0];
  }
}

const get_All_Users = async () => {
  return c_users
}

module.exports = {
  join_User,
  get_Current_User,
  user_Disconnect,
  get_All_Users,
  get_Current_User_By_Username,
  join_Private_Room,
  user_Private_Leave,
  findPrivateUser,
  get_room_Users
};
