import { GET_USER_INFO } from "../action-types/user"
import { UserState } from "../types/user"

const initialState = {
  userInfo: {
    userName: "7yue",
  },
}

export default function user(state = initialState, action: IAction): UserState {
  console.log(action, "user")
  const { type, payload = {} } = action
  const { userName } = payload
  let userInfo = {
    userName: userName,
  }
  if (type === GET_USER_INFO) {
    return {
      ...state,
      userInfo,
    }
  }
  return state
}

interface IAction {
  type: string
  payload: ResUserInfo
}
interface ResUserInfo {
  userName?: string
}
