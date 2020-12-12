const init = false;

export default function UserReducer(state = init, action) {
  if (action.type === "login") {
    return action.user;
  }

  if (action.type === "logout") {
    return false;
  }

  return state;
}
