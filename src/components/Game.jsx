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

  const handlePlay = (index) => {
    if (isLocked) return;
    if (cells[index]) return;

    const updated = cells.slice();
    updated[index] = next;

    setCells(updated);
    setNext(next === "X" ? "O" : "X");
  };

  const currentAsset = getMarkAsset(next);

  return (
    <section className="game">
      <div className="statusCard" aria-live="polite">
        <div className="statusRow">
          <span className="label">Next</span>
          <img className="statusIcon" src={currentAsset.src} alt="Next mark" />
        </div>
      </div>

      <Board cells={cells} onPlay={handlePlay} isLocked={isLocked} getMarkAsset={getMarkAsset} />
    </section>
  );
}
