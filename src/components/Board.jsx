import Square from "./Square";
import "../styles/board.css";

export default function Board({ cells, onPlay, isLocked, getMarkAsset }) {
  return (
    <div className="board" role="grid" aria-label="Game board">
      {cells.map((cell, index) => {
        const asset = cell ? getMarkAsset(cell) : null;
        const imgAlt = cell ? `Mark ${cell}` : `Empty cell ${index + 1}`;

        return (
          <Square
            key={index}
            value={cell}
            onClick={() => onPlay(index)}
            disabled={isLocked || Boolean(cell)}
            imgAlt={imgAlt}
            imgSrc={asset?.src}
          />
        );
      })}
    </div>
  );
}
