import { GET_USER_INFO } from '@/redux/actionTypes/user';
import api from '@/request/api';

const getUserInfo = (payload: any): object => ({
  type: GET_USER_INFO,
  payload,
});

export function fetchUserInfo (): Function {
  return async (dispatch: Function) => {
    const { data } = await Axios.get(api.getUserInfo);
    dispatch(getUserInfo(data.data));
  };
}
