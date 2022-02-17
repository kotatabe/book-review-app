import {
  useContext,
  useState,
  // useEffect
} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserNameContext } from '../Context/UserNameContext';
import { AuthContext } from '../Context/AuthContext';
import SimpleAlert from '../Alert';
import { AlertStatContext } from '../Context/AlertStatContext';

const url = 'https://api-for-missions-and-railways.herokuapp.com';

function Profile() {
  const { userName, setUserName } = useContext(UserNameContext);
  const [name, setName] = useState(userName);
  const { authToken } = useContext(AuthContext);
  const { status, setStatus } = useContext(AlertStatContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put<{ name: string }>(
        `${url}/users`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .then((res) => {
        setUserName(res.data.name);
        setName('');
        setStatus({
          ...status,
          severity: 'success',
          open: true,
          message: 'ユーザー名が保存されました',
        });
      })
      .catch((error) => {
        console.log('...Error', error);
      });
  };

  return (
    <>
      <h2>ユーザー情報の編集</h2>
      <SimpleAlert />
      <Form onSubmit={handleSubmit} className="signup-form">
        <Form.Group className="mb-3">
          <Form.Label>ユーザー名</Form.Label>
          <Form.Control
            type="text"
            placeholder={userName}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          登録
        </Button>
      </Form>
    </>
  );
}

export default Profile;
