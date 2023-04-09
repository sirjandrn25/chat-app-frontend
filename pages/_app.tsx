import type { AppProps } from "next/app";
import "../styles/globals.scss";

import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ModalWrapper from "../src/Components/Modal/modalWrapper.component";
import SlidingPaneWrapper from "../src/Components/SlidingPane/slidingPaneWrapper.component";

import ModalUtil from "../src/Utils/modal.utils";
import SlidingPane from "../src/Utils/slidingPane.utils";
import dynamic from "next/dynamic";
const DashboardWrapper = dynamic(
  () => import("../src/Composites/DashboardWrapper/dashboardWrapper"),
  {
    loading: () => <div>Loading ...</div>,
    ssr: false,
  }
);

const queryClient = new QueryClient();

const RootContextProvider = dynamic(
  () => import("../src/Context/rootContextProvider"),
  {
    loading: () => <div>loading ...</div>,
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  // const state = useLocation();
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

            <ModalWrapper
              ref={(ref) => {
                if (ref) {
                  ModalUtil.register(ref);
                }
              }}
            />
          </DashboardWrapper>
        </RootContextProvider>
      </div>
    </QueryClientProvider>
  );
}
