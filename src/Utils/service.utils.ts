import axios from "axios";
import { BASE_URL } from "../Constants/api.constant";

import Toast from "./toast.utils";

type sendRequestProps = {
  end_point: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  attachSessionId?: boolean;
  classParams?: any;
  document_id?: number | string;
};

const getToken = () => {
  const token_key = "_auth";
  const token_type_key = "_auth_type";
  const token = localStorage.getItem(token_key);
  const token_type = localStorage.getItem(token_type_key);

  return `${token_type} ${token}`;
};

export const sendRequest = async ({
  end_point,
  document_id,
  method = "get",
  attachSessionId = true,
  classParams = {},
}: sendRequestProps) => {
  try {
    const base_url = `${BASE_URL}/${end_point}`;
    const full_url = document_id ? `${base_url}/${document_id}` : base_url;

    let params = {
      method: method,
      data: classParams,
      url: full_url,
    };
    if (attachSessionId) {
      const token = getToken();
      if (!token) {
        Toast.error({ message: "Session Token is required !!!" });
        return {
          success: false,
        };
      }

      const config = {
        headers: { Authorization: `${token}` },
      };
      params = {
        ...params,
        ...config,
      };
    }

    const response = await axios({ ...params });

    return {
      success: true,
      response: response.data,
    };
  } catch (error: any) {
    // Toast.error({ message: error });
    const { response } = error;
    Toast.error({ message: error.message });
    if (response?.status === 403) {
      localStorage.clear();

      window.location.replace(`/auth`);
    }

    if (response) {
      // Toast.error({ message: response.data });
    } else {
      // Toast.error({ message: "internal server error !!1" });
    }
    return {
      success: false,
      response: null,
    };
  }
};

export const asyncService = ({
  end_point,
  document_id,
  method = "get",
  attachSessionId = true,
  classParams = {},
}: sendRequestProps) =>
  new Promise(async (resolve, reject) => {
    const { success, response } = await sendRequest({
      end_point,
      document_id,
      method,
      attachSessionId,
      classParams,
    });
    if (success) resolve(response);
    else reject("Something went wrong");
  });
