import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MovieList from './pages/Movie/MovieList/MovieList.jsx';
import MovieDetail from './pages/Movie/MovieDetail/MovieDetail.jsx';
import MovieCreate from './pages/Movie/MovieCreate/MovieCreate.jsx';
import UserReviews from './pages/User/UserReviews/UserReviews.jsx';
import FormLogin from './pages/auth/Login/FormLogin.jsx';
import FormRegister from './pages/auth/Register/FormRegister.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/movies/create" element={<MovieCreate />} />
        <Route path="/my-reviews" element={<UserReviews />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
      </Routes>
    </Router>
  );
};

export default App;

