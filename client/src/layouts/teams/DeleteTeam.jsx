import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTeams } from '../../redux/features/teamsSlice';
import ApiUrl from '../../utils/ApiUrl';
import Spinner from '../../components/Spinner';


const DeleteTeam = ({ onClose, id, name, city }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSuccessFull = () => {
    dispatch(fetchTeams());
    onClose();
    navigate('/teams');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${ApiUrl}/teams/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('se ha eliminado el registro', data);
        handleSuccessFull();
        setIsLoading(false);
      } else {
        const data = await response.json();
        console.log('data', data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <table className="w-full tpy-2sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <td>
          <section className="flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col flex-wrap w-full items-center justify-center px-6 py-8 mx-auto ">
              <div className="w-full h-max bg-gray-100 dark:bg-gray-800 dark:border-gray-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-black dark:text-white text-xl font-bold leading-tight tracking-tight  text-center">
                    Eliminar Equipo
                  </h1>
                  <table className="w-full tpy-2sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="pl-4 py-2  rounded-tl-md rounded-bl-md">
                          Nombre
                        </th>
                        <th className="pl-4 py-2  rounded-tr-md rounded-br-md">
                          Ciudad
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 font-medium text-gray-900  dark:text-white">
                          {name}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900  dark:text-white">
                          {city}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {isLoading ? (
                    <div className="flex w-full pb-8 justify-center items-center">
                      <Spinner large={true} />
                    </div>
                  ) : (
                    <form
                      className="flex flex-col space-y-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-wrap justify-center space-x-4">
                        <button
                          type="submit"
                          className="w-24 text-white bg-blue-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => onClose()}
                          className="w-24 text-white bg-blue-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm py-2.5 text-center"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </td>
        </tr>
      </thead>
    </table>
  );
};

export default DeleteTeam;