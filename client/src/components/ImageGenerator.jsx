import React, { useState } from "react";
import axios from "axios";
import './_ImageGenerator.scss';


function ImageGenerator() {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [weapon, setWeapon] = useState("");
  const [skill, setskill] = useState("");
  const [attack, setAttack] = useState("");
  const [experience, setExperience] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];
    const randomWeapon = ['sword', 'axe', 'bow', 'dagger', 'spear', 'whip'];
    const randomSkill_ = ['speed', 'strength', 'agility', 'intelligence', 'wisdom', 'charisma'];
    const d20attack = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13','14', '15', '16', '17', '18', '19', '20'];
    const d20experience = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13','14', '15', '16', '17', '18', '19', '20'];

    const handleRandomExperience = () => {
        const randomExperience = d20experience[Math.floor(Math.random() * d20experience.length)];
        setExperience(randomExperience);
      };

    const handleRandomAttack = () => {
        const randomAttack = d20attack[Math.floor(Math.random() * d20attack.length)];
        setAttack(randomAttack);
      };

    const handleRandomSkill = () => {
        const randomSkill = randomSkill_[Math.floor(Math.random() * randomSkill_.length)];
        setskill(randomSkill);
      };

  const handleRandomClass = () => {
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    setRace(randomClass);
  };

  const handleRandoWeapon = () => {
    const randomWep = randomWeapon[Math.floor(Math.random() * randomWeapon.length)];
    setWeapon(randomWep);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    const prompt = {
      name,
      race,
      weapon,
      skill,
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
    } finally {
      setLoading(false);
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

  const handleskillChange = (event) => {
    setskill(event.target.value);
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
          className="placeholder__animated charPage__input-first"
        />
        <br />

        <label className="form__label" htmlFor="race">Race:</label>
        <div className="form__wrapper">
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
        <button className="form__button" onClick={handleRandomClass}>Random Class</button>
        </div>
        <br />

        <label className="form__label" htmlFor="weapon">Weapon:</label>
        <div className="form__wrapper">
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
         <button className="form__button" onClick={handleRandoWeapon}>Random Weapon</button>
         </div>
        <br />

        <label className="form__label" htmlFor="skill">Skill:</label>
        <div className="form__wrapper">
        <input
          placeholder="eg. Intelligence, Brute Force, Magic, etc..."
          type="text"
          id="skill"
          name="skill"
          value={skill}
          onChange={handleskillChange}
          required
          className="placeholder__animated charPage__input"
          
        />
          <button className="form__button" onClick={handleRandomSkill}>Random Skill</button>
          </div>
        <br />

        <label className="form__label" htmlFor="attack">Attack:</label>
        <div className="form__wrapper">
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
            <button className="form__button" onClick={handleRandomAttack}>1 d 20 attack</button>
            </div>
            <br />
    
            <label className="form__label" htmlFor="experience">Experience:</label>
            <div className="form__wrapper">
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
             <button className="form__button" onClick={handleRandomExperience}>1 d 20 Experience</button>
            </div>
            
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
            className="placeholder__animated charPage__input-first"
            />
            <br />
          
            <button className="nav__button" type="submit">Generate</button>
          </form>
          <div className="result-container">
          {loading && <p>Wait while our artificial intelligence creates an avatar based on your attributes</p>}
{result && <img className="create__avatar" src={result.split("\n")[1]} alt="Generated Image" />}
 
    </div>
        </div>
      );
    }
    
    export default ImageGenerator;
    
