import React from "react";
import HeaderWrapper from "../../Chat/Components/headerWrapper.component";
import { UserIcon } from "../../../Constants/imageMapping.constants";
import Icon from "../../../Components/Icon/icon.component";

const MessageHeader = () => {
	return (
		<HeaderWrapper>
			<div className="items-center gap-2 row-flex">
				<Icon source={UserIcon} isReactIcon />
			</div>
		</HeaderWrapper>
	);
};

export default MessageHeader;
