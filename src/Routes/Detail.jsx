import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ContextGlobal } from '../Components/utils/global.context';

const Detail = () => {
  const { contextValue } = useContext(ContextGlobal);
  const { state } = contextValue;
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.error('Error loading pokemon:', error));
  }, [id]);

  return (
    <div className={state.theme} id='detail-container'>
      <h1>Pokemon details Id: {id} </h1>

      {pokemon ? (
        <div className='detail'>
          <table>
            <tbody>
              <tr>
                <td><strong>Image:</strong></td>
                <td>
                  {pokemon.sprites.front_default && (
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{pokemon.name}</td>
              </tr>
              <tr>
                <td><strong>Types:</strong></td>
                <td>
                  {pokemon.types.map((type, index) => (
                    <span key={index}>{type.type.name}{index !== pokemon.types.length - 1 && ", "}</span>
                  ))}
                </td>
              </tr>
              <tr>
                <td><strong>Base experience:</strong></td>
                <td>{pokemon.base_experience}</td>
              </tr>
              <tr>
                <td><strong>Stats:</strong></td>
                <td>
                  <ul>
                    {pokemon.stats.map((stat, index) => (
                      <li key={index}>
                        <strong>{stat.stat.name}:</strong> {stat.base_stat}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>Abilities:</strong></td>
                <td>
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index}>{ability.ability.name}{index !== pokemon.abilities.length - 1 && ", "}</span>
                  ))}
                </td>
              </tr>
              <tr>
                <td><strong>Height:</strong></td>
                <td>{pokemon.height}</td>
              </tr>
              <tr>
                <td><strong>Weight:</strong></td>
                <td>{pokemon.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

};

export default Detail;
