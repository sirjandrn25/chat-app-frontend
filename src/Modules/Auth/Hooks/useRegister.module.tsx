import axios from "axios";
import Joi from "joi";
import { useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { JoiErrorMessageToJson } from "../../../Composites/FormBuilder/Utils/joiValidation.utils";
import { BASE_URL } from "../../../Constants/api.constant";
import { AUTH_ROUTE } from "../../../Constants/route.constant";
import useNavigation from "../../../Hooks/useNavigation.hook";
import Toast, { serverErrorToast } from "../../../Utils/toast.utils";

export const getJoiValidationOptions = () => {
  return {
    abortEarly: false,
    allowUnknown: true,
    errors: {
      wrap: {
        label: "",
      },
    },
  };
};
const useRegister = () => {
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<any>({});
  const { navigation } = useNavigation();
  const { mutate } = useMutation(
    (data) => {
      return axios({
        url: `${BASE_URL}/auth/register`,
        method: "post",
        data: data,
      });
    },
    {
      onError: (data: any) => {
        const errors = data?.response?.data?.errors;

        if (!errors || !errors?.length)
          return Toast.error({ message: "Server Failed !!" });
        for (const err of errors) serverErrorToast(err);
      },
      onSuccess: (data) => {
        Toast.success({ message: "Successfull new user registered " });
        navigation({
          pathname: AUTH_ROUTE,
        });
        setFormData({});
      },
    }
  );

  const schema: any = useMemo(() => {
    return Joi.object({
      profile: Joi.object({
        first_name: Joi.string().required().label("First Name"),
        last_name: Joi.string().required().label("Last Name"),
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email Address"),
      password: Joi.string().required().label("Password"),
    });
  }, []);
  const handleFormData = (key: string, value: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const verify = useCallback(() => {
    const { error: err } = schema.validate(formData, {
      ...getJoiValidationOptions(),
    });
    if (err) {
      setError(JoiErrorMessageToJson(err));
      return false;
    }
    setError({});
    return true;
  }, [schema, formData]);

  const onSubmit = (next: any = () => {}) => {
    if (verify()) {
      //call api
      mutate(formData || {});
    }
    next();
  };

  return {
    formData,
    setFormData,
    handleFormData,
    error,
    onSubmit,
  };
};

export default useRegister;
