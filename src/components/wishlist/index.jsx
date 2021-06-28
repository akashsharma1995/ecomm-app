import React from 'react';
import { authActions } from '../../store/authSlice';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router'; 
import classes from './Wishlist.module.css';

const Wishlist = () => {
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  if(!isLoggedIn) history.push('/');
  
  return (
    <div>
      
    </div>
  )
}

export default Wishlist;
