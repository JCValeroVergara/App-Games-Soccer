
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';

const firebaseConfig = {
  apiKey: 'AIzaSyBQqqygneSbExVVVROnIUzqt-HXbJQ1q2M',
  authDomain: 'app-games-d257f.firebaseapp.com',
  projectId: 'app-games-d257f',
  storageBucket: 'app-games-d257f.appspot.com',
  messagingSenderId: '717451634386',
  appId: '1:717451634386:web:07c8adedbeb2a631936f0b',
};


const app = initializeApp(firebaseConfig);
export const storege = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storege, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef)
  return url;
}
