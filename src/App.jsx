import { useEffect, useState } from "react";
import Board from "./components/Board";

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!winner && !isDraw) return;

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [winner, isDraw]);

  const checkWinner = (board) => {
    for (const [a, b, c] of winningPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return "";
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    if (newBoard.every((cell) => cell !== "")) {
      setIsDraw(true);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
    setIsDraw(false);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-4">

     

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Tic Tac Toe
          </h1>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Two Player Game
            </p>
          </div>
        </div>

     

        <div className="mt-14 w-full max-w-xs">
          <div className="flex items-center justify-center gap-3">

            <div
              className={`flex h-16 flex-1 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition ${
                currentPlayer === "X" && !winner && !isDraw
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-800 bg-gray-900 text-gray-400"
              }`}
            >
              Player X
            </div>

            <div
              className={`flex h-16 flex-1 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition ${
                currentPlayer === "O" && !winner && !isDraw
                  ? "border-pink-500 bg-pink-500/10 text-pink-400"
                  : "border-gray-800 bg-gray-900 text-gray-400"
              }`}
            >
              Player O
            </div>

          </div>
        </div>

    


        <div className="mt-10 w-full max-w-xs">
          <Board
            board={board}
            onCellClick={handleCellClick}
          />
        </div>

        
        

        <button
          onClick={resetGame}
          className="pt-10 flex h-12 w-36 items-center justify-center rounded-lg bg-white text-sm font-semibold text-gray-900 transition hover:bg-gray-200 active:scale-95"
        >
          Reset Game
        </button>
      </div>

     
     

      {showPopup && (winner || isDraw) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">

          <div className="relative flex min-h-75 w-full max-w-sm flex-col items-center justify-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 px-8 py-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.5)]">

            

            <button
              onClick={closePopup}
              aria-label="Close popup"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 bg-gray-800 text-xl leading-none text-gray-400 transition hover:border-gray-600 hover:bg-gray-700 hover:text-white active:scale-95"
            >
              ×
            </button>

           

            <h2 className="text-3xl font-bold tracking-tight text-white">
              Game Over
            </h2>

            <div className="h-px w-12 bg-gray-700" />

            {winner ? (
              <p
                className={`text-xl font-semibold ${
                  winner === "X"
                    ? "text-blue-400"
                    : "text-pink-400"
                }`}
              >
                Player {winner} wins!
              </p>
            ) : (
              <p className="text-xl font-semibold text-yellow-400">
                It's a draw!
              </p>
            )}

            


            <button
              onClick={resetGame}
              className="mt-4 h-12 w-36 rounded-xl bg-white text-sm font-semibold text-gray-900 transition hover:bg-gray-200 active:scale-[0.98]"
            >
              Play Again
            </button>

          </div>
        </div>
      )}
    </main>
  );
}

export default App;