import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
import Loading from "../Loading/Loading"
import "./Sucess.css"

function Erro(){
    return(<div>
                <h3>Algum erro ocorreu na sua requisição, confira seu dados e tente novamente!</h3>
           </div>)
}

export default function Sucess({infos,setInfos}){
    console.log(infos)
    const [verif,setVerif] = React.useState(0)
    const envio ={
            ids: infos.id,
            name: infos.buyer,
            cpf: infos.cpf
    }
    React.useEffect( () => {
        if(infos.id === undefined || infos.buyer === "" || infos.cpf === ""){
            setVerif(2)
        }else{
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",envio)
            promise.then(()=>setVerif(1)).catch(()=>setVerif(2))
            if(infos.assentos[infos.assentos.length-1] === ""){
                infos.assentos.pop();
            }
        }
    }, [])

    console.log(verif)
    return(
        <div className="finish">
        {
            verif===0 ? <Loading /> : 
            verif===1 ? 
            <div className="sucesso">
                <h3>Pedido feito com sucesso!</h3>
                <div className="infos">
                    <div className="content">
                        <h4>Filme e sessão</h4>
                        <p>{infos.title}</p><p><span>{infos.data}</span>{infos.hora}</p>
                    </div>
                    <div className="content">
                        <h4>Ingressos</h4>
                        {infos.assentos.map((value)=>{return <p>Assento {value}</p>})}
                    </div>
                    <div className="content">
                        <h4>Comprador</h4>
                        <p>Nome: {infos.buyer}</p><p>CPF: {infos.cpf}</p>

                    </div>
                </div>
            </div>
             : <Erro/>
            }
            <Link to={"/"}><button onClick={()=>{setVerif(0);setInfos({})}}>Voltar pra Home</button></Link>
        </div>
        
    )
}