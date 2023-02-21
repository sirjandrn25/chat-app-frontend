import { ReactNode } from "react";
import Header from "./Components/header.component";
import CustomSidebar from "./Components/sidebar.component";
import SlidingPane from "../../Components/SlidingPane/slidingPane.component";

type dashboardWrapperProps = {
	children: ReactNode;
};

const DashboardWrapper = ({ children }: dashboardWrapperProps) => {
	return (
		<div className="h-screen bg-base-200 flex  w-screen">
			<CustomSidebar />

			<main className="w-full h-full">
				<Header />
				{children}
			</main>
		</div>
	);
};

export default DashboardWrapper;
