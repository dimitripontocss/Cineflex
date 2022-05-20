import { useParams } from 'react-router-dom';
import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./SeatSelector.css"
import Loading from "../Loading/Loading"

function Footer({selected}){
    return(
        <>
            <img src={selected.movie.posterURL} alt="Movie"/>
            <div className='dados'>
            <span>{selected.movie.title}</span>
            <span>{selected.day.weekday} - {selected.name}</span>
            </div>
        </>
    )
}

function Selected({seat}){
    return(
        <div className="seat selected">
            <p>{seat.name}</p>
        </div>
    )
}

function Empty({seat}){
    return(
        <div className="seat available">
            <p>{seat.name}</p>
        </div>
    )
}

function Ocupied({seat}){
    console.log(seat)
    return(
        <div className="seat ocupied">
            <p>{seat.name}</p>
        </div>
    )
}

function Seat({seat}){
    return(
        <>
        {seat.isAvailable ? <Empty seat={seat}/> : <Ocupied seat={seat}/>}
        </>
    )
}

export default function SeatSelector(){
    const {idSession} = useParams()

    const example = {name:""}

    const [name,setName] = React.useState("")
    const [cpf,setCpf] = React.useState("")
    const [selected, setSelected] = React.useState({})
    const [verificador, setVerificador] = React.useState(true)

    function sendInfo(event){
        event.preventDefault();
        const data = {
            id: [1,2,3],
            name: name,
            cpf: cpf
        }
        console.log(data)
    }

    React.useEffect( () => {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`)
        promiseSeats.then((response)=> {setSelected(response.data); setVerificador(false) })
    }, [])

    return(
        <div className="selectorSeats">
            <h3>Selecione o(s) assento(s)</h3>
            <div className="seats">
                {verificador ? <Loading /> : selected.seats.map((seat,index)=> <Seat key={index} seat={seat}/>)}
            </div>
            <div className="examples">
                <div>
                {
                    <Selected seat={example} />
                }
                    <p>Selecionado</p>
                </div>
                <div>
                {
                    <Empty seat={example} />
                }
                    <p>Disponível</p>
                </div>
                <div>
                {
                    <Ocupied seat={example} />
                }
                    <p>Indisponível</p>
                </div>

            </div>
            <form onSubmit={sendInfo}>
                <div className="inputs">
                    <p>Nome do comprador:</p>
                    <input
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome..."
                        required
                    />
                    <p>CPF do comprador:</p>
                    <input
                        type="text" 
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="Digite seu CPF..."
                        maxLength="11"
                        required
                    />
                </div>
                <button type="submit">Reservar assento(s)</button>
            </form>
            <div className="footerSeats">
                { verificador ? <></> : <Footer selected={selected}/> }
            </div>
        </div>
    )
}