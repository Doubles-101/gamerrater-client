import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const GameReviewForm = () => {
    const [comment, setReview] = useState("")

    const navigate = useNavigate()

    const { gameId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:8000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            },
            body: JSON.stringify({comment, gameId}),
        })
        .then(response => response.json())
        .then(navigate(`/games/${gameId}`))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1>Create A Review</h1>
                <fieldset>
                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="5"
                    ></textarea>
                </fieldset>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </form>
        </div>
    )
}