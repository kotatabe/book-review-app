import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const url = 'https://api-for-missions-and-railways.herokuapp.com';

export const UserNameContext = createContext({
  userName: '',
  setUserName: () => { },
});

function UserNameProvider({ children }) {
  const [userName, setUserName] = useState('');
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        console.log(res.data.name);
        setUserName(res.data.name);
      })
      .catch((error) => console.log('...error', error));
  }, [authToken]);

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
}

export default UserNameProvider;
