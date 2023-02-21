import React from "react";
import { ThemeProvider as ThemeContextProvider } from "./useTheme.context";

type RootContextProviderProps = {
	children: React.ReactNode;
};

const RootContextProvider = ({ children }: RootContextProviderProps) => {
	return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

export default RootContextProvider;
