import { useList } from "react-use";
import { createContext, useContext } from "react";
import { GetObjectFromArray } from "../Utils/common.utils";

interface NotificationInterface {
  notifications: any[];

  addNotification: (notification: any) => void;
  removeNotification: (index: any) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationInterface>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
  clearNotifications: () => {},
});

export const NotificationProvider = ({ children }: any) => {
  const [list, { push, clear, removeAt }] = useList<any>([]);

  const removeNotification = (notification: any) => {
    list.forEach((element, index) => {
      if (notification?.chat_id === element.chat_id) {
        removeAt(index);
      }
    });
  };

  const addNotification = (notification: any) => {
    push(notification);
  };

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        notifications: list,
        removeNotification,
        clearNotifications: clear,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => useContext(NotificationContext);
export default useNotification;
