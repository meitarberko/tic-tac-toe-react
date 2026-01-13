import { useMemo, useState } from "react";
import Board from "./Board";
import { calculateWinner, isDraw } from "../utils/game";
import xIcon from "../assets/x.svg";
import oIcon from "../assets/o.svg";
import "../styles/game.css";

const EMPTY = Array(9).fill(null);

export default function Game() {
  const [cells, setCells] = useState(EMPTY);
  const [next, setNext] = useState("X");

  const outcome = useMemo(() => calculateWinner(cells), [cells]);
  const draw = useMemo(() => !outcome.winner && isDraw(cells), [cells, outcome.winner]);

  const isLocked = Boolean(outcome.winner) || draw;

  const getMarkAsset = (mark) => {
    if (mark === "X") return { src: xIcon };
    return { src: oIcon };
  };

  const playerLabel = (mark) => (mark === "X" ? "Player 1" : "Player 2");

  const handlePlay = (index) => {
    if (isLocked) return;
    if (cells[index]) return;

    const updated = cells.slice();
    updated[index] = next;

    setCells(updated);
    setNext(next === "X" ? "O" : "X");
  };

  const handleRestart = () => {
    setCells(EMPTY);
    setNext("X");
  };

  const currentAsset = getMarkAsset(next);
  const winnerAsset = outcome.winner ? getMarkAsset(outcome.winner) : null;

  return (
    <section className="game">
      <div className="statusCard" aria-live="polite">
        {!isLocked ? (
          <div className="statusRow">
            <span className="label">{playerLabel(next)}</span>
            <img className="statusIcon" src={currentAsset.src} alt="Next player mark" />
          </div>
        ) : (
          <div className="endState">
            {outcome.winner ? (
              <div className="endRow">
                <span className="label">{playerLabel(outcome.winner)} wins</span>
                <img className="statusIcon" src={winnerAsset.src} alt="Winner player mark" />
              </div>
            ) : (
              <div className="endRow">
                <span className="label">Result</span>
                <span className="resultPill">Draw</span>
              </div>
            )}

            <button className="restartBtn" type="button" onClick={handleRestart}>
              Play again
            </button>
          </div>
        )}
      </div>

      <Board cells={cells} onPlay={handlePlay} isLocked={isLocked} getMarkAsset={getMarkAsset} />
    </section>
  );
}
