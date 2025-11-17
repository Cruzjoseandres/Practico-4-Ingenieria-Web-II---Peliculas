import {
  Container,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { useUserReviews } from "./UserReviews";

const UserReviews = () => {
  const {
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
    navigate,
  } = useUserReviews();

  if (loading) {
    return (
      <Container className="mt-5">
        <h2>Cargando tus reviews...</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Mis Reviews</h1>
      {success && <Alert variant="success">{success}</Alert>}

      {reviews.length === 0 ? (
        <Card>
          <Card.Body>
            <p className="text-muted">No has dejado ninguna review aún.</p>
            <Button variant="primary" onClick={() => navigate("/")}>
              Ver Películas
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {reviews.map((review) => (
            <ListGroup.Item key={review.id}>
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h5>{review.movieTitle}</h5>
                  <div className="text-warning mb-2">
                    {"⭐".repeat(review.rating)}
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditClick(review)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUpdateReview}>
            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating: {rating} ⭐</Form.Label>
              <Form.Range
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserReviews;
