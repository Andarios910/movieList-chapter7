import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomeMovies from "./pages/HomeMovies";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeMovies />} />
        <Route path=":id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
