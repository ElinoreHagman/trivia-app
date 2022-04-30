import { useState } from "react";
import "./App.css";
import { Start } from "./components/Start";
import { TriviaArea } from "./components/TriviaArea";

function App() {
  const [gameActive, setGameActive] = useState(false);

  const startTrivia = () => {
    setGameActive(true);
  };

  const endTrivia = () => {
    setGameActive(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!gameActive ? (
          <Start startTrivia={startTrivia} />
        ) : (
          <TriviaArea endTrivia={endTrivia} />
        )}
      </header>
    </div>
  );
}

export default App;
