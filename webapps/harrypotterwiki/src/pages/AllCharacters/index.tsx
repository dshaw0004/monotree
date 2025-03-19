import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { eachCharacterData } from "../../types";

export default function AllCharacters() {
	const [allCharacters, setAllCharacters] = useState<Array<eachCharacterData>>(
		[]
	);
	useEffect(() => {
		(async function () {
			const res = await fetch("https://hp-api.onrender.com/api/characters");
			const data = await res.json();
			setAllCharacters((_) => {
				return data;
			});
		})();
	}, []);
	return (
		<>
			<h1 className="text-center font-bold text-4xl text-teal-900">
				Harry Potter Characters
			</h1>
			<main className="main-content">
				<div className="card-container grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto w-fit">
					{allCharacters &&
						allCharacters.map((charac) => {
							return <Card key={charac.name} characterInfo={charac} />;
						})}
				</div>
			</main>
		</>
	);
}
