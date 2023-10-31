import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Landing from './views/Landing';
import PlayersList from './views/PlayersList';
import backgroundImage from './assets/bg.jpg';

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
          <Route path="/" element={<Landing />} />
          <Route path="/players" element={<PlayersList />} />  
        </Routes>
      </article>
    </div>
  );
}

export default App;
