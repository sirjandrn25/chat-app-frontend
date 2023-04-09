import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useEffectOnce, useList } from "react-use";
import useNavigation from "../../Hooks/useNavigation.hook";
import useUser from "../../Hooks/useUser.hook";
import {
  EmptyFunction,
  GetObjectFromArray,
  IsEmptyObject,
  getChatTitle,
} from "../../Utils/common.utils";
import { asyncService } from "../../Utils/service.utils";

import { io } from "socket.io-client";
import { CHAT_JOIN, SETUP } from "../../Constants/websocketevent.constant";
import { DOMAIN_URL } from "../../Constants/api.constant";
let socket: any;

interface ChatContextInterface {
  chats: any[];
  fetchChats: () => void;
  handleAddToChat: () => void;
  handleSelectChat: (chat: any) => void;
  handleDeleteChat: () => void;
  chatStates: chatStateType;
  activeChat: any;
  socket?: any;
  handleFilterchat: (value: any) => void;
}

type chatStateType = {
  loading: boolean;
  error: boolean;
  success: boolean;
};

const ChatContext = createContext<ChatContextInterface>({
  chats: [],
  fetchChats: EmptyFunction,
  handleAddToChat: EmptyFunction,
  handleSelectChat: EmptyFunction,
  handleDeleteChat: EmptyFunction,
  chatStates: {
    loading: false,
    error: false,
    success: false,
  },
  activeChat: undefined,
  socket: undefined,
  handleFilterchat: EmptyFunction,
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { navigation, pathname, query } = useNavigation();
  const { user: loggedUser } = useUser();
  const [search, setSearch] = useState<string>("");

  useEffectOnce(() => {
    socket = io(DOMAIN_URL);
    socket.emit(SETUP, loggedUser?.id);
    socket.on("connected", (data: any) => {
      console.log("connected this user ", data);
      // it helps to show online user
    }); //join room with user id
  });
  const [activeChat, setActiveChat] = useState<any>();

  const {
    isLoading,
    isError,
    isSuccess,
    refetch: fetchChats,
    data: response,
  } = useQuery("chat_list", fetchChatListApi, {
    retry: 2,
  });
  const { data: chats = [] } = (response as any) || {};

  //handle selected chat initially or reload condition
  useEffectOnce(() => {
    const { chat_id } = query || {};
    if (!chat_id) return;
    const chat = GetObjectFromArray(chats, "id", +chat_id);

    if (!chat || IsEmptyObject(chat)) return;
    handleSelectChat(chat);
  });

  const chatStates: chatStateType = {
    loading: isLoading,
    success: isSuccess,
    error: isError,
  };

  const handleAddToChat = () => {};

  //handle active selected chat and maintain state when reloading
  const handleSelectChat = (chat: any) => {
    setActiveChat(chat);
    socket.emit(CHAT_JOIN, chat.id);
    navigation({
      pathname: pathname,
      queryParams: {
        chat_id: chat?.id,
      },
    });
  };
  const handleDeleteChat = () => {};

  const filterChats = () => {
    if (!search) return chats;
    return (chats || []).filter((chat: any) => {
      return getChatTitle(chat).includes(search);
    });
  };
  const handleFilterchat = (value: any) => {
    setSearch(value);
  };

  return (
    <ChatContext.Provider
      value={{
        handleAddToChat,
        handleSelectChat,
        handleDeleteChat,
        fetchChats,
        chats: filterChats(),
        chatStates,
        activeChat,
        socket,
        handleFilterchat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

function fetchChatListApi() {
  return asyncService({
    end_point: "chats",
  });
}

export default ChatContext;
