import React, { createContext, useReducer, useMemo, useEffect } from "react";
import axios from "axios";

export const initialState = {
  theme: "light",
  data: [],
  favs: [],
};

export const ContextGlobal = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "THEME":
      const updatedTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", updatedTheme);
      return { ...state, theme: updatedTheme };

    case "DATA":
      return { ...state, data: action.payload.results };

    case "ADD_FAV":
      const updatedFavsAdd = [...state.favs, action.payload];
      localStorage.setItem("favs", JSON.stringify(updatedFavsAdd));
      return { ...state, favs: updatedFavsAdd };

    case "REMOVE_FAV":
      const filteredFavs = state.favs.filter((fav) => fav.id !== action.payload);
      localStorage.setItem("favs", JSON.stringify(filteredFavs));
      return { ...state, favs: filteredFavs };

    case "CLEAR_FAVS":
      localStorage.removeItem("favs");
      return { ...state, favs: [] };

    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {

  const storedTheme = localStorage.getItem("theme") || initialState.theme;
  const storedFavs = JSON.parse(localStorage.getItem("favs")) || initialState.favs;

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    theme: storedTheme,
    favs: storedFavs,
  });

  const changeTheme = () => {
    dispatch({ type: "THEME" });
  };

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/`)
      .then((response) => {
        dispatch({ type: "DATA", payload: response.data });
      })
      .catch((error) => {
        console.error("Error loading info:", error);
      });
  }, []);


  const contextValue = useMemo(() => ({ state, changeTheme, dispatch }), [state]);

  return (
    <ContextGlobal.Provider value={{ contextValue }}>
      {children}
    </ContextGlobal.Provider>
  );
};
