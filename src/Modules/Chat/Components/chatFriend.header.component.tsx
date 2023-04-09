import Icon from "../../../Components/Icon/icon.component";
import ToolTip from "../../../Components/Tooltip/toolTip.component";
import useAuth from "../../../Composites/DashboardWrapper/Hooks/useAuth.hook";
import {
  LogoutIcon,
  UserGroupIcon,
  UserIcon,
} from "../../../Constants/imageMapping.constants";
import useChatContext from "../../../Context/Chat/useChat.context";

import { openUserProfile } from "../../../Utils/function.utils";
import SlidingPaneUtil from "../../../Utils/slidingPane.utils";
import HeaderWrapper from "./headerWrapper.component";
import UserList from "./userList.component";

const ChatFriendHeader = ({ refecthChatList }: any) => {
  const { handleSelectChat } = useChatContext();
  const { handleLogout } = useAuth();

  const openUsersList = () => {
    SlidingPaneUtil.open({
      component: UserList,
      openFrom: "left",
      props: {
        callback: (data?: any) => {
          SlidingPaneUtil.close();
          if (data) {
            handleSelectChat(data);
            refecthChatList();
          }
        },
      },
    });
  };

  const chatHeaderActions = [
    {
      name: "User Profile",
      icon: UserIcon,
      isReactIcon: true,
      action: openUserProfile,
    },
    {
      name: "Friends",
      icon: UserGroupIcon,
      isReactIcon: true,
      action: openUsersList,
    },
    {
      name: "Logout",
      icon: LogoutIcon,
      isReactIcon: true,
      action: handleLogout,
    },
  ];

  return (
    <HeaderWrapper>
      <div className="items-center justify-end w-full gap-4 px-4 row-flex">
        {chatHeaderActions.map((header: any, index: number) => {
          return (
            <ToolTip title={header?.name} position="bottom" key={index}>
              <Icon
                source={header.icon}
                isReactIcon={header?.isReactIcon}
                onClick={header.action}
              />
            </ToolTip>
          );
        })}
      </div>
    </HeaderWrapper>
  );
};

export default ChatFriendHeader;
