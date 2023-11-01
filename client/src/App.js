import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import backgroundImage from './assets/bg.jpg';
import GamesList from './views/GamesList';
import TeamsList from './views/TeamsList';
import PlayersList from './views/PlayersList';



function App() {
  return (
    <div className="flex flex-col w-full h-screen justify-between overflow-y-auto dark:bg-slate-600"
    style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
    >
    <NavBar/>
      <article className="flex flex-col w-full h-auto items-center justify-center p-2.5">
        <Routes>
          <Route path="/" element={<GamesList />} />
          <Route path="/fields" element={<TeamsList />} />
          <Route path="/teams" element={<TeamsList />} />
          <Route path="/players" element={<PlayersList />} />
        </Routes>
      </article>
    </div>
  );
}

export default App;
