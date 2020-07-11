import { SET_ACTIVE_CHAT } from "../actionTypes";

const initialState = {
  activeChat: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      const { activeChat } = action.payload
      return {
          ...state,
          activeChat
      }
    }
    default:
      return state;
  }
}