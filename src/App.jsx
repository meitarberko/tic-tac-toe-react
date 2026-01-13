import Game from "./components/Game";
import "./styles/app.css";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <h1 className="title">X Mix Drix</h1>
      </header>

      <main className="main">
        <Game />
      </main>
    </div>
  );
}
