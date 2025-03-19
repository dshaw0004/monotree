import { Route, Routes } from "react-router-dom";
import AllCharacters from "./pages/AllCharacters";
import IndividualCharacter from "./pages/IndividualCharacter";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<AllCharacters />} />
				<Route path="/characters" element={<AllCharacters />}></Route>
				<Route path="characters/:id" element={<IndividualCharacter />} />
			</Routes>
		</>
	);
}

export default App;
