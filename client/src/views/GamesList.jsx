import '../../src/responsiveStyles.css'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGames, fetchGames } from '../redux/features/gamesSlice';
import SuccesfullRegisterToast from '../components/SuccesfullRegisterToast';
import { Add, Delete, Edit, Magnifier } from '../icons';
import CreateGame from '../layouts/games/CreateGame';
import {formatDateTime} from '../utils/formatDate';
import DeleteGame from '../layouts/games/DeleteGame';
import UpdateGame from '../layouts/games/UpdateGame';


const GamesList = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeForm, setActiveForm] = useState(null);
  const [isSuccessFull, setIsSuccessFull] = useState(false);
  const [successFullMessage, setSuccessFullMessage] = useState('');
  const [gameSelected, setGameSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  let filteredGames = [];
  if (games) {
    filteredGames = [...games];
    if (inputValue) {
      filteredGames = games.filter((game) =>
        game.field.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    const currentDateTime = new Date().toISOString();
    filteredGames = filteredGames.filter((game) => game.date > currentDateTime);
    filteredGames.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
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
    setSuccessFullMessage('Partido creado exitosamente');
    setActiveForm('create');
  };

  const handleCloseCreate = () => {
    setActiveForm(null);
  };

  const handleShowUpdate = (id) => {
    setSuccessFullMessage('Partido actualizado exitosamente');
    setActiveForm('update');
    setGameSelected(id);
  }

  const handleCloseUpdate = () => {
    setActiveForm(null);
    setGameSelected(null);
  }

  const handleShowDelete = (id) => {
    setSuccessFullMessage('Partido eliminado exitosamente');
    setActiveForm('delete');
    setGameSelected(id);
  }

  const handleCloseDelete = () => {
    setActiveForm(null);
    setGameSelected(null);
  }

  return (
    <>
      {isSuccessFull && (
        <SuccesfullRegisterToast
          message={successFullMessage}
          onClose={() => setIsSuccessFull(false)}
        />
      )}
      {activeForm === 'create' && (
        <CreateGame
          onClose={handleCloseCreate}
          showtoast={() => setIsSuccessFull(true)}
        />
      )}
      {activeForm === 'update' && (
        <UpdateGame
          onClose={handleCloseUpdate}
          showtoast={() => setIsSuccessFull(true)}
          id={gameSelected}
        />
      )}
      {activeForm === 'delete' && (
        <DeleteGame
          onClose={handleCloseDelete}
          showtoast={() => setIsSuccessFull(true)}
          id={gameSelected}
          teamHome={filteredGames.find((game) => game.id === gameSelected)?.teamHome.name}
          teamAway={filteredGames.find((game) => game.id === gameSelected)?.teamAway.name}
        />
      )}
      <div className="flex flex-col w-full h-screen">
        <div className="flex mx-8 items-center space-x-2 justify-end">
          <button
            title="Buscar"
            className="p-1.5 border border-[#012970] rounded-md bg-slate-200 hover:bg-emerald-300 transition"
            onClick={handleMagnifierClick}
          >
            <Magnifier />
          </button>
          {isInputVisible && (
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Buscar por la cancha"
              className="w-80 bg-transparent px-2 py-1 pl-6 text-slate-50 dark:text-slate-100 placeholder:text-slate-50 dark:placeholder:text-slate-300 shadow rounded-md"
              value={inputValue}
              onChange={handleInputChange}
            />
          )}
          <button
            title="Crear Nuevo"
            className="p-2 border border-[#012970] bg-slate-200 rounded-md hover:bg-emerald-300 transition"
            onClick={handleShowCreate}
          >
            <Add className="w-3 h-3" />
          </button>
        </div>

        <div className="table-container">
          <table className="table-auto w-full mt-2">
            <thead className="text-xs text-white uppercase bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-white uppercase bg-gray-800"
                >
                  Equipo Local
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-white uppercase bg-gray-800"
                >
                  Equipo Visita
                </th>
                <th scope="col" className="relative py-3">
                  Fecha
                </th>
                <th scope="col" className="relative py-3">
                  Horario
                </th>
                <th scope="col" className="relative py-3">
                  Cancha
                </th>
                <th scope="col" className="relative py-3">
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-white uppercase bg-gray-800"
                >
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {[...filteredGames].map((game, index) => (
                <tr
                  key={index}
                  className="mt-2 bg-white border-b dark:bg-gray-800-opacity-70 dark:border-gray-700 bg-opacity-50"
                >
                  <td title="Local" className="px-6 py-2 text-xs">
                    <img
                      className="m-2 w-10 h-10 rounded-md ring-1 ring-emerald-500 object-cover"
                      src={game.teamHome?.image}
                      alt="Team Home"
                    />
                    {game.teamHome?.name}
                  </td>
                  <td title="Visita" className="px-6 py-2 text-xs">
                    <img
                      className="m-2 w-10 h-10 rounded-md ring-1 ring-emerald-500 object-cover"
                      src={game.teamAway?.image}
                      alt="Team Away"
                    />
                    {game.teamAway?.name}
                  </td>
                  <td
                    title="Fecha"
                    className="px-6 py-2 text-center font-medium text-sm text-gray-900  dark:text-gray-700"
                  >
                    {formatDateTime(game.date).formattedDate}
                  </td>
                  <td
                    title="Horario"
                    className="px-6 py-2 text-center font-medium text-gray-900  dark:text-gray-700"
                  >
                    {formatDateTime(game.schedule).formattedTime}
                  </td>
                  <td
                    title="Cancha"
                    className="px-6 py-2 font-medium text-gray-900  dark:text-gray-700"
                  >
                    {game.field?.name}
                  </td>
                  <td
                    title="Status"
                    className="px-6 py-2 text-center font-medium text-gray-900  dark:text-gray-700"
                  >
                    {game.status}
                  </td>
                  <td title="Opciones" className="py-2 space-x-2 text-center">
                    <button
                      title="Editar"
                      onClick={() => handleShowUpdate(game.id)}
                      className="p-2 bg-gray-500  hover:bg-green-500 transition rounded"
                    >
                      <Edit className="w-3 h-3 invert" />
                    </button>
                    <button
                      title="Eliminar"
                      onClick={() => handleShowDelete(game.id)}
                      className="p-2 bg-gray-500 hover:bg-red-500 transition rounded"
                    >
                      <Delete className="w-3 h-3 invert" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};


export default GamesList;
