import React from "react";
import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Icon from "../Icon/icon.component";
import { DownLineIcon } from "../../Constants/imageMapping.constants";

export interface MenuItemInterface {
	name: string;
	key: string;
	action?: (data?: any) => void;
	icon?: any;
	iconSize?: number;
	isSvg?: boolean;
}

export interface MenuInterface {
	displayLabel?: string | any;
	showArrow?: boolean;
	direction?: "right" | "top" | "bottom" | "left";
	align?: "start" | "center" | "end";
	position?: string;
	scroll?: string;
	options: MenuItemInterface[];
	isOffset?: boolean;
	offsetPosition?: number;
	className?: string;
	itemClassName?: string;
}

const ActionMenu = ({
	displayLabel,
	showArrow = true,
	direction = "right",
	position = "anchor",
	align = "start",
	scroll = "auto",
	options,
	isOffset = false,
	offsetPosition = 12,
	className = "",
	itemClassName = "",
}: MenuInterface) => {
	return (
		<Menu
			className={className}
			menuButton={
				<MenuButton>
					{displayLabel || (
						<Icon src={DownLineIcon} isReactIcon={true} />
					)}
				</MenuButton>
			}
			direction={direction}
			align={align}
			position={position}
			viewScroll={scroll}
			arrow={showArrow}
			offsetX={
				isOffset && (direction === "left" || direction === "right")
					? offsetPosition
					: 0
			}
			offsetY={
				isOffset && (direction === "top" || direction === "bottom")
					? offsetPosition
					: 0
			}
		>
			{options.map((option, index) => (
				<MenuItem
					key={option?.key || index}
					onClick={() => {
						if (option?.action) return option.action();
					}}
					className={`flex items-center gap-2 ${itemClassName}`}
				>
					{option.icon && (
						<Icon
							src={option.icon}
							size={option.iconSize || 20}
							isReactIcon={option.isSvg ? false : true}
						/>
					)}
					<div>{option.name}</div>
				</MenuItem>
			))}
		</Menu>
	);
};

export default ActionMenu;
