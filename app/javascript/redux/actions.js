import { SET_ACTIVE_CHAT } from "./actionTypes"

export const setActiveChat = activeChat => ({
  type: SET_ACTIVE_CHAT,
  payload: {
    activeChat
  }
})
