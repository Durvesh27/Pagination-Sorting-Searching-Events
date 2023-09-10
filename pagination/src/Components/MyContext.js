import { createContext, useEffect, useReducer } from "react";

import axios from 'axios'

export const AuthContext = createContext();

const initialValue = { user: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {...state, user: action.payload };

    case "logout":
      return {...state, user: null };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  function Login(userDetails) {
    dispatch({
      type: "login",
      payload: userDetails,
    });
  }

  function Logout(){
  localStorage.removeItem("Token")
    dispatch({
      type: "logout"
    });
  }
  useEffect(() => {
    const getCurrentUserData = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));
      if(token){
        try{
          const response = await axios.post(
            "http://localhost:8000/getCurrentUser",
            { token }
          );
          if (response.data.success) {
            dispatch({
              type: "login",
              payload: response.data.user
            });
          } 
        }
        catch(error){
          console.log(error)
        }
      }
    };
    getCurrentUserData();
  }, []);
  return (
    <AuthContext.Provider value={{ state, Login ,Logout}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;