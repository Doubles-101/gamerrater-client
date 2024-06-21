import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GameForm = () => {
    const [allCategories, setAllCategories] = useState([])
    const [chosenCategory, setChosenCategory] = useState(0)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        designer: '',
        year_released: '',
        number_of_players: '',
        estimated_time_to_play: '',
        age_recommendation: '',
        categories: [chosenCategory]
    })

    const navigate = useNavigate()

    const getAllCategoriesFromApi = async () => {
        const response = await fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setAllCategories(parsedJSONString)
    }

    useEffect(() => {
        getAllCategoriesFromApi()
    }, [])

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            categories: [chosenCategory]
        }))
    }, [chosenCategory])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can now submit the formData to your API
        fetch('http://localhost:8000/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(navigate(`/games`))
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-6">Add a New Game</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </fieldset>
                <fieldset>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </fieldset>
                <fieldset>
                    <label className="block text-sm font-medium text-gray-700">Designer</label>
                    <input
                        type="text"
                        name="designer"
                        value={formData.designer}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </fieldset>
                <fieldset>
                    <label className="block text-sm font-medium text-gray-700">Year Released</label>
                    <input
                        type="number"
                        name="year_released"
                        value={formData.year_released}
                        onChange={handleChange}
                        min="1900"
                        max="2100"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </fieldset>
                <fieldset>
                    <label className="block text-sm font-medium text-gray-700">Number of Players</label>
                    <input
                        type="number"
                        name="number_of_players"
                        value={formData.number_of_players}
                        onChange={handleChange}
                        min="0"
                        max="1000000000"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </fieldset>
                <fieldset>
                    <label className="block text-sm font-medium text-gray-700">Estimated Time to Play (mins)</label>
                    <input
                        type="time"
                        name="estimated_time_to_play"
                        value={formData.estimated_time_to_play}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </fieldset>
                <fieldset>
                    <label className="block text-sm font-medium text-gray-700">Age Recommendation</label>
                    <input
                        type="number"
                        name="age_recommendation"
                        value={formData.age_recommendation}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </fieldset>

                <fieldset>
                    <label>Select an category:</label>
                        <select id="categories" onChange={event => {setChosenCategory(parseInt(event.target.value))}}>
                            <option value="0">-- Choose category --</option>
                            {
                                allCategories.map(category => <option key={`category--${category.id}`} value={category.id}>{category.name}</option>)
                            }
                        </select>
                </fieldset>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
