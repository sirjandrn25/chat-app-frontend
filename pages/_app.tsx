import type { AppProps } from "next/app";
import "../styles/globals.scss";

import dynamic from "next/dynamic";
import DashboardWrapper from "../src/Composites/DashboardWrapper/dashboardWrapper";
import { ProSidebarProvider } from "react-pro-sidebar";

import SlidingPaneWrapper from "../src/Components/SlidingPane/slidingPaneWrapper.component";
import SlidingPane from "../src/Utils/slidingPane.utils";

const RootContextProvider = dynamic(
	() => import("../src/Context/rootContextProvider"),
	{
		loading: () => <div>loading ...</div>,
		ssr: false,
	}
);

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="root">
			<RootContextProvider>
				<Component {...pageProps} />

				<SlidingPaneWrapper
					ref={(ref) => {
						if (ref) {
							SlidingPane.register(ref);
						}
					}}
				/>
			</RootContextProvider>
		</div>
	);
}
