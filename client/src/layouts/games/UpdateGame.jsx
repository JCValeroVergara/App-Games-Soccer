import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, selectTeams } from '../../redux/features/teamsSlice';
import { fetchGames, selectGames } from '../../redux/features/gamesSlice';
import { formatDateForDB, formatDateTime } from '../../utils/formatDate';
import ApiUrl from '../../utils/ApiUrl';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { fetchFields, selectFields } from '../../redux/features/fieldsSlice';
import validateSelectedDateAndSchedule from '../../validations/validationsGameUpdate';
import AlertMessage from '../../components/AlertMessage';


const UpdateGame = ({ id, onClose, showtoast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teams = useSelector(selectTeams);
  const fields = useSelector(selectFields);
  const games = useSelector(selectGames );

  useEffect(() => {
    dispatch(fetchGames());
    dispatch(fetchTeams());
    dispatch(fetchFields());
  }, [dispatch]);

  const gameUpdate = games.find((game) => game.id === id);

  const [GameData, setGameData] = useState({
    date: '',
    schedule: '',
    teamHomeId: '',
    teamAwayId: '',
    fieldId: '',
    status: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const [selectedTeamHomeId, setSelectedTeamHomeId] = useState('');
  const [selectedTeamAwayId, setSelectedTeamAwayId] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [previousDate, setPreviousDate] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [previousSchedule, setPreviousSchedule] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');


  const handleSelectTeamHome = (event) => {
    const newTeamHomeId = parseInt(event.target.value);
    setSelectedTeamHomeId(newTeamHomeId);
    setGameData((prevData) => ({ ...prevData, teamHomeId: selectedTeamHomeId }));
    setModifiedFields({ ...modifiedFields, teamHomeId: newTeamHomeId });
  }

  const handleSelectTeamAway = (event) => {
    const newTeamAwayId = parseInt(event.target.value);
    setSelectedTeamAwayId(newTeamAwayId);
    setGameData((prevData) => ({ ...prevData, teamAwayId: selectedTeamAwayId }));
    setModifiedFields({ ...modifiedFields, teamAwayId: newTeamAwayId });
  }

  const handleSelectField = (event) => {
    const newFieldId = parseInt(event.target.value);
    setSelectedFieldId(newFieldId);
    setGameData((prevData) => ({ ...prevData, fieldId: selectedFieldId }));
    setModifiedFields({ ...modifiedFields, fieldId: newFieldId });
  }

  const handleSelectStatus = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    setGameData((prevData) => ({ ...prevData, status: selectedStatus }));
    setModifiedFields({ ...modifiedFields, status: newStatus });
  }
  

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    if (name === 'date') {
      setSelectedDate(value);
      if (selectedSchedule && !value) {
        setErrors({ fields: 'Debes Actualizar Fecha y Hora.' });
      } else {
        setErrors({});
      }
    }
    if (name === 'schedule') {
      setSelectedSchedule(value);
      if (selectedDate && !value) {
        setErrors({ fields: 'Debes Actualizar Fecha y Hora.' });
      } else {
        setErrors({});
      }
    }
  };

  useEffect(() => {
    if (selectedDate && selectedSchedule) {
      formatDateForDB(selectedDate, selectedSchedule);
      if (
        selectedDate !== previousDate ||
        selectedSchedule !== previousSchedule
      ) {
        setGameData((prevData) => ({
          ...prevData,
          date: formatDateForDB(selectedDate, selectedSchedule),
          schedule: formatDateForDB(selectedDate, selectedSchedule),
        }));
        setModifiedFields({
          ...modifiedFields,
          date: formatDateForDB(selectedDate, selectedSchedule),
          schedule: formatDateForDB(selectedDate, selectedSchedule),
        });
        setPreviousDate(selectedDate);
        setPreviousSchedule(selectedSchedule);
      }
    }
  }, [selectedDate, selectedSchedule, previousDate, previousSchedule]);


  const handleSuccessFullUpdate = () => {
    dispatch(fetchGames());
    showtoast();
    onClose();
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const modifiedData = {};

    for (const fieldName in modifiedFields) {
      if (modifiedFields[fieldName]) {
        modifiedData[fieldName] = GameData[fieldName];
      }
    }
    
    const fieldErrors = validateSelectedDateAndSchedule(modifiedData.date, modifiedData.schedule);
    

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }
    const { date, schedule } = modifiedData;
    if (!date || !schedule) {
      setErrors({ fields: 'Debes Actualizar Fecha y Hora.' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${ApiUrl}/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedData),
      });
      if (response.status === 200) {
        await response.json();
        handleSuccessFullUpdate();
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col flex-wrap w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full h-max bg-gray-700 dark:bg-gray-800 dark:border-gray-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-slate-100 dark:text-white text-xl font-bold leading-tight tracking-tight  text-center">
              Actualizar Partido
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
                  defaultValue={gameUpdate?.teamHomeId}
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
                  defaultValue={gameUpdate?.teamAwayId}
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
                <div className="flex flex-row">
                  <input
                    type="text"
                    name="date-Render"
                    id="date-Render"
                    className="mr-2 border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder=""
                    required=""
                    value={formatDateTime(gameUpdate.date).formattedDate}
                    readOnly
                  />
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
                </div>
                <div className="flex flex-row">
                  <input
                    type="text"
                    name="date-Render"
                    id="date-Render"
                    className="mr-2 border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder=""
                    required=""
                    value={formatDateTime(gameUpdate.schedule).formattedTime}
                    readOnly
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
                </div>
                <select
                  type="text"
                  name="fieldId"
                  id="fieldId"
                  title="Seleccione la cancha"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cancha"
                  required=""
                  defaultValue={gameUpdate?.fieldId}
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
                <select
                  type="text"
                  name="status"
                  id="status"
                  title="Actualiza el estado del partido"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Estado del Partido"
                  required=""
                  value={selectedStatus}
                  onChange={handleSelectStatus}
                >
                  <option value="" disabled>
                    Actualiza el estado del partido
                  </option>
                  <option value="Programado">Programado</option>
                  <option value="Aplazado">Aplazado</option>
                  <option value="En Curso">En Curso</option>
                </select>

                {errors && <AlertMessage errorMsg={errors.fields} />}
                <div className="flex flex-wrap justify-center space-x-4">
                  <button
                    type="submit"
                    className="w-24 text-white bg-blue-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center"
                  >
                    Actualizar
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

export default UpdateGame;