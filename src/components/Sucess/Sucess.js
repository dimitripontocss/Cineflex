import "./Sucess.css"

export default function Sucess({infos}){
    console.log(infos)
    return(
        <div className="sucesso">
            <h3>Pedido feito com sucesso!</h3>
            <div className="infos">
                <div>
                    <p>Filme e sessão</p>
                    {infos.title}{infos.date}{infos.hora}
                </div>
                <div>
                    <p>Ingressos</p>
                </div>
                <div>
                    <p>Comprador</p>
                </div>
            </div>
        </div>
    )
}