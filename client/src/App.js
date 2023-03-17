import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './components/_ImageGenerator.scss';
import "./components/_NavBar.scss";
import NavBar from "./components/NavBar";
import ImageGenerator from "./components/ImageGenerator.jsx";
import CharacterPage from "./components/ExistingCharacters.jsx";





function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ImageGenerator />} />
        <Route path="/characters" element={<CharacterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
