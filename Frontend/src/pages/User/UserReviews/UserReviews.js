import { useEffect, useState } from "react";
import { getReviewsByUserId, updateReview, deleteReview } from "../../../../services/ReviewService";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../../../utils/TokenUtilities";
import {jwtDecode} from "jwt-decode";

export const useUserReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.sub;
            loadReviews(userId);
        } catch (error) {
            console.error("Error al decodificar token:", error);
            navigate("/login");
        }
    }, [navigate]);

    const loadReviews = (userId) => {
        getReviewsByUserId(userId)
            .then((data) => {
                setReviews(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar reviews:", error);
                setLoading(false);
            });
    };

    const handleEditClick = (review) => {
        setSelectedReview(review);
        setComment(review.comment);
        setRating(review.rating);
        setShowModal(true);
        setError("");
        setSuccess("");
    };

    const handleUpdateReview = (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            setError("El comentario es requerido");
            return;
        }

        const reviewData = {
            comment: comment.trim(),
            rating: parseInt(rating)
        };

        updateReview(selectedReview.id, reviewData)
            .then(() => {
                setSuccess("Review actualizada exitosamente");
                setShowModal(false);
                const token = getAccessToken();
                const decoded = jwtDecode(token);
                loadReviews(decoded.sub);
            })
            .catch((error) => {
                console.error("Error al actualizar review:", error);
                setError("Error al actualizar la review");
            });
    };

    const handleDeleteReview = (reviewId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta review?")) {
            return;
        }

        deleteReview(reviewId)
            .then(() => {
                const token = getAccessToken();
                const decoded = jwtDecode(token);
                loadReviews(decoded.sub);
                alert("Review eliminada exitosamente");
            })
            .catch((error) => {
                console.error("Error al eliminar review:", error);
                alert("Error al eliminar la review");
            });
    };

    return {
        reviews,
        loading,
        showModal,
        setShowModal,
        comment,
        setComment,
        rating,
        setRating,
        error,
        success,
        handleEditClick,
        handleUpdateReview,
        handleDeleteReview,
        navigate
    };
};

