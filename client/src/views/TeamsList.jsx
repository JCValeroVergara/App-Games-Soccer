import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, selectTeams } from '../redux/features/teamsSlice';
import CardTeam from '../components/CardTeam';
import CreateTeam from '../layouts/teams/CreateTeam';
import SuccesfullRegisterToast from '../components/SuccesfullRegisterToast';
import ImageTeamDefault from '../assets/imageTeamDefault.png';
import { Add, Magnifier } from '../icons';

const TeamsList = () => {
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams)
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeForm, setActiveForm] = useState(null);
  const [isSuccessFull, setIsSuccessFull] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  let filteredTeams = []

  if (teams) {
    filteredTeams = teams;
    if (inputValue) {
      filteredTeams = teams.filter((team) => {
        return team.name.toLowerCase().includes(inputValue.toLowerCase());
      })
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
    setActiveForm('create');
  };

  const handleCloseCreate = () => {
    setActiveForm(null);
  };

  return (
    <>
      {isSuccessFull && (
        <SuccesfullRegisterToast
          message={'Proceso realizado con éxito'}
          onClose={() => setIsSuccessFull(false)}
        />
      )}
      {activeForm === 'create' && (
        <CreateTeam
          onClose={handleCloseCreate}
          showtoast={() => setIsSuccessFull(true)}
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
              placeholder="Buscar el equipo"
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {[...filteredTeams]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((team, index) => (
              <div key={index}>
                <CardTeam
                  key={team.id}
                  id={team.id}
                  name={team.name}
                  city={team.city}
                  neighborhood={team.neighborhood}
                  manager={team.manager}
                  managerPhone={team.managerPhone}
                  image={team.image ? team.image : ImageTeamDefault}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TeamsList;
