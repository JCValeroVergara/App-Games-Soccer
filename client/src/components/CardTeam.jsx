import React, { useState } from 'react';
import ImageTeamDefault from '../assets/imageTeamDefault.png';
import DeleteTeam from '../layouts/teams/DeleteTeam';
import UpdateTeam from '../layouts/teams/UpdateTeam';
import { Delete, Edit } from '../icons';

const CardTeam = ({ id, name, city, neighborhood, manager, managerPhone, image }) => {
  let imageUrl = image;
  if (!image || Object.keys(image).length === 0) {
    imageUrl = ImageTeamDefault;
  }

  const [activeForm, setActiveForm] = useState(null);
  const [teamSelected, setTeamSelected] = useState(null);

  const handleShowUpdate = (id) => {
    setActiveForm('update');
    setTeamSelected(id);
  };

  const handleCloseUpdate = () => {
    setActiveForm(null);
  };

  const handleShowDelete = (id) => {
    setActiveForm('delete');
    setTeamSelected(id);
  };

  const handleCloseDelete = () => {
    setActiveForm(null);
  };

  return (
    <>
      {activeForm === 'update' && (
        <UpdateTeam id={teamSelected} name={name} onClose={handleCloseUpdate} />
      )}
      {activeForm === 'delete' && (
        <DeleteTeam
          id={teamSelected}
          name={name}
          city={city}
          onClose={handleCloseDelete}
        />
      )}
      <div className="p-4">
        <div className="flex flex-col max-w-sm h-80 rounded justify-between overflow-hidden shadow-md shadow-emerald-400 bg-slate-100 bg-opacity-70">
          <div className="mt-2 flex items-center justify-center">
            <img
              className={`dark:text-white transition-transform transform w-32 h-32 rounded-md ring-2 object-cover opacity-100 scale-100"}`}
              src={imageUrl}
              alt={name}
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-1">{name}</div>
            <p className="text-gray-700 text-sm">{city} - {neighborhood}</p>
            <p className="text-gray-700 text-base">Manager : {manager}</p>
            <p className="text-gray-700 text-xs">{managerPhone}</p>
          </div>
          <div className="flex justify-end px-6 space-x-2 pb-2">
            <button
              title="Editar"
              className="p-2 bg-gray-500  hover:bg-green-500 transition rounded"
              onClick={() => handleShowUpdate(id)}
            >
              <Edit className="w-3 h-3 invert" />
            </button>
            <button
              title="Eliminar"
              className="p-2 bg-gray-500 hover:bg-red-500 transition rounded"
              onClick={() => handleShowDelete(id)}
            >
              <Delete className="w-3 h-3 invert" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTeam;
