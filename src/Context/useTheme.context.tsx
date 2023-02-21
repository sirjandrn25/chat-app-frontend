import { createContext, useContext, useState } from "react";
import { useEffectOnce } from "react-use";
import { getLocalState, setLocalState } from "../Utils/storage.utils";

type themeTypes = "dark" | "light" | "night" | "cupcake" | "cmyk" | "luxury";
const theme_key: string = "theme_storage";

type ThemeContextProviderProps = {
	children: React.ReactNode;
};
interface ThemeContextInterface {
	theme: themeTypes;
	onChangeTheme: (value: themeTypes) => void;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface>({
	theme: "dark",
	onChangeTheme: () => {},
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
	const [theme, setTheme] = useState<themeTypes>("light");
	const onChangeTheme = (currentTheme: themeTypes) => {
		if (!document) return;
		(document as any)
			.querySelector("html")
			.setAttribute("data-theme", currentTheme);
		setTheme(currentTheme);
		setLocalState(theme_key, currentTheme);
	};

	useEffectOnce(() => {
		if (!document) return;
		const localStateTheme: themeTypes = getLocalState(theme_key);

		if (localStateTheme) {
			onChangeTheme(localStateTheme);
			return;
		}
		const isDarkTheme = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		onChangeTheme(isDarkTheme ? "dark" : "light");
	});

	const toggleTheme = () => {
		if (theme === "dark") {
			onChangeTheme("light");
		} else {
			onChangeTheme("dark");
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, onChangeTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const { theme, onChangeTheme, toggleTheme } = useContext(ThemeContext);
	return { theme, onChangeTheme, toggleTheme };
};

export default ThemeContext;
