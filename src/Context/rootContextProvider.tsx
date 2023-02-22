import React from "react";
import { ThemeProvider as ThemeContextProvider } from "./useTheme.context";
import { AuthContextProvider } from "./useAuth";

type RootContextProviderProps = {
	children: React.ReactNode;
};

const RootContextProvider = ({ children }: RootContextProviderProps) => {
	return (
		<ThemeContextProvider>
			<AuthContextProvider>{children}</AuthContextProvider>
		</ThemeContextProvider>
	);
};

export default RootContextProvider;
