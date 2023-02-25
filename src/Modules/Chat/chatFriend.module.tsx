import React, { useMemo, useState } from "react";
import ChatFriendHeader from "./Components/chatFrient.header.component";
import InputField from "../../Components/Input/inputField.component";
import Avatar from "../../Components/Avatar/avatar.component";
import { AuthUser } from "../../Utils/authentication.utils";
import { useQuery } from "react-query";
import axios from "axios";
import { CHAT_LIST_URL } from "../../Constants/api.constant";
import useNavigation from "../../Hooks/useNavigation.hook";

const fetchChatList = async () => {
	const { access_token } = AuthUser.getLoggedDetail();
	return await axios({
		url: CHAT_LIST_URL,
		method: "get",
		headers: {
			Authorization: `Authorization ${access_token}`,
		},
	});
};

const ChatFriend = () => {
	const [chats, setChats] = useState([]);
	const { navigation, pathname, query } = useNavigation();
	const { chat_id = "" } = query;

	const { isLoading, isError, isSuccess } = useQuery(
		"chat_list",
		fetchChatList,
		{
			onSuccess: ({ data }) => {
				setChats(data?.data);
			},
		}
	);

	const handleSelectChat = (id: number) => {
		navigation({
			pathname: pathname,
			queryParams: {
				chat_id: id,
			},
		});
	};

	return (
		<div className="flex flex-col h-full border-r">
			<ChatFriendHeader />
			<FriendSearch />
			<div className="flex-1 overflow-y-auto col-flex">
				<div className="h-full col-flex">
					{isLoading && <div className="p-4">Loading ...</div>}
					{!isLoading &&
						isSuccess &&
						chats.map((chat: any, index: number) => {
							return (
								<ChatFriendDetail
									onClick={() => handleSelectChat(chat?.id)}
									chat={chat}
									key={chat?.id}
									active={chat?.id === +chat_id}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

const FriendSearch = () => {
	return (
		<div className="w-full p-4 border-b">
			<InputField
				onDebounceChange={(value) => {
					console.log(value);
				}}
			/>
		</div>
	);
};

interface ChatFriendDetailInterface {
	chat?: any;
	onClick?: (id: any) => void;
	active?: boolean;
}

const ChatFriendDetail = ({
	chat,
	active,
	onClick,
}: ChatFriendDetailInterface) => {
	const { users = [], is_group, title } = chat || {};
	const { user: currentUser } = AuthUser.getLoggedDetail();

	const chatTitle = useMemo(() => {
		if (is_group) return title;
		const { user: friend } = users.filter(
			(user: any) => user?.id !== currentUser?.id
		)[0];

		return `${friend?.profile?.first_name} ${friend?.profile?.last_name}`;
	}, [currentUser?.id, is_group, title, users]);

	return (
		<div
			className={`items-center justify-start w-full gap-2 px-4 py-2 border-b cursor-pointer row-flex hover:bg-base-200 ${
				active ? "bg-base-200" : ""
			}`}
			onClick={onClick}
		>
			<Avatar />
			<div className="w-full col-flex">
				<div className="items-center justify-between w-full row-flex">
					<div className="font-bold capitalize ">{chatTitle}</div>
					<div className="text-xs">9:30 PM</div>
				</div>
				<div className="text-sm ">last message</div>
			</div>
		</div>
	);
};

export default ChatFriend;
