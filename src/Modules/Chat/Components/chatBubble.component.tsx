import React, { useMemo } from "react";
import { AuthUser } from "../../../Utils/authentication.utils";

interface ChatBubbleInterface {
	message: any;
	onClick?: () => void;
	author?: any;
}

const ChatBubble = ({ message, onClick, author = {} }: ChatBubbleInterface) => {
	const { content, author_id, user_id } = message;
	const { user, is_admin } = author;
	const currentUser = useMemo(() => {
		const { user } = AuthUser.getLoggedDetail() || {};
		return user;
	}, []);
	const isUserMessage = useMemo(() => {
		return author_id === currentUser?.id;
	}, [currentUser?.id, author_id]);
	const fullName = useMemo(() => {
		return `${user?.profile?.first_name} ${user?.profile?.last_name}`;
	}, [user?.profile?.first_name, user?.profile?.last_name]);

	return (
		<div className={`chat ${isUserMessage ? "chat-end" : "chat-start"}`}>
			<div className={`items-center  gap-2 chat-header row-flex`}>
				<span className="capitalize">{fullName}</span>
				<time className="text-xs opacity-50">12:45 AM</time>
			</div>
			<div className="chat-bubble">{content}</div>
			<div className="opacity-50 chat-footer">Delivered</div>
		</div>
	);
};

export default ChatBubble;
