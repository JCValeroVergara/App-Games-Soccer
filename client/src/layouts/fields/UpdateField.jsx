import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFields, selectFields } from '../../redux/features/fieldsSlice';
import { uploadFile } from '../../utils/firebase/config';
import ApiUrl from '../../utils/ApiUrl';
import Spinner from '../../components/Spinner';
import imageDefaultA from '../../assets/imageFieldDefault.jpeg';


const UpdateField = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fields = useSelector(selectFields);

  useEffect(() => {
    dispatch(fetchFields())
  }, [dispatch])

  const fieldUpdate = fields.find(team => team.id === id)

  const [FieldData, setFieldData] = useState({
    name: '',
    city: '',
    neighborhood: '',
    address: '',
    phone: '',
    image: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modifiedFields, setModifiedFields] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = async (event) => {
    if (event.target.name === 'image') {
      const file = event.target.files[0];
      setSelectedFile(file);

      try {
        const imageUrl = await uploadFile(file);
        setFieldData((prevData) => ({
          ...prevData,
          image: imageUrl,
        }));
        setModifiedFields({ ...modifiedFields, image: imageUrl });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      setFieldData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
      setModifiedFields({
        ...modifiedFields,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSuccessFullUpdate = () => {
    dispatch(fetchFields());
    onClose();
    navigate('/fields');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const modifiedData = {};
    for (const fieldName in modifiedFields) {
      modifiedData[fieldName] = FieldData[fieldName];
    }
    try {
      const response = await fetch(`${ApiUrl}/fields/${id}`, {
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
  };

  return (
    <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col flex-wrap w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full h-max bg-gray-700 dark:bg-gray-800 dark:border-gray-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-slate-100 dark:text-white text-xl font-bold leading-tight tracking-tight  text-center">
              Actualiza los datos del Jugador
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
                      : fieldUpdate.image
                      ? fieldUpdate.image
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
                    defaultValue={fieldUpdate?.name}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="text"
                  name="city"
                  id="city"
                  title="Ingrese la ciudad"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ciudad"
                  required=""
                  defaultValue={fieldUpdate?.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  title="Ingrese el barrio"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Barrio"
                  required=""
                  defaultValue={fieldUpdate?.neighborhood}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="address"
                  id="address"
                  title="Ingrese el nombre del entrenador o manager"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Dirección"
                  required=""
                  defaultValue={fieldUpdate?.address}
                  onChange={handleChange}
                />
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  title="Ingrese el teléfono del entrenador o manager"
                  className="border border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-black dark:placeholder-gray-400 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Teléfono"
                  required=""
                  defaultValue={fieldUpdate?.phone}
                  onChange={handleChange}
                />
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

export default UpdateField;