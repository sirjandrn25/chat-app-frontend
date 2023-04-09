import React, { lazy } from "react";

import Message from "../Message/message.module";
import { ChatProvider } from "../../Context/Chat/chatProvider.context";

const ChatFriend = lazy(() => import("./chatFriend.module"));

const Chat = () => {
  return (
    <ChatProvider>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="w-1/4 h-full">
          <ChatFriend />
        </div>
        <div className="w-full h-full">
          <Message />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Chat;
