import "./Header.css"
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Header({back}){
    const navigate = useNavigate()
    return(
        <div className="header">
            {back === 0 ? <></> : 
                <ion-icon  name="arrow-back-outline" onClick={()=>navigate(-1)}></ion-icon>
            }
           <h1>CINEFLEX</h1>
        </div>
    )
}