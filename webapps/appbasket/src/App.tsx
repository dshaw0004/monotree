import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import NotFound from "./pages/404";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/store";

export default function App(){
return (
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/store' element={<StorePage/>} />
    <Route path='/about' element={<About/>} />
    <Route path='*' element={<NotFound/>} />
    </Routes>

);
}
