import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing';

function App() {
  return (
    <div className="flex flex-col w-full h-screen justify-between overflow-y-auto dark:bg-blue-300">
      <Routes>
        <Route path="/" element={<Landing/>} />
      </Routes>
    </div>
  );
}

export default App;
