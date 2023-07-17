import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import Main from '../Main/Main'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Movies from '../Movies/Movies'
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import NotFound from "../NotFound/NotFound"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { useState, useEffect, useCallback} from 'react';
import { getContent, editProfile} from '../../utils/MainApi';
import ProtectedRouteElement from '../ProtectedRoute'


function App() {

  const [currentUser,setCurrentUser] = useState({});
  const [loggedIn , setLoggedIn] = useState(null);  // null if haven't checked yet, true if logged in, false if not

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getContent(token).then((data) => {
        if (data){
          setUserInfo (data.name, data.email)
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
    } else {
      setLoggedIn(false)
    }
  }, [] )

  useEffect(() => {
    tokenCheck()
  }, [tokenCheck] ) 

  function handleUpdateUser({name, email}) {
    return editProfile({name, email})
    .then(({name, email}) => {
      setUserInfo( name, email)
    })
  }

  function logOut() {
    setLoggedIn(false);
  }

  function setUserInfo (name, email) {
    setCurrentUser( {
      "name": name,
      "email": email} 
    )
      return {name, email}
    }


  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
          <Route path="/" element={< Main isLoggedIn={loggedIn}/>} /> 
          <Route path="/signup" element={ <Register onRegisterUser={setUserInfo} onLoginUser={tokenCheck} user={currentUser}/>} />
          <Route path="/signin" element={ <Login onLoginUser={tokenCheck}/>} />
          <Route path="/profile" element ={ <ProtectedRouteElement element={Profile} logOut={logOut} updateUser={handleUpdateUser} isLoggedIn={loggedIn}/>} />
          <Route path="/movies" element={ <ProtectedRouteElement element={Movies} isLoggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={ <ProtectedRouteElement element={SavedMovies} isLoggedIn={loggedIn}/>} />
          <Route path="*" element={ <NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>  
    </>
  );
}
export default App;
