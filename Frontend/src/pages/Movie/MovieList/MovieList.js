import { useEffect, useState } from "react";
import { getAllMovies } from "../../../../services/MovieService";
import { useNavigate } from "react-router-dom";

export const useMovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = () => {
        getAllMovies()
            .then((data) => {
                setMovies(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar películas:", error);
                setLoading(false);
            });
    };

    const handleMovieClick = (id) => {
        navigate(`/movies/${id}`);
    };

    return {
        movies,
        loading,
        handleMovieClick
    };
};

