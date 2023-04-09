import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import Button from "../../Components/Button/button.component";
import Icon from "../../Components/Icon/icon.component";
import {
  EmojiIcon,
  SendAttachementIcon,
} from "../../Constants/imageMapping.constants";
import useNavigation from "../../Hooks/useNavigation.hook";
import { asyncService } from "../../Utils/service.utils";
import ChatBubble from "../Chat/Components/chatBubble.component";
import MessageHeader from "./Components/message.header.component";
import useMessage from "./Hooks/useMessage.hook";
import useChatContext from "../../Context/Chat/useChat.context";
import { NEW_MESSAGE } from "../../Constants/websocketevent.constant";

const Message = () => {
  const {
    chat_id,
    messageRef,
    messages,
    isLoading,
    getMessageAuthor,
    refreshMessages,
  } = useMessage();

  if (!chat_id)
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        No Chat Available
      </div>
    );

  return (
    <div className="w-full h-full col-flex ">
      <MessageHeader />
      <div
        ref={messageRef}
        className="flex-1 w-full overflow-y-auto bg-base-200"
      >
        {isLoading && <div className="p-4 row-flex">Loading ...</div>}
        <div className="flex flex-col-reverse flex-1 w-full p-4">
          {messages.map((message: any) => {
            return (
              <ChatBubble
                key={message?.id}
                message={message}
                author={getMessageAuthor(message?.author_id)}
              />
            );
          })}
        </div>
      </div>

      <MessageSendInputBox refreshMessages={refreshMessages} />
    </div>
  );
};

const sendMessageApi = (data: any, chat_id: number) => {
  return asyncService({
    end_point: `chats/${chat_id}/messages`,
    method: "post",
    classParams: data,
  });
};

const MessageSendInputBox = ({ refreshMessages }: any) => {
  const { query } = useNavigation();
  const { chat_id } = query;
  const [message, setMessage] = useState<string>("");
  const { socket, activeChat } = useChatContext();

  const { mutate: handleSendMessage } = useMutation(
    (data: any) => sendMessageApi(data, +(chat_id as string)),
    {
      onSuccess: (response: any) => {
        refreshMessages();
        socket.emit(NEW_MESSAGE, {
          ...response,
          users: activeChat?.users,
        });
        setMessage("");
      },
    }
  );
  const handleSubmit = useCallback(() => {
    handleSendMessage({ content: message });
  }, [handleSendMessage, message]);
  return (
    <div className="items-center gap-4 p-4 row-flex ">
      <div className="items-center gap-4 row-flex">
        <Icon source={EmojiIcon} isReactIcon />
        <Icon source={SendAttachementIcon} isReactIcon />
      </div>
      <form action="" onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="items-center flex-1 gap-4 row-flex">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              const value = e.target.value;
              setMessage(value);
            }}
            className="w-full input "
            placeholder="enter message"
          />
          <Button
            onClick={handleSubmit}
            color="accent"
            className="px-10"
            disabled={!message}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Message;
