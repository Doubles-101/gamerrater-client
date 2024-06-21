import { useEffect, useState } from "react"


export const ReviewList = (gameId) => {
    const [reviews, setReviews] = useState([])

    const getGameSpecificReviews = async () => {
        const response = await fetch(`http://localhost:8000/reviews?gameId=${gameId.gameId}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setReviews(parsedJSONString)
    }

    useEffect(() => {
        getGameSpecificReviews()
    }, [])


    return (
        <ul>
            {
                reviews.map(review => {
                    return <li className="pl-4 mt-4" key={review.id}>{review.comment}</li>
                })
            }
        </ul>
    )
}