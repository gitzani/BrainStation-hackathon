import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/generate-image",
        { prompt }
      );

      setResult(
        `Prompt: ${response.data.prompt}\nImage URL: ${response.data.url}`
      );
    } catch (error) {
      console.error(error);
      setResult("https://i.quotev.com/b2gtjqawaaaa.jpg");
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <h1>Generate Image</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={handlePromptChange}
          required
        />
        <br />
        <button type="submit">Generate</button>
      </form>
      <div className="result-container">
        <img src={result} alt="Avatar" />
      </div>
    </div>
  );
}

export default App;
