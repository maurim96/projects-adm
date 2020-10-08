import React, { useReducer } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, disptach] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](disptach);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
