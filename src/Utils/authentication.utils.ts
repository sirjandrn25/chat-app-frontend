import { BASE_URL } from "./../Constants/api.constant";
import axios from "axios";
import { EmptyFunction } from "./common.utils";
import {
  GetLocalState,
  RemoveLocalState,
  SetLocalState,
} from "./localState.utils";

const user_session_key = "user_session";

export const logOutHandler = () => {};

export const calculateRemainingTime = () => {
  try {
    const { success, data } = (GetLocalState(user_session_key) as any) || {};
    if (!success || !data) return 0;
    const current_date = Date.now();
    const remaining_time = data?.expire_time - current_date;
    return remaining_time;
  } catch (err) {
    return 0;
  }
};

export const calculateExpireTime = (time: number) => {
  const date = Date.now();
  return date + time * 1000;
};
export const getSessionToken = () => {
  try {
    const { data = {}, success }: any = GetLocalState(user_session_key);

    return data;
  } catch (err) {
    return undefined;
  }
};
export const storeSessionToken = (
  response: any,
  callback: any = EmptyFunction
) => {
  try {
    SetLocalState(user_session_key, {
      ...response,
      expire_time: calculateExpireTime(response.time),
    });
    callback();
  } catch (error) {}
};

export class AuthUser {
  static login(data: any) {
    let time = 180; // expire time in second
    storeSessionToken({ ...data, time });
  }

  static logout() {
    RemoveLocalState();
    // clearLocalState(user_session_key);
    // localStorage.
  }

  static getLoggedDetail() {
    // get user information
    const store_info = getSessionToken();
    return store_info;
  }
  static remainingLoginTimeOut() {
    try {
      const remainingTime = calculateRemainingTime();
      return remainingTime;
    } catch (err) {
      return 0;
    }
  }
}

export const fetchUserProfile = async () => {
  const { access_token } = AuthUser.getLoggedDetail() || {};
  const config = {
    Authorization: `Bearer ${access_token}`,
  };

  return axios({
    url: `${BASE_URL}/users/profile/me`,
    headers: {
      ...config,
    },
    method: "GET",
  });
};
export const sendRefreshTokenRequest = async () => {
  const { refresh_token } = AuthUser.getLoggedDetail() || {};
  return axios({
    url: `${BASE_URL}/auth/refresh_token`,
    method: "post",
    data: { token: refresh_token },
  });
};
