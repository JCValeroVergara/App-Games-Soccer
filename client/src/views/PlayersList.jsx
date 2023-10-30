import React, { useEffect, useState } from 'react';
import CardPlayer from '../components/CardPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, selectPlayers } from '../redux/features/playersSlice';
import { Add, Magnifier } from '../icons';
import ImagenDefault from '../assets/ImageDefault.jpg';
import CreatePlayer from '../layouts/players/CreatePlayer';


const PlayersList = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeForm, setActiveForm] = useState(null);

  console.log(players);
  
  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  let filteredPlayers = []

  if (players) {
    filteredPlayers = players;
    if (inputValue) {
      filteredPlayers = players.filter((player) => {
        return player.name.toLowerCase().includes(inputValue.toLowerCase());
      });
    }
  }

  const handleMagnifierClick = () => {
    if (isInputVisible) {
      setIsInputVisible(false);
      setInputValue('');
    } else {
      setIsInputVisible(true);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleShowCreate = () => {
    setActiveForm("create");
  };

  const handleCloseCreate = () => {
    setActiveForm(null);
  };

  return (
    <>
      {activeForm === 'create' && <CreatePlayer onClose={handleCloseCreate} />}
      <div className="flex flex-col w-full h-screen">
        <h1>PlayersList</h1>
        <div className="flex items-center space-x-2 justify-center">
          <button
            className="p-1.5 border border-[#012970] dark:border-white rounded-md hover:bg-slate-200 transition"
            onClick={handleMagnifierClick}
          >
            <Magnifier className="invert-[.15] dark:invert-[.82]" />
          </button>
          {isInputVisible && (
            <input
              name="name"
              id="name"
              type="text"
              placeholder="buscar jugador"
              className="w-9/12 bg-transparent px-2 py-1 pl-6 text-[#012970] dark:text-slate-100 placeholder:text-[#012970] dark:placeholder:text-slate-300"
              value={inputValue}
              onChange={handleInputChange}
            />
          )}
          <button
            title="Nuevo"
            className="p-2 border border-[#012970] dark:border-white rounded-md hover:bg-slate-200 transition"
            onClick={handleShowCreate}
          >
            <Add className="w-3 h-3 dark:invert hover:dark:invert-0" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredPlayers.map((player) => (
            <CardPlayer
              key={player.id}
              id={player.id}
              name={player.name}
              phone={player.phone}
              position={player.position}
              image={player.image ? player.image : ImagenDefault}
              team={player.team?.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayersList;