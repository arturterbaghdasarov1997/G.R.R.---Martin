import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";
import HousesPage from "../pages/HousesPage";
import CharactersPage from "../pages/CharactersPage";
import BookDetails from "../pages/BookDetails";
import CharacterDitails from "../pages/CharacterDitails";
import HouseDetails from "../pages/HouseDetails";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/books" element={<BooksPage/>}/>
            <Route path="/characters" element={<CharactersPage/>}/>
            <Route path="/houses" element={<HousesPage/>}/>
            <Route path="/bookDetails/:isbn" element={<BookDetails />} />
            <Route path="/characters/:name" element={<CharacterDitails />} />
            <Route path="/houses/:name" element={<HouseDetails />} />
        </Routes>
    )
}

export default AppRouter;