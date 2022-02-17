import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { Props } from './PropsInterface';

const url = 'https://api-for-missions-and-railways.herokuapp.com';

interface UserNameContextInterface {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

export const UserNameContext = createContext({} as UserNameContextInterface);

function UserNameProvider({ children }: Props) {
  const [userName, setUserName] = useState<string>('');
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get<{ name: string }>(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
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
