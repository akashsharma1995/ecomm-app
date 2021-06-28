import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const useAuth = props => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user){
      history.push('/login');
    }
  }, [user, history])

  return user;
}

export default useAuth;