import { useParams } from 'react-router-dom';
import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./TimeSelector.css"
import Loading from "../Loading/Loading"


function Timetable({time}){
    return(
        <Link to={`/assentos/${time.id}`} style={{ textDecoration: 'none' }}>
            <div className="time">
                {time.name}
            </div>
        </Link>
    )
}

function Days({day}){
    return(
        <div>
            <p>{day.weekday} - {day.date}</p>
            <div className="timetable">
                {day.showtimes.map((time,index)=> <Timetable key={index}time={time} />)}
            </div>
        </div>
    )
}

function setter(response,setSelectedMovie,setDays){
    setSelectedMovie(response.data);
    setDays(response.data.days);
}

export default function TimeSelector(){

    const {idMovie} = useParams();

    const [selectedMovie, setSelectedMovie] = React.useState({})
    const [days,setDays] = React.useState([])

    React.useEffect( () => {
        const promiseMovie = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`)
        promiseMovie.then((response)=> setter(response,setSelectedMovie,setDays))
    }, [])
    
    return(
        <div className="selectorSections">
            <h3>Selecione o horário</h3>
            <div className="sections">
                {days.length === 0 ? <Loading /> : days.map((day)=> <Days key={day.id} day={day} />)}
            </div>
            <div className="footerSections">
                <img src={selectedMovie.posterURL}/>
                <span>{selectedMovie.title}</span>
            </div>
        </div>
    )
}