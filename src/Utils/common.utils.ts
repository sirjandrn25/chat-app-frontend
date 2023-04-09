export const EmptyFunction = () => {
  //empty function
};

export const resolveNavigation = (path: string) => {
  return `/admin/${path}`;
};
let timer: any;
export const Debounce = (func: (value?: any) => void, wait: number) => {
  return (...args: any) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};

export const GetObjectFromArray = (arr: any[], key: string, value: any) => {
  for (let element of arr) {
    if (element[key] === value) {
      return element;
    }
  }
  return {};
};
export const IsEmptyObject = (value: any) => {
  if (typeof value === "object") {
    const keys = Object.keys(value);

    return !keys.length;
  }
  return false;
};
export const getChatTitle = (chat: any) => {
  const currentUser = JSON.parse(localStorage.getItem("_auth_user") as any);
  const { is_group, title, users } = chat || [];
  if (is_group) return title;
  const { user: friend } =
    users.filter((user: any) => user?.user_id !== currentUser?.id)[0] || {};

  return `${friend?.profile?.first_name} ${friend?.profile?.last_name}`;
};
