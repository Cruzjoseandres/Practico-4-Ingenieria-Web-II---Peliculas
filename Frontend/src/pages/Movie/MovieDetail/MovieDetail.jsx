import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useMovieDetail } from "./MovieDetail";

const MovieDetail = () => {
  const {
    movie,
    loading,
    comment,
    setComment,
    rating,
    setRating,
    error,
    success,
    handleSubmitReview,
  } = useMovieDetail();

  if (loading) {
    return (
      <Container className="mt-5">
        <h2>Cargando película...</h2>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-5">
        <h2>Película no encontrada</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={`http://localhost:3000${movie.imageUrl}`}
              alt={movie.title}
              style={{ height: "500px", objectFit: "cover" }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <h1>{movie.title}</h1>
          <p className="text-muted">{movie.description}</p>

          <h3 className="mt-4">Reviews</h3>
          {movie.reviews && movie.reviews.length > 0 ? (
            <ListGroup className="mb-4">
              {movie.reviews.map((review, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between">
                    <strong>{review.user?.username || "Usuario"}</strong>
                    <span className="text-warning">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="mb-0 mt-2">{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">
              No hay reviews aún. ¡Sé el primero en dejar una!
            </p>
          )}

          <Card className="mt-4">
            <Card.Body>
              <h4>Agregar Review</h4>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmitReview}>
                <Form.Group className="mb-3">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu opinión sobre la película..."
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
                <Button variant="primary" type="submit">
                  Enviar Review
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
