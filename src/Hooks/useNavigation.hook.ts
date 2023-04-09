import { useRouter } from "next/router";
import { useEffect } from "react";

type navigationProps = {
	pathname: string;
	queryParams?: Object;
	replace?: boolean;
};

const useNavigation = () => {
	const router = useRouter();

	useEffect(() => {}, []);
	const { pathname, asPath, query, basePath, isReady } = router;

	const navigation = ({
		pathname,
		queryParams = {},
		replace = false,
	}: navigationProps) => {
		if (replace) {
			router.replace(`/${pathname}`, `/${pathname}`, queryParams);
			return;
		}
		router.push({
			pathname: `${pathname}`,
			query: { ...queryParams },
		});
	};
	const pressBack = () => router.back(-1);
	return {
		navigation,
		pathname,
		asPath,
		query,
		basePath,
		isReady,
		pressBack,
	};
};

export default useNavigation;
