import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import Main from '../Main/Main'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Movies from '../Movies/Movies'
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import NotFound from "../NotFound/NotFound"

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={< Main />} /> 
        <Route path="/signup" element={ <Register/>} />
        <Route path="/signin" element={ <Login />} />
        <Route path="/profile" element ={ <Profile name={'Виталий'} email={"pochta@mu.mu"}/>} />
        <Route path="/movies" element={ <Movies linkSavedMovies="/saved-movies" linkMovies="/movies"/>} />
        <Route path="/saved-movies" element={ <SavedMovies linkSavedMovies="/saved-movies" linkMovies="/movies" />} />
        <Route path="*" element={ <NotFound />} />
    </Routes>
    </>
  );
}
export default App;
