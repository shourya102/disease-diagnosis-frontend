import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ResponseBot from "./pages/ResponseBot/ResponseBot.jsx";
import Header from "./components/Header/Header.jsx";

function App() {

    return (
        <>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/response-bot" element={<ResponseBot/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
