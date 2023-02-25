import type { AppProps } from "next/app";
import "../styles/globals.scss";

import dynamic from "next/dynamic";

import SlidingPaneWrapper from "../src/Components/SlidingPane/slidingPaneWrapper.component";
import SlidingPane from "../src/Utils/slidingPane.utils";
import { QueryClient, QueryClientProvider } from "react-query";
import DashboardWrapper from "../src/Composites/DashboardWrapper/dashboardWrapper";
const queryClient = new QueryClient();

const RootContextProvider = dynamic(
	() => import("../src/Context/rootContextProvider"),
	{
		loading: () => <div>loading ...</div>,
		ssr: false,
	}
);

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="root">
				<RootContextProvider>
					<DashboardWrapper>
						<Component {...pageProps} />

						<SlidingPaneWrapper
							ref={(ref) => {
								if (ref) {
									SlidingPane.register(ref);
								}
							}}
						/>
					</DashboardWrapper>
				</RootContextProvider>
			</div>
		</QueryClientProvider>
	);
}
