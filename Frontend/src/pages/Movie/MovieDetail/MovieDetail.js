import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../../../../services/MovieService";
import { createReviewForMovie } from "../../../../services/ReviewService";
import { getAccessToken } from "../../../../utils/TokenUtilities";

export const useMovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = () => {
    getMovieById(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar película:", error);
        setLoading(false);
      });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    // Obtener el token dinámicamente en el momento de enviar
    const token = getAccessToken();
    console.log("Token al enviar review:", token);

    if (!token) {
      // Guardar la URL actual para redirigir después del login
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      return;
    }

    if (!comment.trim()) {
      setError("El comentario es requerido");
      return;
    }

    const reviewData = {
      comment: comment.trim(),
      rating: parseInt(rating),
    };

    createReviewForMovie(id, reviewData)
      .then(() => {
        setSuccess("Review agregada exitosamente");
        setComment("");
        setRating(5);
        setError("");
        loadMovie();
        setTimeout(() => setSuccess(""), 3000);
      })
      .catch((error) => {
        console.error("Error al crear review:", error);
        setError("Error al agregar la review");
      });
  };

  return {
    movie,
    loading,
    comment,
    setComment,
    rating,
    setRating,
    error,
    success,
    handleSubmitReview,
  };
};
