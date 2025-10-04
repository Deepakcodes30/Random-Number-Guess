import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guesses, setGuesses] = useState([]);
  const [inputGuess, setInputGuess] = useState("");
  const [message, setMessage] = useState("");
  const [guessLeft, setGuessLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const handleReset = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
    setGuessLeft(10);
    setGuesses([]);
    setMessage("");
    setInputGuess("");
    setGameOver(false);
  };

  const HandleCalculate = (e) => {
    e.preventDefault();
    if (gameOver) return; // stop if game already ended

    const guess = parseInt(inputGuess);

    if (!guess || guess < 1 || guess > 100) {
      setMessage("Please enter a number between 1 to 100");
      return;
    }

    setGuesses((prev) => [...prev, guess]);

    setGuessLeft((prev) => {
      const newGuessLeft = prev - 1;

      if (guess === number) {
        setMessage("🎉 You Won!");
        setGameOver(true); // stop game until reset
      } else if (newGuessLeft === 0) {
        setMessage(`❌ Game Over! The number was ${number}`);
        setGameOver(true); // stop game until reset
      } else if (guess < number) {
        setMessage("📉 The number is higher!");
      } else if (guess > number) {
        setMessage("📈 The number is lower!");
      }

      return newGuessLeft;
    });

    setInputGuess("");
  };

  return (
    <div className="wrapper">
      <h1 className="heading1">Number guessing game</h1>

      <div className="content">
        <p>Try and guess a random number between 1 and 100.</p>
        <p>You have 10 attempts to guess the right number</p>
      </div>

      <form className="form">
        <p>Guess a number</p>
        <input
          type="text"
          className="guessField"
          value={inputGuess}
          onChange={(e) => setInputGuess(e.target.value)}
          disabled={gameOver} // disable if game ended
        />
        <input
          type="submit"
          className="guessSubmit"
          onClick={HandleCalculate}
          disabled={gameOver} // disable if game ended
        />
      </form>

      <div className="resultParas">
        <div>
          {guesses.length > 0 && <p>The guesses are: {guesses.join(", ")}</p>}
        </div>
        <div>
          <p>Remaining Guess: {guessLeft}</p>
        </div>
        <div>{message && <p>{message}</p>}</div>

        {gameOver && (
          <button onClick={handleReset} className="resetBtn">
            🔄 Reset Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
