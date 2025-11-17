import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../../../../services/MovieService";
import { createReviewForMovie } from "../../../../services/ReviewService";
import { getAccessToken } from "../../../../utils/TokenUtilities";

export const useMovieCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = getAccessToken();
    if (!token) {
      navigate("/login");
      return;
    }

    if (!title.trim() || !description.trim() || !image) {
      setError("Todos los campos de la película son requeridos");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("image", image);

    console.log("=== Creando película ===");
    console.log("title:", title.trim());
    console.log("description:", description.trim());
    console.log("image:", image);

    // Primero crear la película
    createMovie(formData)
      .then((movieResponse) => {
        // Si hay review, crearla después de crear la película
        if (comment.trim()) {
          const reviewData = {
            comment: comment.trim(),
            rating: parseInt(rating),
          };

          createReviewForMovie(movieResponse.id, reviewData)
            .then(() => {
              alert("Película y review creadas exitosamente");
              navigate(`/movies/${movieResponse.id}`);
            })
            .catch((error) => {
              console.error("Error al crear review:", error);
              // La película se creó pero la review falló
              alert(
                "Película creada, pero hubo un error al agregar la review. Puedes agregarla luego."
              );
              navigate(`/movies/${movieResponse.id}`);
            });
        } else {
          alert("Película creada exitosamente");
          navigate(`/movies/${movieResponse.id}`);
        }
      })
      .catch((error) => {
        console.error("Error al crear película:", error);
        setError("Error al crear la película. Intenta nuevamente.");
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    image,
    handleImageChange,
    comment,
    setComment,
    rating,
    setRating,
    error,
    loading,
    handleSubmit,
    handleCancel,
  };
};
