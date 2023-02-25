import React from "react";
import ChatFriend from "./chatFriend.module";
import Message from "./message.module";

const Chat = () => {
	return (
		<div className="flex w-screen h-screen overflow-hidden">
			<div className="w-1/4 h-full">
				<ChatFriend />
			</div>
			<div className="w-full h-full">
				<Message />
			</div>
		</div>
	);
};

export default Chat;
