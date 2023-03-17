import React, { useState } from "react";
import axios from "axios";
import './_ImageGenerator.scss';


function ImageGenerator() {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [weapon, setWeapon] = useState("");
  const [strength, setStrength] = useState("");
  const [attack, setAttack] = useState("");
  const [experience, setExperience] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const prompt = {
      name,
      race,
      weapon,
      strength,
      attack,
      experience,
      age
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8085/generate-image",
        { prompt }
      );
  
      const url = response.data.url;
      setResult(`Prompt: ${JSON.stringify(prompt)}\n${url}`);
    } catch (error) {
      console.error(error);
      setResult("https://i.quotev.com/b2gtjqawaaaa.jpg");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRaceChange = (event) => {
    setRace(event.target.value);
  };

  const handleWeaponChange = (event) => {
    setWeapon(event.target.value);
  };

  const handleStrengthChange = (event) => {
    setStrength(event.target.value);
  };

  const handleAttackChange = (event) => {
    setAttack(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="createPage drop__margin">
      <h1>Character Atributes</h1>
      <form className="form_container" onSubmit={handleSubmit}>
        <label className="form__label" htmlFor="name">Name:</label>
        <input
          placeholder="Character Name"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
          className="placeholder__animated charPage__input"
        />
        <br />

        <label className="form__label" htmlFor="race">Race:</label>
        <input 
          placeholder="Human, Paladin, Dwarf, Wizard etc..."
          type="text"
          id="race"
          name="race"
          value={race}
          onChange={handleRaceChange}
          required
          className="placeholder__animated charPage__input"
        />
        <br />

        <label className="form__label" htmlFor="weapon">Weapon:</label>
        <input
          placeholder="Any type of weapon..."
          type="text"
          id="weapon"
          name="weapon"
          value={weapon}
          onChange={handleWeaponChange}
          required
          className="placeholder__animated charPage__input"
        />
        <br />

        <label className="form__label" htmlFor="strength">Strength:</label>
        <input
          placeholder="eg. Intelligence, Brute Force, Magic, etc..."
          type="text"
          id="strength"
          name="strength"
          value={strength}
          onChange={handleStrengthChange}
          required
          className="placeholder__animated charPage__input"
        />
        <br />

        <label className="form__label" htmlFor="attack">Attack:</label>
        <input
            placeholder="Value is xx/20"
            type="text"
            id="attack"
            name="attack"
            value={attack}
            onChange={handleAttackChange}
            required
            className="placeholder__animated charPage__input"
            />
            <br />
    
            <label className="form__label" htmlFor="experience">Experience:</label>
            <input
            placeholder="Value is xx/100"
            type="text"
            id="experience"
            name="experience"
            value={experience}
            onChange={handleExperienceChange}
            required
            className="placeholder__animated charPage__input"
            />
            <br />
    
            <label className="form__label" htmlFor="age">Age:</label>
            <input
            placeholder="Your Character's Age"
            type="text"
            id="age"
            name="age"
            value={age}
            onChange={handleAgeChange}
            required
            className="placeholder__animated charPage__input"
            />
            <br />
          
            <button className="nav__button" type="submit">Generate</button>
          </form>
          <div className="result-container">
      {result && <img className="create__avatar" src={result.split("\n")[1]} alt="Generated Image" />}
    </div>
        </div>
      );
    }
    
    export default ImageGenerator;
    
