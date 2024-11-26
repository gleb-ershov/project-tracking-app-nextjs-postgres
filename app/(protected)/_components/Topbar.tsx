import { Searchbar } from "../../../components/common/Searchbar";
import { UserControls } from "./UserControls";

export const Topbar = () => {
	return (
		<div className="flex items-center justify-between gap-8 h-fit">
			<Searchbar />
			<UserControls />
		</div>
	);
};
