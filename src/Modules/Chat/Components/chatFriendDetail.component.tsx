import { useCallback, useMemo } from "react";
import Avatar from "../../../Components/Avatar/avatar.component";
import useUser from "../../../Hooks/useUser.hook";
import useNotification from "../../../Context/useNotification.context";
import { EmptyFunction } from "../../../Utils/common.utils";

interface ChatFriendDetailInterface {
  chat?: any;
  onClick?: (id?: any) => void;
  active?: boolean;
}

const ChatFriendDetail = ({
  chat,
  active,
  onClick = EmptyFunction,
}: ChatFriendDetailInterface) => {
  const { users = [], is_group, title } = chat || {};
  const { user: currentUser } = useUser();
  const { notifications, removeNotification } = useNotification();

  const chatTitle = useMemo(() => {
    if (is_group) return title;
    const { user: friend } =
      users.filter((user: any) => user?.user_id !== currentUser?.id)[0] || {};

    return `${friend?.profile?.first_name} ${friend?.profile?.last_name}`;
  }, [currentUser?.id, is_group, title, users]);

  const Notification = useCallback(() => {
    const data = notifications.filter((notification: any) => {
      return notification.chat_id === chat?.id;
    });
    if (!data?.length) return <></>;

    return <div className="badge badge-error badge-sm">{data?.length}</div>;
  }, [chat?.id, notifications]);

  return (
    <div
      className={`items-center justify-start w-full gap-2 px-4 py-2 border-b cursor-pointer row-flex hover:bg-base-200 ${
        active ? "bg-base-200" : ""
      }`}
      onClick={() => {
        notifications.forEach((notification) => {
          if (notification.chat_id === chat?.id) {
            removeNotification(notification);
          }
        });
        onClick(chat?.id);
      }}
    >
      <Avatar />
      <div className="w-full col-flex">
        <div className="items-center justify-between w-full row-flex">
          <div className="font-bold capitalize ">{chatTitle}</div>
          <div className="text-xs">9:30 PM</div>
        </div>
        <div className="items-center justify-between w-full row-flex">
          <div className="text-sm ">last message</div>
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default ChatFriendDetail;
