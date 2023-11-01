import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, selectTeams } from '../../redux/features/teamsSlice';
import { fetchFields, selectFields } from '../../redux/features/fieldsSlice';
import Spinner from '../../components/Spinner';
import AlertMessage from '../../components/AlertMessage';
import { formatDateForDB } from '../../utils/formatDate';
import  ApiUrl  from '../../utils/ApiUrl';
import  validation  from '../../validations/validationsGame';
import { fetchGames } from '../../redux/features/gamesSlice';



const CreateGame = ({ onClose, showtoast }) => {
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const fields = useSelector(selectFields);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchFields());
  }, [dispatch]);

  const [GameData, setGameData] = useState({
    date: '',
    schedule: '',
    teamHomeId: '',
    teamAwayId: '',
    fieldId: '',
    status: 'Programado',
  });

  const [isLoading, setIsLoading] =useState(false);
  const [errors, setErrors] = useState({});
  const [selectedTeamHomeId, setSelectedTeamHomeId] = useState('');
  const [selectedTeamAwayId, setSelectedTeamAwayId] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');

  const handleSelectTeamHome = (event) => {
    const selectedTeamHomeId = parseInt(event.target.value);
    setSelectedTeamHomeId(selectedTeamHomeId);
    setGameData((prevData) => ({ ...prevData, teamHomeId: selectedTeamHomeId }));
  }

  const handleSelectTeamAway = (event) => {
    const selectedTeamAwayId = parseInt(event.target.value);
    setSelectedTeamAwayId(selectedTeamAwayId);
    setGameData((prevData) => ({ ...prevData, teamAwayId: selectedTeamAwayId }));
  }

  const handleSelectField = (event) => {
    const selectedFieldId = parseInt(event.target.value);
    setSelectedFieldId(selectedFieldId);
    setGameData((prevData) => ({ ...prevData, fieldId: selectedFieldId }));
  }

const handleDateChange = (event) => {
  const { name, value } = event.target;

  if (name === 'date') {
    setSelectedDate(value);
  }
  if (name === 'schedule') {
    setSelectedSchedule(value);
  }
};

useEffect(() => {
  const date = formatDateForDB(selectedDate, selectedSchedule);
  setGameData((prevData) => ({ ...prevData, date: date }));
  setGameData((prevData) => ({ ...prevData, schedule: date }));
}, [selectedDate, selectedSchedule]);



  const hanleSuccessfullRegister = () => {
    onClose();
    showtoast();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const fieldErrors = validation(GameData);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      try {
        const response = await fetch(`${ApiUrl}/games`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(GameData),
        });

        if (response.status === 201) {
          await response.json();
          dispatch(fetchGames());
          hanleSuccessfullRegister();
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  };


  return (
    <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col flex-wrap w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full h-max bg-gray-700 dark:bg-gray-800 dark:border-gray-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-slate-100 dark:text-white text-xl font-bold leading-tight tracking-tight  text-center">
              Crea un nuevo Partido
            </h1>
            {isLoading ? (
              <div className="flex w-full pb-8 justify-center items-center">
                <Spinner large={true} />
              </div>
            ) : (
              <form
                className="flex flex-col items-center space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <select
                  type="text"
                  name="teamHomeId"
                  id="teamHomeId"
                  title="Seleccione al Equipo Local"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Equipo"
                  required=""
                  value={selectedTeamHomeId}
                  onChange={handleSelectTeamHome}
                >
                  <option value="" disabled>
                    Seleccione un Equipo
                  </option>
                  {teams?.map((team, index) => (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                <select
                  type="text"
                  name="teamAwayId"
                  id="teamAwayId"
                  title="Seleccione al Equipo Visita"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Equipo"
                  required=""
                  value={selectedTeamAwayId}
                  onChange={handleSelectTeamAway}
                >
                  <option value="" disabled>
                    Seleccione un Equipo
                  </option>
                  {teams?.map((team, index) => (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="date"
                  id="date"
                  title="Ingrese la fecha"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Fecha"
                  required=""
                  onChange={handleDateChange}
                />
                <input
                  type="time"
                  name="schedule"
                  id="schedule"
                  title="Ingrese la hora"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Hora"
                  required=""
                  onChange={handleDateChange}
                />
                <select
                  type="text"
                  name="fieldId"
                  id="fieldId"
                  title="Seleccione la cancha"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cancha"
                  required=""
                  value={selectedFieldId}
                  onChange={handleSelectField}
                >
                  <option value="" disabled>
                    Seleccione un Campo
                  </option>
                  {fields?.map((field, index) => (
                    <option key={index} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
                {errors && <AlertMessage errorMsg={errors.fields} />}
                <div className="flex flex-wrap justify-center space-x-4">
                  <button
                    type="submit"
                    className="w-24 text-white bg-blue-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center"
                  >
                    Crear
                  </button>
                  <button
                    className="w-24 text-white bg-blue-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm py-2.5 text-center"
                    onClick={() => onClose()}
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
  );
};

export default CreateGame;