import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"
import axios from "axios"
import "./reset.css";


import Header from "./components/Header/Header"
import MovieSelector from "./components/MovieSelector/MovieSelector"
import TimeSelector from "./components/TimeSelector/TimeSelector"
import SeatSelector from "./components/SeatSelector/SeatSelector"
import Sucess from "./components/Sucess/Sucess"

export default function App(){

    React.useEffect( () => {
        const promiseMovies = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        promiseMovies.then(()=>console.log(promiseMovies))
    }, [])
    
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <MovieSelector />} />
                <Route path="/sessao" element={<TimeSelector />} />
                <Route path="assento" element={<SeatSelector />} />
                <Route path="/sucesso" element={<Sucess />} />
            </Routes>
        </BrowserRouter>
        
    )
}