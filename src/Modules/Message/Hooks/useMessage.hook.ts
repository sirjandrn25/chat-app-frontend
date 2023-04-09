import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import useChatContext from "../../../Context/Chat/useChat.context";
import { asyncService } from "../../../Utils/service.utils";

import { NEW_MESSAGE } from "../../../Constants/websocketevent.constant";
import useNotification from "../../../Context/useNotification.context";

const fetchMessages = (id: number) => {
  return asyncService({
    end_point: `chats/${id}/messages`,
  });
};

const useMessage = () => {
  const messageRef = useRef<any>(null);
  const { addNotification } = useNotification();
  const [messageData, setMessageData] = useState<any>({});
  const { activeChat } = useChatContext();
  const { socket } = useChatContext();

  const handleReceiveMessage = useCallback(
    (data: any) => {
      if (data?.chat_id === activeChat?.id) {
        setMessageData((prev: any) => {
          return {
            ...prev,
            messages: [data, ...(prev?.messages || [])],
          };
        });
      } else {
        addNotification(data);
      }
    },
    [activeChat?.id, addNotification]
  );

  useEffect(() => {
    socket?.on(NEW_MESSAGE, handleReceiveMessage);
    return () => {
      if (!socket) return;
      socket?.off(NEW_MESSAGE, handleReceiveMessage);
    };
  }, [handleReceiveMessage, socket]);

  useEffect(() => {
    makeScrollToDown();
  }, [messageData]);

  const { messages = [], users = [] } = messageData;
  const chat_id = activeChat?.id;

  const { isLoading, refetch: refreshMessages } = useQuery(
    `chat/${chat_id}/messages`,
    () => fetchMessages(+(chat_id as string)),
    {
      enabled: !!chat_id,
      onSuccess: (response) => {
        setMessageData(response);
      },
    }
  );
  const getMessageAuthor = useCallback(
    (author_id: number) => {
      for (let user of users) {
        if (user?.user_id === author_id) return user;
      }
    },
    [users]
  );
  const makeScrollToDown = () => {
    const target: any = messageRef?.current;

    if (!target) return;

    target?.scroll({
      top: target?.scrollHeight,
      behavior: "smooth",
    });
  };
  return {
    getMessageAuthor,
    isLoading,
    refreshMessages,
    messages,
    chat_id,
    messageRef,
  };
};

export default useMessage;
