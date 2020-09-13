import { GET_USER_INFO } from "../action-types/user"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import api from "@/request/api"

import { UserState } from "../types/user"
import IState from "../types/state"
import { AnyAction, Action } from "redux"

const getUserInfo = (payload: { username?: string }): AnyAction => ({
  type: GET_USER_INFO,
  payload,
})

export function fetchUserInfo(){
  return async (dispatch) => {
    const { data } = await Axios.get(api.getUserInfo)
    dispatch(getUserInfo(data.data))
  }
}

// export function fetchUserInfo(): ThunkAction<
//   Promise<void>,
//   IState,
//   void,
//   AnyAction
// > {
//   return async (
//     dispatch: ThunkDispatch<IState, void, AnyAction>
//   ): Promise<void> => {
//     const { data } = await Axios.get(api.getUserInfo)
//     dispatch(getUserInfo(data.data))
//   }
// }
