import axios from "axios";
import { getAccessToken } from "../utils/TokenUtilities";

const API_URL = "http://localhost:3000";

export const getAllMovies = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/movie`);
        return data;
    } catch (error) {
        console.error("Error al obtener películas", error);
        throw error;
    }
};

export const getMovieById = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/movie/${id}`);
        return data;
    } catch (error) {
        console.error(`Error al obtener película ${id}`, error);
        throw error;
    }
};

export const createMovie = async (movieData) => {
    const token = getAccessToken();
    try {
        const { data } = await axios.post(`${API_URL}/movie`, movieData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (error) {
        console.error("Error al crear película", error);
        throw error;
    }
};

export const deleteMovie = async (id) => {
    const token = getAccessToken();
    try {
        const { data } = await axios.delete(`${API_URL}/movie/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (error) {
        console.error(`Error al eliminar película ${id}`, error);
        throw error;
    }
};
