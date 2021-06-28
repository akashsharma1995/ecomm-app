import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkUserIsAdmin } from "../utils";


const useAdminAuth = props => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!checkUserIsAdmin(user)) history.push('/login');
  }, [user, history]);

  return user;
}

export default useAdminAuth;