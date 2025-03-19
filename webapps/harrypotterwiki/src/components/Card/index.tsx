import { NavLink } from "react-router-dom";
import { eachCharacterData } from "../../types";

interface props {
	characterInfo: eachCharacterData;
}

function index({ characterInfo }: props) {
	return (
		<NavLink
			to={{
				pathname: "characters/" + characterInfo.id,
			}}
			state={characterInfo}
		>
			<div className="overflow-hidden card border-gray-400  border-2  max-w-64 rounded-2xl h-72 bg-gray-50">
				<div className="card-top  h-4/5 overflow-hidden bg-gray-300">
					<img
						src={characterInfo.image || "./hp-logo.svg"}
						alt={characterInfo.name}
						className="rounded-xl h-full img"
						loading="lazy"
					/>
				</div>
				<hr />
				<div className="card-bottom h-1/5  text-xl font-semibold ">
					<h4 className="text-center text-black">{characterInfo.name}</h4>
				</div>
			</div>
		</NavLink>
	);
}

export default index;
