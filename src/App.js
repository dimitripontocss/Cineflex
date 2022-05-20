import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";
import React from "react";


import Header from "./components/Header/Header"
import MovieSelector from "./components/MovieSelector/MovieSelector"
import TimeSelector from "./components/TimeSelector/TimeSelector"
import SeatSelector from "./components/SeatSelector/SeatSelector"
import Sucess from "./components/Sucess/Sucess"

export default function App(){  
    const [infos,setInfos] = React.useState({})
    
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <MovieSelector />} />
                <Route path="/sessoes/:idMovie" element={<TimeSelector />} />
                <Route path="/assentos/:idSession" element={<SeatSelector infos={infos} setInfos={setInfos} />} />
                <Route path="/sucesso" element={<Sucess infos={infos} />} />
            </Routes>
        </BrowserRouter>
        
    )
}