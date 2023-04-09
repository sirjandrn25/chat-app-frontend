import Button from "../../../Components/Button/button.component";
import InputField from "../../../Components/Input/inputField.component";
import { AUTH_ROUTE } from "../../../Constants/route.constant";
import useNavigation from "../../../Hooks/useNavigation.hook";
import useRegister from "../Hooks/useRegister.module";

const Register = () => {
  const { formData, error, setFormData, handleFormData, onSubmit } =
    useRegister();
  const { navigation } = useNavigation();
  const hasError = (key: string) => {
    return typeof error[key] !== "undefined";
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="h-auto w-[400px] flex flex-col rounded gap-2 py-4 shadow-lg">
        <div className="p-4 py-2 text-xl font-bold text-center border-b text-info">
          Register New User
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="gap-4 p-4 col-flex">
            <InputField
              errorMessage={error?.first_name}
              label="First Name"
              error={hasError("first_name")}
              isRequired
              type="text"
              value={formData?.profile?.first_name}
              onChange={(value) => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    profile: {
                      ...(prev?.profile || {}),
                      first_name: value,
                    },
                  };
                });
              }}
            />
            <InputField
              errorMessage={error?.last_name}
              label="Last Name"
              error={hasError("last_name")}
              isRequired
              type="text"
              value={formData?.profile?.last_name}
              onChange={(value) => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    profile: {
                      ...(prev?.profile || {}),
                      last_name: value,
                    },
                  };
                });
              }}
            />
            <InputField
              error={hasError("email")}
              errorMessage={error?.email}
              label="Email"
              isRequired
              value={formData?.email}
              type="email"
              onChange={(value) => handleFormData("email", value)}
            />
            <InputField
              label="Password"
              isRequired
              type="password"
              value={formData?.passsword}
              error={hasError("passsword")}
              errorMessage={error?.password}
              onChange={(value) => handleFormData("password", value)}
            />
          </div>
          <div className="px-4">
            <Button onClick={onSubmit}>Create An Account</Button>
          </div>
        </form>
        <div className="flex items-center justify-between gap-2 p-4 border-t">
          <Button
            className="btn btn-link"
            onClick={() => {
              navigation({
                pathname: AUTH_ROUTE,
                queryParams: {
                  tabs: "login",
                },
              });
            }}
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
