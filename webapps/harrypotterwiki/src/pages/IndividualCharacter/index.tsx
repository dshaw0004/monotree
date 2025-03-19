import { useEffect, useState } from "react";
import { Params, useLocation, useParams } from "react-router-dom";
import "../../index.css";
import { eachCharacterData } from "../../types";
import "./index.css";

export default function index() {
	const [characterInfo, setCharacterInfo] = useState<eachCharacterData>();
	const location = useLocation();
	const params: Readonly<Params<string>> = useParams();
	useEffect(() => {
		if (!!location.state) {
			setCharacterInfo((_) => location.state);
			return;
		}
		(async function () {
			const response = await fetch(
				"https://hp-api.onrender.com/api/character/" + params.id
			);
			const fetchedData = await response.json();
			setCharacterInfo((_) => fetchedData[0]);
		})();
	}, []);
	if (!characterInfo) {
		return <div>Loading...</div>;
	}
	return (
		<main className="main-content">
			<h1 className="text-center font-bold">{characterInfo.name}</h1>
			<img
				src={characterInfo.image || "/hp-logo.svg"}
				alt={`image of ${characterInfo.name}`}
				className="img rounded bg-white"
				style={{ height: "40vh" }}
			/>

			<section aria-label="About the character">
				<h2 className="text-2xl font-semibold">About the character:</h2>
				<p>
					{(characterInfo.hogwartsStaff || characterInfo.hogwartsStudent) &&
						`${characterInfo.name} is a 
						${characterInfo.hogwartsStaff ? "Stuff" : "Student"} of Hogwarts.`}
					{!!characterInfo.alternate_names.length &&
						`
					Also know as : ${characterInfo.alternate_names.join(", ")}.
				`}
				</p>
				<div className="grid grid-cols-2 justify-between mt-2">
					<p>
						Gender: <span className="font-bold">{characterInfo.gender}</span>
					</p>
					<p>
						Species: <span className="font-bold">{characterInfo.species}</span>
					</p>
					<p>
						Eye Colour:{" "}
						<span className="font-bold">{characterInfo.eyeColour}</span>
					</p>
					<p>
						Hair Colour:{" "}
						<span className="font-bold">{characterInfo.hairColour}</span>
					</p>
					<p>
						House: <span className="font-bold">{characterInfo.house}</span>
					</p>
					<p>
						Date of Birth:{" "}
						<span className="font-bold">{characterInfo.dateOfBirth}</span>
					</p>
					{characterInfo.patronus && (
						<p>
							Patronus:{" "}
							<span className="font-bold">{characterInfo.patronus}</span>
						</p>
					)}
					<p>
						Ancestry:{" "}
						<span className="font-bold">{characterInfo.ancestry}</span>
					</p>
				</div>
				<p className="">
					The character was {characterInfo.alive ? "alive" : "not alive"} at the
					end of the series.
				</p>
				<h3 className="font-semibold text-2xl my-2">About the wond:</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 justify-between my-2">
					<p>
						Wood: <span className="font-bold">{characterInfo.wand.wood}</span>
					</p>
					<p>
						Length:{" "}
						<span className="font-bold">{characterInfo.wand.length}</span>
					</p>
					<p>
						Core: <span className="font-bold">{characterInfo.wand.core}</span>
					</p>
				</div>
			</section>
			<section>
				<p>
					The role was played by -{" "}
					<a
						className="font-bold text-lg"
						href={
							"https://en.wikipedia.org/wiki/" +
							characterInfo.actor.replace(" ", "_")
						}
						target="_blank"
					>
						{characterInfo.actor}
					</a>
				</p>
			</section>
		</main>
	);
}
