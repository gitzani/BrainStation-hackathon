import React, { useState, useEffect, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";
const axios = require("axios");

function App() {
    const [avatar, setAvatar] = useState("");
    const [character, setCharacter] = useState("");
    const [charId, setCharId] = useState("");
   



return (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Creater Your D&D Character</h1>
        </header>
        <div>
         <img src={avatar} className="App-logo" alt="Avatar" />
        </div>
    </div>
);
}
export default App;