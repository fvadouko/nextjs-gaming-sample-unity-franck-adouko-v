import React, { useState } from "react";

export const Context = React.createContext();
export const UserContext = React.createContext({ user: null, username: null });

const ContextProvider = (props) => {
  const [state, setState] = useState({
    gamesArray: [],
  });
  const setGamesArray = (games) => {
    setState({ ...state, gamesArray: games });
  };

  const value = React.useMemo(() => {
    return {
      state,
      setGamesArray,
    };
  }, [state.gamesArray, setGamesArray]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
export default ContextProvider;
