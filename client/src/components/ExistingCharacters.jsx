import { useState, useEffect } from 'react';
import axios from 'axios';

function CharacterPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8085/characters')
      .then(response => setCharacters(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='drop__margin'>
      {characters.slice().reverse().map(character => (
        <div className="charPage" key={character.id}>
          <h2>{character.prompt.name}</h2>
          <p>Race: {character.prompt.race}</p>
          <p>Weapon: {character.prompt.weapon}</p>
          <p>Skill: {character.prompt.skill}</p>
          <p>Attack: {character.prompt.attack}</p>
          <p>Experience: {character.prompt.experience}</p>
          <p>Age: {character.prompt.age}</p>
          <img className="char__avatar" src={character.url} alt={character.prompt.name} />
        </div>
      ))}
    </div>
  );
}

export default CharacterPage;