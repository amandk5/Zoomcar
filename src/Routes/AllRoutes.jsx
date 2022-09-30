import { Route, Routes } from "react-router-dom";
import HelpAndSupportPage from "./HelpAndSupportPage";
import HomePage from "./HomePage";
import ResultsPage from "./ResultsPage";

export default function AllRoutes(){
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/faq" element={<HelpAndSupportPage/>}/>
            <Route path="/search" element={<ResultsPage/>}/>
        </Routes>
    )
}