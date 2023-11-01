import React, { useState } from 'react';
import ImagenFieldDefault from '../assets/imageFieldDefault.jpeg';
import UpdateField from '../layouts/fields/UpdateField';
import DeleteField from '../layouts/fields/DeleteField';
import { Delete, Edit } from '../icons';


const CardField = ({ id, name, city, neighborhood, address, phone, image }) => {
  let imageUrl = image;
  if (!image || Object.keys(image).length === 0) {
    imageUrl = ImagenFieldDefault;
  }

  const [activeForm, setActiveForm] = useState(null);
  const [fieldSelected, setFieldSelected] = useState(null);

  const handleShowUpdate = (id) => {
    setActiveForm('update');
    setFieldSelected(id);
  };

  const handleCloseUpdate = () => {
    setActiveForm(null);
  };

  const handleShowDelete = (id) => {
    setActiveForm('delete');
    setFieldSelected(id);
  };

  const handleCloseDelete = () => {
    setActiveForm(null);
  };

  return (
    <>
      {activeForm === 'update' && (
        <UpdateField
          id={fieldSelected}
          name={name}
          onClose={handleCloseUpdate}
        />
      )}
      {activeForm === 'delete' && (
        <DeleteField
          id={fieldSelected}
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
            <p className="text-gray-700 text-Base">{city} - {neighborhood}</p>
            <p className="text-gray-700 text-sm">{address}</p>
            <p className="text-gray-700 text-xs">{phone}</p>
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

export default CardField;