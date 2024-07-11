import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ReviewList } from "./reviews/ReviewList.jsx"


export const GameDetail = () => {
    const [gameDetails, setGameDetails] = useState({})
    const [userRating, setUserRating] = useState(0)

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

    const postUserRating = async () => {
        const response = await fetch(`http://localhost:8000/ratings`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                game: gameId,
                rating_number: userRating
            })
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

    const handleRatingChange = (event) => {
        setUserRating(Number(event.target.value))
    }

    const handleSaveRating = () => {
        postUserRating()
        navigate('/games')
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

            <div className="rating-container mt-4">
                <h2>Rate this game:</h2>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <label key={value} className="mr-2">
                        <input
                            type="radio"
                            value={value}
                            checked={userRating === value}
                            onChange={handleRatingChange}
                        />
                        {value}
                    </label>
                ))}
            </div>

            {userRating !== 0 && <button className="button p-2 m-2 bg-blue-500 text-white" onClick={handleSaveRating}>Save</button>}

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