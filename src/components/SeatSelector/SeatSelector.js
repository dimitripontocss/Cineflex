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

function isSelected(seat, selectedSeats,infos,setInfos,arr,setArr) {
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

function pegaNome(selectedSeats,seats){
    let str = ""
    for(let i=0;i<seats.length;i++){
        for(let j=0;j<selectedSeats.length;j++){
            if(seats[i].id === selectedSeats[j]){
                str+=seats[i].name + " ";
            }
        }
    }
    return str.split(" ");
}

export default function SeatSelector({infos,setInfos}) {
    const { idSession } = useParams()

    const [name, setName] = React.useState("")
    const [cpf, setCpf] = React.useState("")
    const [selected, setSelected] = React.useState({})
    const [verificador, setVerificador] = React.useState(true)
    const [selectedSeats, setSelectedSeats] = React.useState([])
    const [arr,setArr] = React.useState([])
    
    function sendInfo() {
        if(selectedSeats.length === 0){
            alert("Selecione ao menos um assento!")
        }else{
            const names = pegaNome(selectedSeats,selected.seats);
            const data = {
                id: selectedSeats,
                name: name,
                cpf: cpf
            }
            setInfos({
                id:selectedSeats,
                buyer: name,
                cpf: cpf,
                assentos: names,
                hora: selected.name,
                data: selected.day.date,
                title: selected.movie.title
            })
            console.log(data,names)
        }
    }

    console.log(infos)

    React.useEffect(() => {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`)
        promiseSeats.then((response) => { setSelected(response.data); setVerificador(false) })
    }, [])

    console.log(selected)

    return (
        <div className="selectorSeats">
            <h3>Selecione o(s) assento(s)</h3>
            <div className="seats">
                {verificador ? <Loading /> : selected.seats.map((seat, index) => (isSelected(seat, selectedSeats,infos,setInfos,arr,setArr)) ? <Selected key={index} seat={seat} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} /> : <Seat key={index} seat={seat} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} />)}
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
               <Link to="/sucesso"><button onClick={sendInfo}type="submit">Reservar assento(s)</button></Link>
            </form>
            <div className="footerSeats">
                {verificador ? <></> : <Footer selected={selected} />}
            </div>
        </div>
    )
}
