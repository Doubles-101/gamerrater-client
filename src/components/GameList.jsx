import { useEffect, useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"


export const GameList = () => {
    const [allGames, setAllGames] = useState([])

    const navigate = useNavigate()

    const fetchAllGamesFromApi = async () => {
        const response = await fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setAllGames(parsedJSONString)
    }

    const handleRegisterNewGame = () => {
        navigate(`/creategame`)
    }

    useEffect(() => {
        fetchAllGamesFromApi()
    }, [])

    return (
    <div>
        <h1>All Games</h1>
        <ul>
            {
                allGames.map(game => {
                    return <li key={`game__${game.id}`}>
                        <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={`/games/${game.id}`}>{game.title}</NavLink>
                        <li className="text-left text-blue-400 hover:text-purple-700">Average Rating: {game.average_rating.toFixed(2)}</li>
                    </li>
                })
            }
        </ul>
        <button className="button p-2 m-2 bg-blue-500 text-white hover:bg-blue-700" onClick={handleRegisterNewGame}>Register New Game</button>
    </div>
    )
}