import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const GameDetail = () => {
    const [gameDetails, setGameDetails] = useState({})
    const [gameCategories, setGameCategories] = useState([])

    const { gameId } = useParams()

    const getGameDetailsFromTheApi = async () => {
        const response = await fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setGameDetails(parsedJSONString)
    }

    useEffect(() => {
        getGameDetailsFromTheApi()
    }, [])


    return (
        <div>
            <ul>
                <li>Title:  {gameDetails.title}</li>
                <li>Designer:  {gameDetails.designer}</li>
                <li>Year Released:  {gameDetails.year_released}</li>
                <li>Number of Players:  {gameDetails.number_of_players}</li>
                <li>Estimated Time to Play:  {gameDetails.estimated_time_to_play} mins</li>
                <li>Ages:  {gameDetails.age_recommendation}+</li>
                <li>Categories:  
                    {gameDetails?.categories?.map((category, index) => (
                        <span key={index}> {category.name}{index < gameDetails.categories.length - 1 ? ', ' : ''}</span>
                    ))}
                </li>
            </ul>
        </div>
    )
}