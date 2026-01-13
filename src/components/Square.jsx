export default function Square({ value, onClick, disabled, imgAlt, imgSrc }) {
  return (
    <button
      className="square"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={imgAlt}
    >
      {value ? <img className="mark" src={imgSrc} alt={imgAlt} /> : null}
    </button>
  );
}
