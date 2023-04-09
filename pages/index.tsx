import React from "react";
import { useTheme } from "../src/Context/useTheme.context";
import Button from "../src/Components/Button/button.component";
import { themes } from "../src/Constants/theme.constant";

const Home = () => {
	const { theme, toggleTheme, onChangeTheme } = useTheme();
	const ThemeBox = ({ theme }: any) => {
		return (
			<div
				className="p-6 cursor-pointer rounded-lg border "
				onClick={() => onChangeTheme(theme)}
				data-theme={theme}
			>
				<span className="capitalize">{theme}</span>
			</div>
		);
	};

	return (
		<div className="h-screen w-screen">
			<Button onClick={toggleTheme}>
				<div className="capitalize">
					{" "}
					Switch To {theme === "dark" ? "Light" : "Dark"}{" "}
				</div>
			</Button>
			<div className="flex items-center gap-4">
				{themes.map((theme: string) => {
					return <ThemeBox key={theme} theme={theme} />;
				})}
			</div>
		</div>
	);
};

export default Home;
