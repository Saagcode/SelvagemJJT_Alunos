import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes;
