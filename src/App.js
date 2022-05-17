import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";
import "./style.css";

import Header from "./Header"
import MovieSelector from "./MovieSelector"
import TimeSelector from "./TimeSelector"
import SeatSelector from "./SeatSelector"
import Sucess from "./Sucess"

export default function App(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<MovieSelector />} />
                <Route path="/sessoes/" element={<TimeSelector />} />
                <Route path="/assentos/" element={<SeatSelector />} />
                <Route path="/sucesso" element={<Sucess />} />
            </Routes>
        </BrowserRouter>
        
    )
}