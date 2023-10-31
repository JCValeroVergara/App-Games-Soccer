import React, { useState } from 'react';
import ImagenDefault from '../assets/ImageDefault.jpg';
import { Delete, Edit } from '../icons';
import DeletePlayer from '../layouts/players/DeletePlayer';
import UpdatePlayer from '../layouts/players/UpdatePlayer';
import SuccesfullRegisterToast from './SuccesfullRegisterToast';


const CardPlayer = ({ id,name, phone, position, image, team}) => {
  let imageUrl = image; // Inicializar imageUrl con el valor de image
  if (!image || Object.keys(image).length === 0) {
    imageUrl = ImagenDefault; // Si image está vacío, establecer imageUrl como la imagen por defecto
  }

  const [activeForm, setActiveForm] = useState(null);
  const [playerSelected, setPlayerSelected] = useState(null);
  const [isSuccessFull, setIsSuccessFull] = useState(false);

  const handleShowUpdate = (id) => {
    setActiveForm("update");
    setPlayerSelected(id);
  };

  const handleCloseUpdate = () => {
    setActiveForm(null);
  };

  const handleShowDelete = (id) => {
    setActiveForm("delete");
    setPlayerSelected(id);
  };

  const handleCloseDelete = () => {
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
      {activeForm === 'update' && (
        <UpdatePlayer
          id={playerSelected}
          name={name}
          phone={phone}
          position={position}
          image={image}
          team={team}
          onClose={handleCloseUpdate}
          showtoast={() => setIsSuccessFull(true)}
        />
      )}
      {activeForm === 'delete' && (
        <DeletePlayer
          id={playerSelected}
          name={name}
          phone={phone}
          position={position}
          image={image}
          team={team}
          onClose={handleCloseDelete}
          showtoast={() => setIsSuccessFull(true)}
        />
      )}
      <div className="p-4">
        <div className="flex flex-col max-w-sm h-80 rounded justify-between overflow-hidden shadow-md shadow-emerald-400 bg-slate-100">
          <div className="mt-2 flex items-center justify-center">
            <img
              className={`dark:text-white transition-transform transform w-32 h-32 rounded-md ring-2 object-cover opacity-100 scale-100"}`}
              src={imageUrl}
              alt={name}
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-1">{name}</div>
            <p className="text-gray-700 text-sm">{phone}</p>
            <p className="text-gray-700 text-sm">{position}</p>
            <p className="text-gray-700 text-xs">{team}</p>
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

export default CardPlayer;