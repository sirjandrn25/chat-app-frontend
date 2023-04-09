const useUser = () => {
  const user: any = localStorage.getItem("_auth_state");
  return {
    user: JSON.parse(user),
  };
};
export default useUser;
