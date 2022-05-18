import { useParams } from 'react-router-dom';
import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./SeatSelector.css"
import Loading from "../Loading/Loading"

function Footer({selected}){
    return(
        <>
            <img src={selected.movie.posterURL}/>
            <div className='dados'>
            <span>{selected.movie.title}</span>
            <span>{selected.day.weekday} - {selected.name}</span>
            </div>
        </>
    )
}

export default function SeatSelector(){
    const {idSession} = useParams()

    const [selected, setSelected] = React.useState({})
    const [verificador, setVerificador] = React.useState(true)

    React.useEffect( () => {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`)
        promiseSeats.then((response)=> {setSelected(response.data); setVerificador(false) })
    }, [])
    console.log(selected)

    return(
        <div className="selectorSeats">
            <h3>Selecione o horário</h3>
            <div className="seats">
                
            </div>
            <div className="footerSeats">
                { verificador ? <></> : <Footer selected={selected}/> }
            </div>
        </div>
    )
}