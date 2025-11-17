import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useMovieCreate } from "./MovieCreate";
import useAuthentication from "../../../../hooks/useAuthentication";

const MovieCreate = () => {
  useAuthentication(true);

  const {
    title,
    setTitle,
    description,
    setDescription,
    handleImageChange,
    comment,
    setComment,
    rating,
    setRating,
    error,
    loading,
    handleSubmit,
    handleCancel,
  } = useMovieCreate();

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <h2 className="mb-4">Agregar Nueva Película</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título *</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la película"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción de la película"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen *</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <Form.Text className="text-muted">
                Selecciona una imagen para la película
              </Form.Text>
            </Form.Group>

            <hr className="my-4" />

            <h5>Agregar Review Inicial (Opcional)</h5>

            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tu opinión sobre la película..."
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
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Creando..." : "Crear Película"}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieCreate;
