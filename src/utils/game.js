const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(cells) {
  for (const [a, b, c] of LINES) {
    const v = cells[a];
    if (v && v === cells[b] && v === cells[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

export function isDraw(cells) {
  return cells.every(Boolean);
}
