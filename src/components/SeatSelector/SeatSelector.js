import { useParams } from 'react-router-dom';
import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./SeatSelector.css"
import Loading from "../Loading/Loading"

function Footer({ selected }) {
    return (
        <>
            <img src={selected.movie.posterURL} alt="Movie" />
            <div className='dados'>
                <span>{selected.movie.title}</span>
                <span>{selected.day.weekday} - {selected.name}</span>
            </div>
        </>
    )
}

function Selected({ seat, setSelectedSeats, selectedSeats }) {
    return (
        <div onClick={() => unselectSeat(seat.id, setSelectedSeats, selectedSeats)} className="seat selected">
            <p>{seat.name}</p>
        </div>
    )
}

function unselectSeat(id, setSelectedSeats, selectedSeats) {
    const newSeats = selectedSeats.filter(function (f) { return f !== id })
    setSelectedSeats(newSeats)
}

function selectSeat(id, setSelectedSeats, selectedSeats) {
    setSelectedSeats([...selectedSeats, id])
}

function Empty({ seat, setSelectedSeats, selectedSeats }) {
    return (
        <div onClick={() => selectSeat(seat.id, setSelectedSeats, selectedSeats)} className="seat available">
            <p>{seat.name}</p>
        </div>
    )
}

function Ocupied({ seat }) {
    return (
        <div className="seat ocupied">
            <p>{seat.name}</p>
        </div>
    )
}

function isSelected(seat, selectedSeats) {
    if (selectedSeats.length === 0) {
        return false;
    }
    if (selectedSeats.includes(seat.id)) {
        return true;
    } else {
        return false
    }
}

function Seat({ seat, setSelectedSeats, selectedSeats }) {
    return (
        <>
            {seat.isAvailable ? <Empty seat={seat} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} /> : <Ocupied seat={seat} />}
        </>
    )
}

export default function SeatSelector() {
    const { idSession } = useParams()

    const [name, setName] = React.useState("")
    const [cpf, setCpf] = React.useState("")
    const [selected, setSelected] = React.useState({})
    const [verificador, setVerificador] = React.useState(true)
    const [selectedSeats, setSelectedSeats] = React.useState([])

    function sendInfo(event) {
        event.preventDefault();
        if(selectedSeats.length === 0){
            alert("Selecione ao menos um assento!")
        }else{
            const data = {
                id: selectedSeats,
                name: name,
                cpf: cpf
            }
            console.log(data)
        }
    }

    React.useEffect(() => {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`)
        promiseSeats.then((response) => { setSelected(response.data); setVerificador(false) })
    }, [])

    console.log(selected)

    return (
        <div className="selectorSeats">
            <h3>Selecione o(s) assento(s)</h3>
            <div className="seats">
                {verificador ? <Loading /> : selected.seats.map((seat, index) => (isSelected(seat, selectedSeats)) ? <Selected key={index} seat={seat} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} /> : <Seat key={index} seat={seat} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} />)}
            </div>
            <div className="examples">
                <div>
                    <div className="seat selected"></div>
                    <p>Selecionado</p>
                </div>
                <div>
                    <div className="seat available"></div>
                    <p>Disponível</p>
                </div>
                <div>
                    <div className="seat ocupied"></div>
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
                <Link to={"/sucesso"}><button type="submit">Reservar assento(s)</button></Link>
            </form>
            <div className="footerSeats">
                {verificador ? <></> : <Footer selected={selected} />}
            </div>
        </div>
    )
}