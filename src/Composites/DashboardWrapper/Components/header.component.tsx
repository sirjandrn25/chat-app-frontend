import { useProSidebar } from "react-pro-sidebar";
import Icon from "../../../Components/Icon/icon.component";
import { ToggleIcon } from "../../../Constants/imageMapping.constants";
import { useTheme } from "../../../Context/useTheme.context";

const Header = () => {
	const { collapseSidebar } = useProSidebar();
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="navbar shadow-lg bg-base-100 ">
			<div className="flex-1 flex gap-4 px-4">
				<Icon
					onClick={() => collapseSidebar()}
					source={ToggleIcon}
					isReactIcon
				/>
				<input
					type="checkbox"
					className="toggle"
					onChange={(e: any) => {
						toggleTheme();
					}}
					checked={theme === "dark"}
				/>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a>Item 1</a>
					</li>

					<li></li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
