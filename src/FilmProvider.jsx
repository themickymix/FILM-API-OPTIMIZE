import { createContext, useState } from "react";

export const FilmContext = createContext();
export const FilmProvider = ({ children }) => {
  const [filmTitle, setFilmTitle] = useState("");
  return (
    <FilmContext.Provider value={{ filmTitle, setFilmTitle }}>
      {children}
    </FilmContext.Provider>
  );
};
