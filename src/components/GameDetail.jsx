import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ReviewList } from "./reviews/ReviewList.jsx"


export const GameDetail = () => {
    const [gameDetails, setGameDetails] = useState({})

    const navigate = useNavigate()

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

    const handleReviewGame = () => {
        navigate(`/games/${gameId}/review`)
    }

    const handleEditButton = () => {
        navigate(`/games/${gameId}/editgame`)
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

            {gameDetails.is_owner && <button className="button p-2 m-2 bg-blue-500 text-white" onClick={handleEditButton}>Edit</button>}

            <button className="button p-2 m-2 bg-blue-500 text-white" onClick={handleReviewGame}>Review Game</button>

            <div className="mt-4">
                <h2>Reviews: </h2>
                    {
                        <ReviewList gameId={gameId}/>
                    }
            </div>
        </div>
    )
}