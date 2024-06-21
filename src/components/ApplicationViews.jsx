import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import { GameList } from './GameList.jsx'
import { GameDetail } from "./GameDetail.jsx"
import { GameForm } from "./GameForm.jsx"
import { GameReviewForm } from "./reviews/GameReviewForm.jsx"
import { EditGame } from "./edits/EditGame.jsx"


export const ApplicationViews = () => {


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/games/:gameId" element={<GameDetail />} />
                <Route path="/games/:gameId/review" element={<GameReviewForm />} />
                <Route path="/games/:gameId/editgame" element={<EditGame />} />
                <Route path="/creategame" element={<GameForm />} />
            </Route>
        </Routes>
    </BrowserRouter>
}