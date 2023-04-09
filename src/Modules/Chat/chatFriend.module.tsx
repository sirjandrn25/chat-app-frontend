import InputField from "../../Components/Input/inputField.component";
import useChatContext from "../../Context/Chat/useChat.context";
import ChatFriendHeader from "./Components/chatFriend.header.component";
import ChatFriendDetail from "./Components/chatFriendDetail.component";

const ChatFriend = () => {
  const { fetchChats, chats, chatStates, handleSelectChat, activeChat } =
    useChatContext();
  const { loading, success } = chatStates || {};

  return (
    <div className="flex flex-col h-full border-r">
      <ChatFriendHeader {...{ refecthChatList: fetchChats }} />
      <ChatSearch />
      <div className="flex-1 overflow-y-auto col-flex">
        <div className="h-full col-flex">
          {loading && <div className="p-4">Loading ...</div>}
          {!loading &&
            success &&
            chats.map((chat: any, index: number) => {
              return (
                <ChatFriendDetail
                  onClick={() => handleSelectChat(chat)}
                  chat={chat}
                  key={chat?.id}
                  active={chat?.id === activeChat?.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const ChatSearch = () => {
  const { handleFilterchat } = useChatContext();
  return (
    <div className="w-full p-4 border-b">
      <InputField onDebounceChange={(value) => handleFilterchat(value)} />
    </div>
  );
};

export default ChatFriend;
