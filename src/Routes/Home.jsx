import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import { ContextGlobal } from '../Components/utils/global.context';

const getPokemonInfo = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon info:', error);
    return null;
  }
};

const Home = () => {
  const { contextValue } = useContext(ContextGlobal);
  const { state } = contextValue;
  const [pokemonData, setPokemonData] = useState([]);
  const [startId, setStartId] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [renderedSeries, setRenderedSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${startId - 1}&limit=3`);
        setPokemonData(response.data.results);
        const totalResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
        setTotalPokemon(totalResponse.data.count);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };
    fetchData();
  }, [startId]);

  useEffect(() => {
    const renderPokemonSeries = async () => {
      const series = [];
      for (let i = startId; i < startId + 3 && i <= startId + pokemonData.length - 1; i++) {
        const pokemon = await getPokemonInfo(i);
        series.push(
          <div key={i}>
            {pokemon && <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} />}
          </div>
        );
      }
      setRenderedSeries(series);
    };
    renderPokemonSeries();
  }, [startId, pokemonData]);

  const handleNext = () => {
    if (startId + 3 <= totalPokemon) {
      setStartId(startId + 3);
    }
  };

  const handlePrevious = () => {
    if (startId - 3 >= 1) {
      setStartId(startId - 3);
    }
  };

  return (
    <main className={state.theme}>
      <h1 id="h1home">Choose your favorites</h1>
      <div className='card-grid'>
        {renderedSeries}
      </div>
      <div className='button-container'>
        <button className="prevButton" onClick={handlePrevious}>Previous</button>
        <button className="nextButton" onClick={handleNext}>Next</button>
      </div>
    </main>
  );
}

export default Home;
