import { useContext } from "react";
import ChatContext from "./chatProvider.context";

export default function useChatContext() {
	return useContext(ChatContext);
}
