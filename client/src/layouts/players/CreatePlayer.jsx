import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import { fetchTeams, selectTeams } from '../../redux/features/teamsSlice';
import imageDefaultA from '../../assets/ImageDefault.jpg';
import { uploadFile } from '../../utils/firebase/config';
import validation from '../../validations/validationsPlayer';
import ApiUrl from '../../utils/ApiUrl';
import AlertMessage from '../../components/AlertMessage';

const CreatePlayer = ({ onClose, showtoast }) => {
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const [PlayerData, setPlayerData] = useState({
    name: '',
    phone: '',
    position: '',
    image: '',
    teamId: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  // eslint-disable-next-line
  const [imageDefault, setImageDefault] = useState(imageDefaultA);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  const handleChangeSelectPosition = (event) => {
    const selectedPosition = event.target.value;
    setSelectedPosition(selectedPosition);
    setPlayerData((prevData) => ({ ...prevData, position: selectedPosition }));
  };

  const handleChangeSelectTeam = (event) => {
    const selectedTeamId = parseInt(event.target.value);
    setSelectedTeamId(selectedTeamId);
    setPlayerData((prevData) => ({ ...prevData, teamId: selectedTeamId }));
  };

  const handleChange = async (event) => {
  if (event.target.name === 'image') {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImageDefault(URL.createObjectURL(file));

    try {
      const imageUrl = await uploadFile(file);
      setPlayerData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
      // Manejar cualquier error de carga de archivos aquí
    }
  } else {
    setPlayerData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
};


  const hanleSuccessfullRegister = () => {
    onClose();
    showtoast();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const fieldErrors = validation(PlayerData);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      try {
        const response = await fetch(`${ApiUrl}/players`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(PlayerData),
        });

      if (response.status === 201) {
          const data = await response.json();
          console.log(data);
          dispatch(fetchTeams());
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

  //Posiciones
  const positions = [
    { id: 1, name: 'Portero' },
    { id: 2, name: 'Defensa' },
    { id: 3, name: 'Medio Campo' },
    { id: 4, name: 'Delantero' },
  ];

  return (
    <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col flex-wrap w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full h-max bg-gray-700 dark:bg-gray-800 dark:border-gray-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-slate-100 dark:text-white text-xl font-bold leading-tight tracking-tight  text-center">
              Crea un nuevo jugador
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
                <img
                  title="Imagen de perfil"
                  className={`dark:text-white transition-transform transform
                      w-32 h-32 rounded-md ring-4 ring-gray-300 dark:ring-gray-700 object-cover opacity-100 scale-100"
                    }`}
                  alt="Imagen de perfil"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : imageDefaultA
                  }
                />
                <input
                  type="file"
                  name="image"
                  id="image"
                  title="Ingrese la imagen de perfil"
                  className="border border-black sm:text-sm rounded-lg bg-white focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-900 focus:border-blue-900"
                  required=""
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleChange}
                />
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:space-x-4 md:space-y-0 space-y-4">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    title="Ingrese el Nombre"
                    className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  title="Ingrese el Teléfono"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Teléfono"
                  required=""
                  onChange={handleChange}
                />
                <select
                  type="text"
                  name="position"
                  id="position"
                  title="Seleccione la posición"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Posición"
                  required=""
                  value={selectedPosition}
                  onChange={handleChangeSelectPosition}
                >
                  <option value="" disabled>
                    Seleccione la posición
                  </option>
                  {positions?.map((position) => (
                    <option key={position.id} value={position.name}>
                      {position.name}
                    </option>
                  ))}
                </select>
                <select
                  type="text"
                  name="teamId"
                  id="teamId"
                  title="Seleccione un Equipo"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Equipo"
                  required=""
                  value={selectedTeamId}
                  onChange={handleChangeSelectTeam}
                >
                  <option value="" disabled>
                    Seleccione un Equipo
                  </option>
                  {teams?.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
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

export default CreatePlayer;
