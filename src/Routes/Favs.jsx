import React, { useContext } from "react";
import Card from "../Components/Card";
import { ContextGlobal } from "../Components/utils/global.context";
import Swal from 'sweetalert2';

const Favs = () => {
  const { contextValue } = useContext(ContextGlobal);
  const { state, dispatch } = contextValue;

  const clearAllFavs = () => {
    dispatch({ type: "CLEAR_FAVS" });
    Swal.fire({
      title: 'Favorites were deleted',
      text: 'You no longer have favorites.',
      icon: 'error',
      showConfirmButton: false,
      timer: 2200
    });
  };

  return (
    <div className={state.theme} id="fav-container">
      <h1>Favorites Pokemon</h1>
      <div className="card-grid">
        {state.favs.map((pokemon) => (
          <Card
            id={pokemon.id}
            name={pokemon.name}
            height={pokemon.height}
            weight={pokemon.weight}
          />
        ))}
      </div>
      <button className="favButton favorite" onClick={clearAllFavs}>CLEAR ALL</button>
    </div>
  );
};

export default Favs;