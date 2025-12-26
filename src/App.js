import iconDice from "./images/icon-dice.svg";
import divDesc from "./images/pattern-divider-desktop.svg";
import { useState } from "react";
import axios from "axios";

function App() {
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchAdvice = () => {
    setLoading(true);
    setError(null);
    // Simulate a delay of 2 seconds before making the API call
    setTimeout(() => {
      axios
        .get("https://api.adviceslip.com/advice")
        .then((response) => {
          setAdvice(response.data.slip);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching advice:", error);
          setError("Failed to fetch advice. Please try again.");
          setLoading(false);
        });
    }, 1000);
  };
  return (
    <div className="App">
      <p>
        ADVICE {"  "}#{advice.id}
      </p>
      <h1>
        {loading ? (
          <div className="loading-message">
            <p>Loading</p>
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : advice.advice ? (
          advice.advice
        ) : (
          "Click on the dice to get a random advice"
        )}
      </h1>
      <img src={divDesc} alt="pattern-divider" id="divider" />
      <button onClick={fetchAdvice} disabled={loading}>
        <img src={iconDice} alt="icon-dice" id="dice-icon" />
      </button>
    </div>
  );
}

export default App;
