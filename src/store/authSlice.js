import { createSlice } from '@reduxjs/toolkit';
import { auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getSnapshot, createUserProfile, updateDoc, db, doc } from '../firebase/utils';

// This slice is responsible for maintaining authentication state accessible to all the components
const initialState = {
  user: null,

  signinError: [],

  signupError: [],
  signupSuccess: false,

  resetPasswordSuccess: false,
  resetPasswordError: [],

  updateUserInfoSuccess: false,
  updateUserInfoError: '' 
}

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers : {
    login(state, action) {
      state.user = action.payload;
    },
    loginError(state, action) {
      state.signinError.push(action.payload);
    },
    signupError(state, action) {
      state.signupError.push(action.payload);
    },
    signupSuccess(state, action) {
      state.signupSuccess = action.payload;
    },
    logout(state) {
      state.user = null;
      state.signupSuccess = false;
    },
    setUpdatedUserInfo(state, action) {
      // Runs only when user updates the my account info
      state.user.address = action.payload;
      state.updateUserInfoSuccess = true;
    },
    setUpdateUserInfoError(state, action) {
      state.updateUserInfoError = action.payload;
    }
  }
});

export default authSlice;

export const authActions = authSlice.actions;

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
    }catch (error){
      dispatch(authActions.loginError(error.message.toString()));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    await signOut(auth).then(() => {
      dispatch(authActions.logout())
    }).catch((error) => {
      console.log(error);
    });
  }
}

export const signupUser = (userData) => {
  return async (dispatch) => {
    try {
      const { displayName, email, password } = userData;
      const createdUser = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = createdUser;
      const userRef = await createUserProfile(user, {displayName});
      await getSnapshot(userRef);
      dispatch(authActions.signupSuccess(true));
    } catch (error) {
      dispatch(authActions.signupError(error.message.toString()));
    }
  }
}

export const updateUserInfo = (userData) => {
  const { userId, userAddress } = userData;
  return async (dispatch) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        address: {...userAddress}
      });
      dispatch(authActions.setUpdatedUserInfo(userAddress));
    } catch (error) {
      console.log(error && error.message);
      dispatch(authActions.setUpdateUserInfoError(error.message));
    }
  }
}