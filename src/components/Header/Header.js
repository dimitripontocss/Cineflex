import "./Header.css"
import { Link } from "react-router-dom"

export default function Header(){
    return(
        <div className="header">
           <Link to="/" style={{ textDecoration: 'none', color:"#E8833A"}}><h1>CINEFLEX</h1></Link>
        </div>
    )
}