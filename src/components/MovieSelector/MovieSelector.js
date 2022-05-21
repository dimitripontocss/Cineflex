import React from "react"
import axios from "axios"
import "./MovieSelector.css"
import { Link } from "react-router-dom"
import Loading from "../Loading/Loading"

function Movie({id,url}){
    return(
            <Link to={`/sessoes/${id}`}><img src={url} alt="Movie"/></Link>
    )
}



export default function MovieSelector({setBack}){

    setBack(0);

    const [movies,setMovies] = React.useState([])

    React.useEffect( () => {
        const promiseMovies = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        promiseMovies.then((response)=> setMovies(response.data))
    }, [])

    return(
        <div className="selectorMovies">
            <h3>Selecione o filme</h3>
            <div className="movies">
                {movies.length === 0 ? <Loading /> : movies.map((movies) => <Movie key={movies.id} id={movies.id} url={movies.posterURL}/>)}
            </div>
        </div>
    )
}