import React from "react";
import MainContainer from "./containers/MainContainer/MainContainer";
import { AppContext } from "./AppContext";

export default function App() {
  return (
    <div className="App">
      <header className="header"></header>
      <AppContext.Provider>
        <MainContainer />
      </AppContext.Provider>
    </div>
  );
}
