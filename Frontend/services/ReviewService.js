import axios from "axios";
import { getAccessToken } from "../utils/TokenUtilities";

const API_URL = "http://localhost:3000";

const getReviewsByUserId = (userId) => {
  const token = getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/review/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

// Crear review para una película EXISTENTE
const createReviewForMovie = (movieId, reviewData) => {
  const token = getAccessToken();
  console.log("Token en ReviewService:", token);
  console.log("Enviando a:", `${API_URL}/review/movie/${movieId}`);
  console.log("Datos:", reviewData);
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/review/movie/${movieId}`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

// Crear película NUEVA con review inicial
const createMovieWithReview = (formData) => {
  const token = getAccessToken();
  console.log("=== createMovieWithReview ===");
  console.log("Token:", token);
  console.log("FormData entries:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/review`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("=== ERROR COMPLETO ===");
        console.error("Status:", error.response?.status);
        console.error("Mensaje:", error.response?.data);
        console.error("Mensajes de validación:", error.response?.data?.message);
        console.error("Headers:", error.response?.headers);
        console.error(error);
        reject(error);
      });
  });
};

const updateReview = (id, reviewData) => {
  const token = getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/review/${id}`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const deleteReview = (id) => {
  const token = getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API_URL}/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export {
  getReviewsByUserId,
  createReviewForMovie,
  createMovieWithReview,
  updateReview,
  deleteReview,
};
