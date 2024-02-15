import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";
import Swal from "sweetalert2";
import axios from "axios";

const Card = ({ id, name, height, weight }) => {
  const { contextValue } = useContext(ContextGlobal);
  const { state, dispatch } = contextValue;
  const [pokemonData, setPokemonData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(state.favs.some((fav) => fav.id === id));

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
      });
  }, [id]);

  useEffect(() => {
    setIsFavorite(state.favs.some((fav) => fav.id === id));
  }, [state.favs, id]);

  const addFav = () => {
    if (!isFavorite) {
      dispatch({ type: "ADD_FAV", payload: { id, name, height, weight } });
      setIsFavorite(true);
      Swal.fire({
        title: "Added",
        text: `${name} added to favorites.`,
        icon: "success",
        showConfirmButton: false,
        timer: 1300,
      });
    }
  };

  const removeFav = () => {
    dispatch({ type: "REMOVE_FAV", payload: id });
    setIsFavorite(false);
    Swal.fire({
      title: "Removed",
      text: `${name} was removed to favorites.`,
      icon: "error",
      showConfirmButton: false,
      timer: 1300,
    });
  };

  return (
    <div className="card">
      <Link to={`/pokemon/${id}`}>
        <div className="card-image">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="Pokémon" />
        </div>

        <div className="card-data">
          <h3>{name ? name : 'Loading...'}</h3>
          <p>Base experience: {pokemonData ? pokemonData.base_experience : 'Loading...'}</p>
          <p>Height: {pokemonData ? pokemonData.height : 'Loading...'}</p>
          <p>Weight: {pokemonData ? pokemonData.base_experience : 'Loading...'}</p>
        </div>
      </Link>

      {isFavorite ? (
        <button onClick={removeFav} className={`favButton favorite`}>
          FAVORITE
        </button>
      ) : (
        <button onClick={addFav} className={`favButton`}>
          ADD
        </button>
      )}
    </div>
  );
};

export default Card;
