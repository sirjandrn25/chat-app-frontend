import { BiChat } from "react-icons/bi";
import Button from "../../../Components/Button/button.component";
import Icon from "../../../Components/Icon/icon.component";
import ToolTip from "../../../Components/Tooltip/toolTip.component";
import useAuth from "../../../Composites/DashboardWrapper/Hooks/useAuth.hook";
import { UserGroupIcon } from "../../../Constants/imageMapping.constants";
import useChatContext from "../../../Context/Chat/useChat.context";

import SlidingPaneUtil from "../../../Utils/slidingPane.utils";
import HeaderWrapper from "./headerWrapper.component";
import UserList from "./userList.component";
import ModalUtil from "../../../Utils/modal.utils";
import GroupChat from "./groupChat.component";

const ChatFriendHeader = ({ refecthChatList }: any) => {
  const { handleSelectChat } = useChatContext();
  const { handleLogout } = useAuth();

  const openUsersList = () => {
    SlidingPaneUtil.open({
      component: UserList,
      headTitle: "Search Friends",
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

  const openGroupChat = () => {
    return ModalUtil.open({
      component: GroupChat,
      props: {
        callback: (data: any) => {
          // handleSelectChat(data);
          // refecthChatList();
        },
      },
    });
  };

  const chatHeaderActions = [
    // {
    //   name: "User Profile",
    //   icon: UserIcon,
    //   isReactIcon: true,
    //   action: openUserProfile,
    // },
    {
      name: "New Group",
      icon: UserGroupIcon,
      isReactIcon: true,
      action: openGroupChat,
    },
    {
      name: "New Chat",
      icon: BiChat,
      isReactIcon: true,
      action: openUsersList,
    },
    // {
    //   name: "Logout",
    //   icon: LogoutIcon,
    //   isReactIcon: true,
    //   action: handleLogout,
    // },
  ];

  return (
    <HeaderWrapper>
      <div className="items-center justify-end w-full gap-4 px-4 row-flex">
        {chatHeaderActions.map((header: any, index: number) => {
          return (
            <ToolTip title={header?.name} position="bottom" key={index}>
              <Button
                className="h-10 w-11 bg-base-200 hover:bg-base-300 border-base-200"
                size="sm"
                shape="square"
              >
                <Icon
                  source={header.icon}
                  isReactIcon={header?.isReactIcon}
                  onClick={header.action}
                  size={25}
                />
              </Button>
            </ToolTip>
          );
        })}
      </div>
    </HeaderWrapper>
  );
};

export default ChatFriendHeader;
