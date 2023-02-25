import React, { useCallback, useState } from "react";
import MessageHeader from "./Components/message.header.component";
import ChatBubble from "./Components/chatBubble.component";
import axios from "axios";
import { BASE_URL } from "../../Constants/api.constant";
import { useQuery } from "react-query";
import useNavigation from "../../Hooks/useNavigation.hook";
import { AuthUser } from "../../Utils/authentication.utils";
import InputField from "../../Components/Input/inputField.component";

const fetchMessages = async (id: number) => {
	const { access_token } = AuthUser.getLoggedDetail();
	return axios({
		url: `${BASE_URL}/chats/${id}/messages`,
		method: "get",
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

const Message = () => {
	const { query } = useNavigation();
	const [messageData, setMessageData] = useState<any>({});
	const { messages = [], users = [] } = messageData;

	const { chat_id } = query;
	const { isLoading } = useQuery(
		`chat/${chat_id}/messages`,
		() => fetchMessages(+(chat_id as string)),
		{
			enabled: !!chat_id,
			onSuccess: ({ data }) => {
				setMessageData(data);
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

	if (!chat_id) return <></>;

	return (
		<div className="w-full h-full col-flex ">
			<MessageHeader />
			<div className="flex-1 w-full overflow-y-auto ">
				<div className="!flex-col-reverse h-full p-4 col-flex bg-base-200">
					{isLoading && (
						<div className="p-4 row-flex">Loading ...</div>
					)}
					{messages.map((message: any) => {
						return (
							<ChatBubble
								key={message?.id}
								message={message}
								author={getMessageAuthor(message?.author_id)}
							/>
						);
					})}
					{/* <ChatBubble /> */}
				</div>
			</div>
			<div className="items-center gap-4 p-4 row-flex">
				<InputField />
			</div>
		</div>
	);
};

export default Message;
